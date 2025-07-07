const Event = require('../models/Event');


const getEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch events', error });
  }
};


const createEvent = async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const newEvent = new Event({ title, description, date, location });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create event', error });
  }
};

module.exports = {
  getEvents,
  createEvent,
};
