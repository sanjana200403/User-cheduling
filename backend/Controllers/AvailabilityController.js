const Availability = require('../models/Availabilty.js');

const User = require('../models/UserSchema.js'); 

exports.createAvailability = async (req, res) => {
  const { start, end, title ,userId } = req.body;

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check for overlapping availability
    const overlappingAvailability = await Availability.find({
      user: userId,
      $or: [
        // Partial Overlap
        { start: { $lt: end }, end: { $gt: start } },
        // New Slot Completely Overlaps Existing Slot
        { start: { $lte: start }, end: { $gte: end } },
        // Existing Slot Completely Overlaps New Slot
        { start: { $lte: start }, end: { $gte: end } }
      ]
    });

    if (overlappingAvailability.length > 0) {
      return res.status(400).json({ message: 'Availability slot overlaps with existing slots' });
    }

    // Create new availability
    const availability = new Availability({
      user: userId,
      start,
      end,
      title
    });

    await availability.save();
    res.json({ success: true, availability });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




exports.getUserAvailability = async (req, res) => {
  const userId = req.params.userId; // Get user ID from route parameters

  try {
    // Find availability based on the user ID
    const availability = await Availability.find({ user: userId });

    // Check if availability was found
    if (!availability || availability.length === 0) {
      return res.status(404).json({ message: 'No availability found for this user' });
    }

    // Respond with the availability data
    res.json(availability );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteAvailability = async (req, res) => {
  const { id } = req.params;
  await Availability.findByIdAndDelete(id);
  res.json({ success: true });
};
