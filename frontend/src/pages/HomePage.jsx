import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";

const HomePage = ({ jobs, setJobs, onSeeDetails, apiBaseUrl }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle server-side deletion request
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this job posting?"))
      return;

    try {
      const response = await fetch(`${apiBaseUrl}/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Look for matching backend _id parameters
        setJobs(jobs.filter((job) => job._id !== id));
      } else {
        const errorData = await response.json();
        alert(`Deletion Failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error deleting record:", error);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <main className="max-w-7xl mx-auto px-4 mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">All Jobs</h2>

        {filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.map((job) => (
              <JobCard
                key={job._id} // Switch framework references to mongoDB string _id fields
                job={job}
                onDelete={handleDelete}
                onSeeDetails={onSeeDetails}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm">
            No jobs found matching "{searchTerm}"
          </div>
        )}
      </main>
    </div>
  );
};

export default HomePage;