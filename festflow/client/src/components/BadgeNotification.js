import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import './BadgeNotification.css';

const BadgeNotification = () => {
  const { newBadges, setNewBadges } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (newBadges && newBadges.length > 0) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setNewBadges([]), 500);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [newBadges, setNewBadges]);

  const getBadgeIcon = (badgeType) => {
    switch (badgeType) {
      case 'event_pro':
        return '⭐';
      case 'event_king':
        return '👑';
      default:
        return '🏆';
    }
  };

  const getBadgeName = (badgeType) => {
    switch (badgeType) {
      case 'event_pro':
        return 'Event Pro';
      case 'event_king':
        return 'Event King';
      default:
        return 'New Badge';
    }
  };

  if (!isVisible || !newBadges || newBadges.length === 0) {
    return null;
  }

  return (
    <div className="badge-notification">
      <div className="badge-notification-content">
        <div className="badge-notification-header">
          <h3>🎉 New Badge{newBadges.length > 1 ? 's' : ''} Unlocked!</h3>
          <button onClick={() => setIsVisible(false)} className="close-btn">×</button>
        </div>
        
        <div className="badges-list">
          {newBadges.map((badge, index) => (
            <div key={index} className="badge-item">
              <div className="badge-icon">{getBadgeIcon(badge)}</div>
              <div className="badge-info">
                <h4>{getBadgeName(badge)}</h4>
                <p>Congratulations! You've earned this badge!</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="badge-notification-footer">
          <p>Keep attending events to unlock more badges!</p>
        </div>
      </div>
    </div>
  );
};

export default BadgeNotification;
