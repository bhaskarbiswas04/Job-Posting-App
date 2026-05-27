const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const jobRoutes = require("./routes/jobRoutes");

// Load env configurations
dotenv.config();

// Establish physical database socket connection link
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/jobs", jobRoutes);

app.get("/", (req, res) => {
  res.send("Intern House Job Board API with MongoDB running smoothly.");
});

app.listen(PORT, () => {
  console.log(
    `Server listening actively on network port http://localhost:${PORT}`,
  );
});