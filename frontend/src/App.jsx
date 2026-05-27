import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
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

  // Fetch live jobs data on mount
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

  // Handle posting a new job
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
        navigate("/"); // Clean URL redirection to Home
      } else {
        alert(`Error saving: ${savedJob.message}`);
      }
    } catch (error) {
      console.error("Failed to post job:", error);
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

      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              jobs={jobs}
              setJobs={setJobs}
              onSeeDetails={viewJobDetails}
              apiBaseUrl={API_BASE_URL}
            />
          }
        />
        <Route
          path="/post-a-job"
          element={
            <PostJobPage onAddJob={handleAddJob} navigateToHome={viewHome} />
          }
        />
        <Route
          path="/job-details"
          element={<JobDetailsPage job={selectedJob} onBack={viewHome} />}
        />
      </Routes>
    </div>
  );
}

// Wrapper to provide routing context
function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;