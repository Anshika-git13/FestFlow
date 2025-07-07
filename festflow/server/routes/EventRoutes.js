const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const Registration = require("../models/Registration");



router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error("Fetch events error:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
});



router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", async (req, res) => {
  const { title, date, location, imageUrl } = req.body;

  if (!title || !date || !location) {
    return res.status(400).json({ message: "All required fields must be filled!" });
  }

  try {
    const newEvent = new Event({ title, date, location, imageUrl });
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/:id/register", async (req, res) => {
  const { name, email, university, course, rollno } = req.body;
  const { id: eventId } = req.params;

 
  if (!name || !email || !university || !course || !rollno) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    
    const existing = await Registration.findOne({ email, eventId });
    if (existing) {
      return res.status(409).json({ message: "You have already registered for this event." });
    }

   
    const newRegistration = new Registration({
      name,
      email,
      university,
      course,
      rollno,
      eventId,
    });

    await newRegistration.save();
    res.status(201).json({ message: "Registration successful", registration: newRegistration });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
});


router.get("/:id/registrations", async (req, res) => {
  const { id: eventId } = req.params;

  try {
    const registrations = await Registration.find({ eventId }).populate("eventId");
    res.status(200).json(registrations);
  } catch (error) {
    console.error("Fetch registrations error:", error);
    res.status(500).json({ message: "Server error: " + error.message });
  }
});

module.exports = router;

