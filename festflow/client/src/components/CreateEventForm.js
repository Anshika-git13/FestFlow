import React, { useState } from "react";
import { createEvent } from "../api"; // 👈 Make sure path is correct
import './CreateEventForm.css';

function CreateEventForm({ onAddEvent }) {
  const [form, setForm] = useState({
    title: "",
    date: "",
    location: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.date || !form.location) {
      alert("Please fill in all required fields!");
      return;
    }

    try {
      const { data } = await createEvent(form);
      onAddEvent(data);
      alert("🎉 Event Created!");
      setForm({ title: "", date: "", location: "", imageUrl: "" });
    } catch (err) {
      console.error("❌ Full Axios error:", err);
      console.error("❌ Error response:", err?.response);
      alert("❌ Failed to create event: " + (err?.response?.data?.message || err.message));
    }
    
  };

  return (
    <form className="create-event-form" onSubmit={handleSubmit}>
      <h2>Add New Event</h2>
      <input
        name="title"
        type="text"
        placeholder="Event Title *"
        value={form.title}
        onChange={handleChange}
        required
      />
      <input
        name="date"
        type="date"
        placeholder="Date *"
        value={form.date}
        onChange={handleChange}
        required
      />
      <input
        name="location"
        type="text"
        placeholder="Location *"
        value={form.location}
        onChange={handleChange}
        required
      />
      <input
        name="imageUrl"
        type="url"
        placeholder="Image URL (optional)"
        value={form.imageUrl}
        onChange={handleChange}
      />
      <button type="submit">Create Event</button>
    </form>
  );
}

export default CreateEventForm;

