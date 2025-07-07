const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  university: { type: String, required: true },
  course: { type: String, required: true },
  rollno: { type: String, required: true },


  eventId: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },

  
  registrationTime: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Registration", registrationSchema);
