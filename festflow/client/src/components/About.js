import React from "react";
import './About.css';

const About = () => {
  return (
    <div className="about-container">
      {}
      <div className="hero">
        <h1>🎉 Welcome to <span>FestFlow</span></h1>
        <p>Your ultimate college fest companion — discover, create, and enjoy!</p>
      </div>

      {}
      <p className="intro">
        <strong>FestFlow</strong> helps you manage and enjoy every part of your college fest experience — whether you're a participant, organizer, or an enthusiast.
      </p>

      <div className="about-sections">
        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            we aim to streamline the fest experience by offering a platform to browse, create, and explore events effortlessly. From technical competitions to cultural showcases, FestFlow keeps everything organized in one place.
          </p>
        </div>

        <div className="about-card">
          <h2>🚀 Features</h2>
          <ul>
            <li>🗓️ View all upcoming events</li>
            <li>✍️ Add your own events</li>
            <li>🔍 Quick event search & filtering</li>
            <li>📱 Responsive, dark-themed UI</li>
          </ul>
        </div>

        <div className="about-card">
          <h2>🧑‍💻 Meet the Team</h2>
          <p>
            I am Anshika and i am a passionate developer who loves coding and creating cool stuff. FestFlow was built to showcase my MERN stack skills and bring value to college events.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

