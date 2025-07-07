const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  date: {
    type: Date,
    required: true
  },
  location: String,
  tags: [String],
  description: { type: String },
  imageUrl: { type: String },
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
