const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema.js');

// Register Route
router.post('/register', async (req, res) => {
  const { email, password, role } = req.body;
  if(!email){
    return res.status(400).json({ message: 'Enter Email' });
  }
  if(!password){
    return res.status(400).json({ message: 'Enter Passord' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({
      email,
      password,
      role,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Create JWT token
    const payload = {
      user: user
    };

    const token = jwt.sign(payload, 'schduling', { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, email: user.email, role: user.role }, message: 'User Register Successfully'  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid Email' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }

    // Create JWT token
    const payload = {
      user: user,
    };

    const token = jwt.sign(payload, 'schduling', { expiresIn: '1d' });

    res.json({ token, user: { id: user.id, email: user.email, role: user.role },message: 'User Login Successfully'  });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.get('/users',async(req,res)=>{
  try{
    const users = await User.find()
    return res.json({users})
  }catch(error){

  console.log(error)
  return res.status(400).json({message:"Server Error"})
  }
})
module.exports = router;
