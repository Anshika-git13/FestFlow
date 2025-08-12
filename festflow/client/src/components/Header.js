import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import PointsDisplay from "./PointsDisplay";

import "./Header.css";

function Header({ onAddEventClick, onHomeClick }) {
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="header">
      <div className="logo">🎉 FestFlow</div>
      <nav className="nav-links">
        <Link to="/" onClick={onHomeClick}>Home</Link>
        <Link to="/about">About Us</Link>
        {isAuthenticated ? (
          <>
            <PointsDisplay />
            <Link to="/profile" className="profile-btn">Profile</Link>
            <Link to="/add-event" className="add-btn">Add Event</Link>
          </>
        ) : (
          <div className="auth-buttons">
            <Link to="/login" className="login-btn">Login</Link>
            <Link to="/signup" className="signup-btn">Sign Up</Link>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;



