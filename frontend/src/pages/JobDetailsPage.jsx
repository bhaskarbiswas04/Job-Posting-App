
const JobDetailsPage = ({ job, onBack }) => {
  if (!job) {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-8 text-center text-gray-600">
        Job not found.
        <button
          onClick={onBack}
          className="block mx-auto mt-4 text-blue-600 hover:underline"
        >
          Go back home
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen pb-12">
      <div className="max-w-7xl mx-auto px-4 pt-8">
        {/* Back Button for smoother user flow */}
        <button
          onClick={onBack}
          className="mb-4 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1"
        >
          &larr; Back to Job Postings
        </button>

        {/* Job Title Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-6">{job.title}</h1>

        {/* Details Container Box */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
          <div className="space-y-4 text-gray-800">
            <p>
              <span className="font-bold">Company Name:</span> {job.company}
            </p>

            <p>
              <span className="font-bold">Location:</span> {job.location}
            </p>

            <p>
              <span className="font-bold">Salary:</span> {job.salary || "N/A"}
            </p>

            <p>
              <span className="font-bold">Job Type:</span> {job.type}
            </p>

            <p className="leading-relaxed">
              <span className="font-bold">Description:</span>{" "}
              {job.description || "No description provided."}
            </p>

            <div>
              <span className="font-bold block mb-2">Qualifications:</span>
              {job.qualifications && job.qualifications.length > 0 ? (
                <ol className="list-decimal list-inside pl-2 space-y-1 text-gray-700">
                  {job.qualifications.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-gray-500 italic">
                  No specific qualifications listed.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsPage;
