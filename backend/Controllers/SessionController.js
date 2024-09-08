const Session = require('../models/Session');
const User = require('../models/UserSchema');

const Availability = require('../models/Availabilty');
const UserSchema = require('../models/UserSchema');

exports.createSession = async (req, res) => {
  const { start, end, title, attendees, userId } = req.body;
  console.log(attendees)

  try {
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find all availability slots for the user
    const userAvailability = await Availability.find({ user: userId });

    // Check if the session's start and end times fall within any of the user's availability slots
    const isWithinAvailability = userAvailability.some((availability) => {
      const availabilityStart = new Date(availability.start);
      const availabilityEnd = new Date(availability.end);
      const sessionStart = new Date(start);
      const sessionEnd = new Date(end);

      // Check if the session falls completely within the availability window
      return sessionStart >= availabilityStart && sessionEnd <= availabilityEnd;
    });

    // If session does not fall within any availability slot, return an error
    if (!isWithinAvailability) {
      return res.status(400).json({ message: 'Session time does not fall within any availability slot for the user' });
    }

    // Proceed to create the session if availability is valid
    const session = new Session({
      user: userId,  // The main user who created the session
      start:start,  // Ensure that we are storing date objects
      end: end,
      title,
      attendees,
    });

    // Save the session
    await session.save();

    // Update attendedSessions for the user and 
    if(attendees.length>0){
      attendees.map(async(user)=>{
        try{
          const availability =  new Session({
            user:user.userId,
            start:start,
            end:end,
            attendees,
            title
          })
          await availability.save()

        }catch(error){
          console.log("error while creating attendee session ")
        }
      
    
      })

    }
 
    res.json({ success: true, session });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getUserSessions = async (req, res) => {
  const { userId } = req.params; // Get userId from route parameters

  try {
    // Find all sessions for the specified user
    const sessions = await Session.find({ user: userId });

    // Check if sessions are found
    if (!sessions || sessions.length === 0) {
      return res.status(404).json({ message: 'No sessions found for this user' });
    }

    // Respond with the sessions data
    res.json({ sessions });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.deleteSession = async (req, res) => {
  const { id } = req.params;
  await Session.findByIdAndDelete(id);
  res.json({ success: true });
};


// Example Express.js route handler
exports.getAvailableUsers = async (req, res) => {
  try{
    const users = await UserSchema.find({})
    return res.json({users})
  }catch(error){
    console.log(error)
  }
 

};


