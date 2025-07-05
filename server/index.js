const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const EventRoutes = require("./routes/EventRoutes"); 
require("dotenv").config();

console.log("Mongo URI:", process.env.MONGO_URI);
const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: ["http://localhost:3000", "https://fest-flow-event-management-yourid.vercel.app"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log(" MongoDB connection error:", err));


const eventRoutes = require('./routes/EventRoutes');
const recommendationRoutes = require("./routes/RecommendationRoutes");

app.use("/api/events", eventRoutes);
app.use("/api/recommend", recommendationRoutes);




app.get("/", (req, res) => {
  res.send("🎉 FestFlow backend is running!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

