const express = require("express");
const router = express.Router();
const Registration = require("../models/Registration");
const PointsService = require("../services/pointsService");
const auth = require("../middleware/auth");


router.get("/", async (req, res) => {
  try {
    const registrations = await Registration.find().populate("eventId");
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create new registration and award points
router.post("/", auth, async (req, res) => {
  try {
    const { eventId, name, email, phone } = req.body;
    const userId = req.user.userId;

    // Check if user already registered for this event
    const existingRegistration = await Registration.findOne({
      eventId,
      userId
    });

    if (existingRegistration) {
      return res.status(400).json({ message: "You are already registered for this event" });
    }

    // Create registration
    const registration = new Registration({
      eventId,
      userId,
      name,
      email,
      phone
    });

    await registration.save();

    // Award points and check for badges
    const pointsResult = await PointsService.awardRegistrationPoints(userId);

    res.status(201).json({
      message: "Registration successful!",
      registration,
      pointsResult
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Registration failed. Please try again." });
  }
});

// Get user's registrations
router.get("/user/:userId", auth, async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Ensure user can only access their own registrations
    if (req.user.userId !== userId) {
      return res.status(403).json({ message: "Access denied" });
    }

    const registrations = await Registration.find({ userId }).populate("eventId");
    res.status(200).json(registrations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
