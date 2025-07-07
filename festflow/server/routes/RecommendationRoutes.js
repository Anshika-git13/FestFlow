const express = require("express");
const axios = require("axios");
const router = express.Router();

router.post("/predict-event", async (req, res) => {
  try {
    const { department, interests, difficulty } = req.body;

    const flaskPayload = {
      department,
      interests,
      difficulty,
    };

    const response = await axios.post("http://localhost:5001/predict", flaskPayload);

    res.status(200).json({
      recommended_event: response.data.recommended_event,
    });

  } catch (error) {
    console.error("Error calling Flask API:", error.message);
    res.status(500).json({ error: "Prediction failed" });
  }
});

module.exports = router;






