const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a job title"],
    trim: true,
  },
  company: {
    type: String,
    required: [true, "Please add a company name"],
    trim: true,
  },
  location: {
    type: String,
    required: [true, "Please add a location"],
    trim: true,
  },
  salary: {
    type: Number,
    required: [true, "Please add a salary"],
  },
  type: {
    type: String,
    required: [true, "Please select a job type"],
    enum: [
      "Full-time (On-site)",
      "Part-time (On-site)",
      "Full-time (Remote)",
      "Part-time (Remote)",
    ],
  },
  description: {
    type: String,
    required: [true, "Please add a job description"],
  },
  qualifications: {
    type: [String], // Array of strings
    required: [true, "Please add qualifications"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Job", JobSchema);
