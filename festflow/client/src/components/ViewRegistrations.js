import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import './ViewRegistration.css';


const ViewRegistrations = () => {
  const { id } = useParams(); 
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [eventTitle, setEventTitle] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const regRes = await axios.get(`${process.env.REACT_APP_API_URL}/events/${id}/registrations`);
        setRegistrations(regRes.data);

        const eventRes = await axios.get(`${process.env.REACT_APP_API_URL}/events/${id}`);
        setEventTitle(eventRes.data.title);
      } catch (error) {
        console.error("Error fetching registrations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Registrations for "{eventTitle}"</h2>
      {registrations.length === 0 ? (
        <p>No registrations yet.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ marginTop: "1rem", width: "100%" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>University</th>
              <th>Course</th>
              <th>Roll Number</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map((reg) => (
              <tr key={reg._id}>
                <td>{reg.name}</td>
                <td>{reg.email}</td>
                <td>{reg.university}</td>
                <td>{reg.course}</td>
                <td>{reg.rollno}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewRegistrations;
