import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
});

console.log(" Axios is using:", API.defaults.baseURL);

// Add auth token to requests if available
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchEvents = () => API.get("/events");

export const createEvent = (newEvent) =>
  API.post("/events", newEvent, {
    headers: {
      "Content-Type": "application/json",
    },
  });

// Auth API calls
export const loginUser = (credentials) => API.post("/auth/login", credentials);
export const signupUser = (userData) => API.post("/auth/signup", userData);

// User Profile API calls
export const getUserProfile = () => API.get("/users/profile");
export const getUserEvents = () => API.get("/users/events");
