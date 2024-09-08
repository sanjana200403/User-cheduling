const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
  user: {
     type: mongoose.Schema.Types.ObjectId,
      ref: 'User', 
      required: true },
  start: { 
    type: String, 
    required: true 
},
title:{
type:String
},
  end: { type: String, required: true },
  attendees:[ {
    userId: {
      type: mongoose.Schema.Types.ObjectId,  // Referencing user by ObjectId
      ref: 'User',  // Reference to the User model
      required: true
    },
    email: {
      type: String,
      required: true
    }
  }] 
});

module.exports = mongoose.model('Session', SessionSchema);
