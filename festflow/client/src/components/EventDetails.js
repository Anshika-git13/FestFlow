import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './EventDetails.css';
import RegistrationForm from './RegistrationForm';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/events/${id}`)
      .then(res => {
        setEvent(res.data); 
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching event:", err);
        setError("Event not found");
        setLoading(false);
      });
  }, [id]);
  

  if (loading) return <p>Loading event details...</p>;
  if (error) return <h2 className="not-found">{error}</h2>;
  if (!event) return null;

  return (
    <div className="event-container">
      <div className="event-card">
        <img 
          src={event.imageUrl || "https://source.unsplash.com/400x250/?event"} 
          alt={event.name || event.title} 
          className="event-image" 
        />
        <h1>{event.name || event.title}</h1>
        <p className="event-date"><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
        <p className="event-location"><strong>Location:</strong> {event.location || "To Be Announced"}</p>
        <div className="event-tags">
          {event.tags && event.tags.map((tag, i) => (
            <span key={i} className="tag">{tag}</span>
          ))}
        </div>
        <p className="event-desc">{event.description}</p>

        {}
        <div className="event-actions">
          <button className="register-btn" onClick={() => setShowForm(true)}>Register</button>

          <button 
            className="view-registrations-btn" 
            onClick={() => window.location.href = `/events/${id}/registrations`}
          >
            View Registrations
          </button>
        </div>

        <Link to="/" className="back-link">← Back to events</Link>

        {showForm && (
          <RegistrationForm 
            eventId={event._id} 
            eventName={event.name || event.title} 
            onClose={() => setShowForm(false)} 
          />
        )}
      </div>
    </div>
  );
};

export default EventDetails;
