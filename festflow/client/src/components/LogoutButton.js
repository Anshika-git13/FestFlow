import React from 'react';
import { useAuth } from '../context/AuthContext';
import './LogoutButton.css';

const LogoutButton = () => {
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="logout-button-container">
      <button onClick={handleLogout} className="floating-logout-btn">
        <span className="logout-icon">🚪</span>
        <span className="logout-text">Logout</span>
      </button>
    </div>
  );
};

export default LogoutButton;
