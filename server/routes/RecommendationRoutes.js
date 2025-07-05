const express = require("express");
const { spawn } = require("child_process");
const router = express.Router();

router.post("/predict-event", (req, res) => {
  const input = JSON.stringify(req.body);
  console.log(" Incoming request body:", input);

  const py = spawn("python", ["ml_model/predict_event.py"]);


  let output = "";
  let errorOutput = "";

  py.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });

  py.stderr.on("data", (chunk) => {
    errorOutput += chunk.toString();
  });

  py.stdin.write(input);
  py.stdin.end();

  py.on("close", (code) => {
    console.log(" Python output:", output);
    if (errorOutput) {
      console.error(" Python error:", errorOutput);
    }

    try {
      const result = JSON.parse(output);
      res.status(200).json(result);
    } catch (err) {
      console.error(" Failed to parse JSON:", err);
      res.status(500).json({
        error: "Prediction failed",
        details: err.toString(),
        raw: output,
      });
    }
  });
});

module.exports = router;



