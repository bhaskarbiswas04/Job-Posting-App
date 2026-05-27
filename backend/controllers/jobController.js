const Job = require("../models/jobModel");

// @desc    Get all jobs from MongoDB
// @route   GET /api/jobs
exports.getAllJobs = async (req, res) => {
  try {
    // Fetch jobs sorting by newest first
    const jobs = await Job.find().sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error fetching jobs", error: error.message });
  }
};

// @desc    Create a job posting and save it in the database
// @route   POST /api/jobs
exports.createJob = async (req, res) => {
  try {
    const {
      title,
      company,
      location,
      salary,
      type,
      description,
      qualifications,
    } = req.body;

    // Backend validation safeguard
    if (
      !title ||
      !company ||
      !location ||
      !salary ||
      !type ||
      !description ||
      !qualifications
    ) {
      return res
        .status(400)
        .json({ message: "Please include all required fields." });
    }

    // Save directly to MongoDB using the model schema
    const newJob = await Job.create({
      title,
      company,
      location,
      salary: Number(salary),
      type,
      description,
      qualifications: Array.isArray(qualifications)
        ? qualifications
        : [qualifications],
    });

    res.status(201).json(newJob);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error saving job posting",
        error: error.message,
      });
  }
};

// @desc    Delete a job posting from MongoDB
// @route   DELETE /api/jobs/:id
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res
        .status(404)
        .json({ message: "Job item not found with that reference ID." });
    }

    await job.deleteOne();
    res
      .status(200)
      .json({ message: "Job post successfully removed.", id: req.params.id });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error processing deletion request",
        error: error.message,
      });
  }
};