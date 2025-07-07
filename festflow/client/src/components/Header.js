import React from "react";
import { Link } from "react-router-dom";

import "./Header.css";

function Header({ onAddEventClick, onHomeClick }) {
  return (
    <header className="header">
      <div className="logo">🎉 FestFlow</div>
      <nav className="nav-links">
        <Link to="/" onClick={onHomeClick}>Home</Link>  {}
        <Link to="/about">About Us</Link>
        <Link to="/recommend">Recommendations</Link>
        <button className="add-btn" onClick={onAddEventClick}>Add Event</button>
      </nav>
    </header>
  );
}

export default Header;



