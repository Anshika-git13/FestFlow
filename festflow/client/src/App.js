import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import EventList from "./components/EventList";
import Header from "./components/Header";
import EventDetails from "./components/EventDetails";
import About from "./components/About";
import ViewRegistrations from "./components/ViewRegistrations"; 
import EventRecommender from "./components/EventRecommender";



function App() {
  const [showForm, setShowForm] = useState(false);
  const location = useLocation();

  
  useEffect(() => {
    setShowForm(false);
  }, [location.pathname]);

  
  const handleHomeClick = () => {
    setShowForm(false);
  };

  return (
    <>
      <Header
        onAddEventClick={() => setShowForm((prev) => !prev)}
        onHomeClick={handleHomeClick}
      />

      <Routes>
        <Route path="/" element={<EventList showForm={showForm} />} />
        <Route path="/about" element={<About />} />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="*" element={<h1 style={{ padding: "2rem" }}>404 - Not Found</h1>} />
        <Route path="/events/:id/registrations" element={<ViewRegistrations />} />
        <Route path="/recommend" element={<EventRecommender />} />
        <Route path="*" element={<h1 style={{ padding: "2rem" }}>404 - Not Found</h1>} />
      </Routes>
    </>
  );
}

export default App;










