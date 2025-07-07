import React, { useState } from "react";
import axios from "axios";
import "./EventRecommender.css";

const EventRecommender = () => {
  const [formData, setFormData] = useState({
    department: "",
    interests: "",
    difficulty: "",
  });

  const [recommendedEvent, setRecommendedEvent] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/recommend/predict-event", formData);


      setRecommendedEvent(res.data.recommended_event);
    } catch (error) {
      console.error("Prediction failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="create-event-form">
      <h2>🎯 Get Your Perfect Event Recommendation</h2>

      <input
        type="text"
        name="department"
        placeholder="Enter Department (e.g. CSE)"
        value={formData.department}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="interests"
        placeholder="Enter Interest (e.g. AI)"
        value={formData.interests}
        onChange={handleChange}
        required
      />
      <select
        name="difficulty"
        value={formData.difficulty}
        onChange={handleChange}
        required
      >
        <option value="">Select Difficulty</option>
        <option value="Easy">Easy</option>
        <option value="Moderate">Moderate</option>
        <option value="Hard">Hard</option>
      </select>

      <button type="submit">Get Recommendation</button>

      {recommendedEvent && (
        <div className="result">
          <h3>🔥 Recommended Event:</h3>
          <p>{recommendedEvent}</p>
        </div>
      )}
    </form>
  );
};

export default EventRecommender;
