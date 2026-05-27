let jobs = require("../config/db");

// @desc    Get all jobs
// @route   GET /api/jobs
exports.getAllJobs = (req, res) => {
  try {
    res.status(200).json(jobs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Server Error fetching jobs", error: error.message });
  }
};

// @desc    Create a job posting
// @route   POST /api/jobs
exports.createJob = (req, res) => {
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

    const newJob = {
      id: Date.now(), // Generate unique numeric stamp ID
      title,
      company,
      location,
      salary,
      type,
      description,
      qualifications: Array.isArray(qualifications)
        ? qualifications
        : [qualifications],
    };

    jobs.unshift(newJob); // Push to the front of the list
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

// @desc    Delete a job posting
// @route   DELETE /api/jobs/:id
exports.deleteJob = (req, res) => {
  try {
    const jobId = parseInt(req.params.id);
    const initialLength = jobs.length;

    jobs = jobs.filter((job) => job.id !== jobId);

    if (jobs.length === initialLength) {
      return res
        .status(404)
        .json({ message: "Job item not found with that reference ID." });
    }

    res
      .status(200)
      .json({ message: "Job post successfully removed.", id: jobId });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Server Error processing deletion request",
        error: error.message,
      });
  }
};
