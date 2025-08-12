import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import EventList from "./components/EventList";
import Header from "./components/Header";
import EventDetails from "./components/EventDetails";
import About from "./components/About";
import ViewRegistrations from "./components/ViewRegistrations";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./components/ProtectedRoute";
import LogoutButton from "./components/LogoutButton";
import UserProfile from "./components/UserProfile";
import BadgeNotification from "./components/BadgeNotification"; 




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
    <AuthProvider>
      <Header
        onHomeClick={handleHomeClick}
      />

      <Routes>
        <Route path="/" element={<EventList showForm={showForm} />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        } />
        <Route path="/add-event" element={
          <ProtectedRoute>
            <EventList showForm={true} />
          </ProtectedRoute>
        } />
        <Route path="/event/:id" element={<EventDetails />} />
        <Route path="/events/:id/registrations" element={
          <ProtectedRoute>
            <ViewRegistrations />
          </ProtectedRoute>
        } />
        <Route path="*" element={<h1 style={{ padding: "2rem" }}>404 - Not Found</h1>} />
      </Routes>
      
      <LogoutButton />
      <BadgeNotification />
    </AuthProvider>
  );
}

export default App;










