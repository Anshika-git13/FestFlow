const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const PointsService = require('../services/pointsService');

// Get user profile with points and badges
router.get('/profile', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const userStats = await PointsService.getUserStats(userId);
    const nextBadgeInfo = PointsService.getNextBadgeInfo(userStats.points);

    res.json({
      ...userStats,
      nextBadgeInfo
    });
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).json({ message: 'Failed to get user profile' });
  }
});

// Get user's event history
router.get('/events', auth, async (req, res) => {
  try {
    const userId = req.user.userId;
    const Registration = require('../models/Registration');
    
    const registrations = await Registration.find({ userId })
      .populate('eventId')
      .sort({ createdAt: -1 });

    res.json(registrations);
  } catch (error) {
    console.error('Error getting user events:', error);
    res.status(500).json({ message: 'Failed to get user events' });
  }
});

module.exports = router;
