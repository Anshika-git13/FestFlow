import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './UserProfile.css';

const UserProfile = () => {
  const { user, token } = useAuth();
  const [profile, setProfile] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user && token) {
      fetchUserProfile();
      fetchUserEvents();
    }
  }, [user, token]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
    } catch (err) {
      setError('Failed to load profile');
    }
  };

  const fetchUserEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(response.data);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setLoading(false);
    }
  };

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
        return 'Unknown Badge';
    }
  };

  const getBadgeDescription = (badgeType) => {
    switch (badgeType) {
      case 'event_pro':
        return 'Attended 10+ events';
      case 'event_king':
        return 'Attended 50+ events';
      default:
        return 'Achievement unlocked!';
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner">🔄</div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profile-error">
        <p>❌ {error}</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <h1>🎉 Welcome, {profile?.name}!</h1>
        <p>Track your progress and unlock amazing badges</p>
      </div>

      <div className="profile-stats">
        <div className="stat-card points-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-content">
            <h3>{profile?.points || 0}</h3>
            <p>Total Points</p>
          </div>
        </div>

        <div className="stat-card events-card">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{profile?.totalEvents || 0}</h3>
            <p>Events Attended</p>
          </div>
        </div>

        <div className="stat-card badges-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-content">
            <h3>{profile?.badges?.length || 0}</h3>
            <p>Badges Earned</p>
          </div>
        </div>
      </div>

      <div className="badges-section">
        <h2>Your Badges</h2>
        {profile?.badges && profile.badges.length > 0 ? (
          <div className="badges-grid">
            {profile.badges.map((badge, index) => (
              <div key={index} className="badge-item">
                <div className="badge-icon">{getBadgeIcon(badge)}</div>
                <div className="badge-info">
                  <h4>{getBadgeName(badge)}</h4>
                  <p>{getBadgeDescription(badge)}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-badges">
            <p>🎯 No badges yet! Register for events to start earning points.</p>
          </div>
        )}
      </div>

      {profile?.nextBadgeInfo && profile.nextBadgeInfo.nextBadge && (
        <div className="next-badge-section">
          <h2>Next Badge: {profile.nextBadgeInfo.badgeName}</h2>
          <div className="progress-container">
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ 
                  width: `${((profile.points % 100) / 100) * 100}%` 
                }}
              ></div>
            </div>
            <p>{profile.nextBadgeInfo.pointsNeeded} more points needed</p>
            <p className="badge-description">{profile.nextBadgeInfo.description}</p>
          </div>
        </div>
      )}

      <div className="events-section">
        <h2>Recent Events</h2>
        {events.length > 0 ? (
          <div className="events-list">
            {events.slice(0, 5).map((event) => (
              <div key={event._id} className="event-item">
                <div className="event-info">
                  <h4>{event.eventId?.title}</h4>
                  <p>{new Date(event.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="event-points">
                  <span className="points-earned">+10 pts</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-events">
            <p>📝 No events registered yet. Start exploring events to earn points!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
