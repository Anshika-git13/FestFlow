const User = require('../models/User');

class PointsService {
  // Award points for event registration
  static async awardRegistrationPoints(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Add 10 points for registration
      user.points += 10;
      user.totalEvents += 1;

      // Check and award badges
      const newBadges = [];
      
      // Event Pro badge at 100 points
      if (user.points >= 100 && !user.badges.includes('event_pro')) {
        newBadges.push('event_pro');
        user.badges.push('event_pro');
      }
      
      // Event King badge at 500 points
      if (user.points >= 500 && !user.badges.includes('event_king')) {
        newBadges.push('event_king');
        user.badges.push('event_king');
      }

      await user.save();

      return {
        newPoints: user.points,
        newBadges: newBadges,
        totalBadges: user.badges,
        totalEvents: user.totalEvents
      };
    } catch (error) {
      console.error('Error awarding points:', error);
      throw error;
    }
  }

  // Get user stats
  static async getUserStats(userId) {
    try {
      const user = await User.findById(userId).select('points badges totalEvents name');
      if (!user) {
        throw new Error('User not found');
      }

      return {
        points: user.points,
        badges: user.badges,
        totalEvents: user.totalEvents,
        name: user.name
      };
    } catch (error) {
      console.error('Error getting user stats:', error);
      throw error;
    }
  }

  // Check if user can get next badge
  static getNextBadgeInfo(points) {
    if (points < 100) {
      return {
        nextBadge: 'event_pro',
        pointsNeeded: 100 - points,
        badgeName: 'Event Pro',
        description: 'Attend 10 events to unlock this badge!'
      };
    } else if (points < 500) {
      return {
        nextBadge: 'event_king',
        pointsNeeded: 500 - points,
        badgeName: 'Event King',
        description: 'Attend 50 events to unlock this badge!'
      };
    } else {
      return {
        nextBadge: null,
        pointsNeeded: 0,
        badgeName: 'All Badges Unlocked!',
        description: 'You have achieved all available badges!'
      };
    }
  }
}

module.exports = PointsService;
