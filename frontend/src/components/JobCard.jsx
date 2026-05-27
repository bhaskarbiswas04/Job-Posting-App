
const JobCard = ({ job, onSeeDetails, onDelete }) => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between h-full">
      <div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">{job.title}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-6">
          <p>
            <span className="font-semibold text-gray-700">Company name:</span>{" "}
            {job.company}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Location:</span>{" "}
            {job.location}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Job Type:</span>{" "}
            {job.type}
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-auto">
        <button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
          onClick={() => onSeeDetails(job)}
        >
          See Details
        </button>
        <button
          className="flex-1 bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-2 px-4 rounded transition-colors"
          onClick={() => onDelete(job.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default JobCard;
