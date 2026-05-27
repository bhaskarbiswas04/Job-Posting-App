const express = require("express");
const cors = require("cors");
const jobRoutes = require("./routes/jobRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware setups
app.use(cors()); // Allow cross-origin cross-communication requests
app.use(express.json()); // Parses application/json bodies securely

// Routes configurations
app.use("/api/jobs", jobRoutes);

// Global operational confirmation status router
app.get("/", (req, res) => {
  res.send("Intern House Job Board API running smoothly.");
});

app.listen(PORT, () => {
  console.log(
    `Server listening actively on network port http://localhost:${PORT}`,
  );
});
