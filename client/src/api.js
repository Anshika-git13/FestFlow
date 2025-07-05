import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

console.log(" Axios is using:", API.defaults.baseURL);

export const fetchEvents = () => API.get("/events");

export const createEvent = (newEvent) =>
  API.post("/events", newEvent, {
    headers: {
      "Content-Type": "application/json",
    },
  });
