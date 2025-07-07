import React, { useState, useEffect } from "react";
import CreateEventForm from "./CreateEventForm";
import { Link } from "react-router-dom";
import { fetchEvents } from "../api";
import "./EventList.css";


const constantEvents = [
  
  
];

function EventList({ showForm }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

 
  useEffect(() => {
    const getEvents = async () => {
      try {
        const { data } = await fetchEvents();
        const combinedEvents = [...constantEvents, ...data];
  
      
        const today = new Date();
        const upcomingEvents = combinedEvents.filter(event => {
          const eventDate = new Date(event.date);
          
          return eventDate >= new Date(today.toDateString());
        });
  
        setEvents(upcomingEvents.reverse()); 
      } catch (error) {
        console.error("Error fetching events:", error);
        alert("Failed to fetch events. Please try again later.");
  
     
        const today = new Date();
        const upcomingEvents = constantEvents.filter(event => {
          const eventDate = new Date(event.date);
          return eventDate >= new Date(today.toDateString());
        });
  
        setEvents(upcomingEvents);
      } finally {
        setLoading(false);
      }
    };
  
    getEvents();
  }, []);
  
  const addEvent = (newEvent) => {
    setEvents((prevEvents) => [newEvent, ...prevEvents]);
  };

  return (
    <div className="event-list-container">
      {showForm && <CreateEventForm onAddEvent={addEvent} />}

      {loading ? (
        <p>Loading events...</p>
      ) : events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <div className="event-grid">
          {events.map((event) => (
            <div key={event._id} className="event-card">
              {event.imageUrl && (
                <img src={event.imageUrl} alt={event.title} className="event-image" />
              )}
              <div className="event-content">
                <h3>{event.title}</h3>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <p><strong>Location:</strong> {event.location}</p>
                <Link to={`/event/${event._id}`} className="details-link">
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EventList;
