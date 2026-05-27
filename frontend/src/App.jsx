import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import PostJobPage from "./pages/PostJobPage";

const API_BASE_URL = "https://job-posting-app-server.vercel.app/api/jobs";

function AppContent() {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(API_BASE_URL);
        const data = await response.json();
        if (response.ok) {
          setJobs(data);
        } else {
          console.error("Failed to load records from server:", data.message);
        }
      } catch (error) {
        console.error("Network communication failure:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  // Handle posting a new job with Toast confirmation
  const handleAddJob = async (newJobData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newJobData),
      });
      const savedJob = await response.json();

      if (response.ok) {
        setJobs((prevJobs) => [savedJob, ...prevJobs]);

        toast.success("Successfully job created and posted!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });

        navigate("/");
      } else {
        toast.error(`Error saving: ${savedJob.message}`);
      }
    } catch (error) {
      console.error("Failed to post job:", error);
      toast.error("Network error. Failed to save job.");
    }
  };

  // Handle deleting a job with Toast confirmation
  const handleDeleteJob = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;

    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));

        // Success toast notification for deletion
        toast.success("Job posting successfully deleted!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
      } else {
        const errorData = await response.json();
        toast.error(`Deletion Failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
      toast.error("Network error. Failed to delete job.");
    }
  };

  const viewJobDetails = (job) => {
    setSelectedJob(job);
    navigate("/job-details");
  };

  const viewHome = () => {
    setSelectedJob(null);
    navigate("/");
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
      <Navbar />
      <ToastContainer />

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              jobs={jobs}
              onDelete={handleDeleteJob} // Pass down the delete handler function
              onSeeDetails={viewJobDetails}
            />
          }
        />
        <Route
          path="/post-a-job"
          element={<PostJobPage onAddJob={handleAddJob} />}
        />
        <Route
          path="/job-details"
          element={<JobDetailsPage job={selectedJob} onBack={viewHome} />}
        />
      </Routes>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;