import { useState } from "react";
import SearchBar from "../components/SearchBar";
import JobCard from "../components/JobCard";

const HomePage = ({ jobs, setJobs, onSeeDetails }) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handle instant item removal from the parent state
  const handleDelete = (id) => {
    setJobs(jobs.filter((job) => job.id !== id));
  };

  // Filter jobs by title safely using the passed down jobs prop
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
                key={job.id}
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