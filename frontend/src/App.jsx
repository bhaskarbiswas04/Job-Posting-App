import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import JobDetailsPage from "./pages/JobDetailsPage";
import PostJobPage from "./pages/PostJobPage";

// base deployment route string reference
const API_BASE_URL = "https://job-posting-app-server.vercel.app/api/jobs";

function App() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState("home"); // 'home', 'details', 'post-job'
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

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

  // Sync added posts with your Vercel/MongoDB database instance
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
        setCurrentPage("home");
      } else {
        alert(`Error saving: ${savedJob.message}`);
      }
    } catch (error) {
      console.error("Failed to post job:", error);
    }
  };

  const viewJobDetails = (job) => {
    setSelectedJob(job);
    setCurrentPage("details");
  };

  const viewHome = () => {
    setSelectedJob(null);
    setCurrentPage("home");
  };

  return (
    <div className="font-sans antialiased text-gray-900 bg-gray-50 min-h-screen">
      <Navbar
        onNavigate={(page) => setCurrentPage(page)}
        currentPage={currentPage}
      />

      {loading ? (
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {currentPage === "home" && (
            <HomePage
              jobs={jobs}
              setJobs={setJobs}
              onSeeDetails={viewJobDetails}
              apiBaseUrl={API_BASE_URL}
            />
          )}

          {currentPage === "details" && (
            <JobDetailsPage job={selectedJob} onBack={viewHome} />
          )}

          {currentPage === "post-job" && (
            <PostJobPage onAddJob={handleAddJob} navigateToHome={viewHome} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
