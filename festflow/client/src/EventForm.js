import React, { useState } from "react";

export default function EventForm({ onAdd }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !date) {
      alert("Please enter at least the event name and date.");
      return;
    }
    onAdd({
      id: Date.now(),
      name,
      date,
      time,
      location,
      description,
    });
    setName("");
    setDate("");
    setTime("");
    setLocation("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <h3>Add New Event</h3>
      <input
        type="text"
        placeholder="Event Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
        style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
      />
      <input
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
      />
      <input
        type="text"
        placeholder="Location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
      />
      <button type="submit" style={{ padding: "0.5rem 1rem" }}>
        Add Event
      </button>
    </form>
  );
}
