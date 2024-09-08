const jwt = require('jsonwebtoken');
const User = require('../models/UserSchema');

exports.isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ msg: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.user._id).select('-password');
    console.log(req.user,"req.users")
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};