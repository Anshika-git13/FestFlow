import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import './PointsDisplay.css';

const PointsDisplay = () => {
  const { user, token, isAuthenticated } = useAuth();
  const [points, setPoints] = useState(0);

  useEffect(() => {
    if (isAuthenticated && token) {
      fetchUserPoints();
    }
  }, [isAuthenticated, token]);

  const fetchUserPoints = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPoints(response.data.points || 0);
    } catch (error) {
      console.error('Failed to fetch user points:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="points-display">
      <span className="points-icon">🎯</span>
      <span className="points-text">{points} pts</span>
    </div>
  );
};

export default PointsDisplay;

