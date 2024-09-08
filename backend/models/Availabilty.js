const mongoose = require('mongoose');

const AvailabilitySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  title: { type:String, default:"user Availability" } ,
  is_availability:{type:Boolean, default:true}
});

module.exports = mongoose.model('Availability', AvailabilitySchema);
