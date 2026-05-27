const Navbar = ({ onNavigate, currentPage }) => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div
          onClick={() => onNavigate("home")}
          className="text-xl font-bold tracking-wide cursor-pointer select-none"
        >
          Intern House
        </div>
        <div className="flex gap-6 text-sm font-medium">
          <button
            onClick={() => onNavigate("home")}
            className={`hover:underline transition-all ${currentPage === "home" ? "underline opacity-100" : "opacity-80"}`}
          >
            Job Postings
          </button>
          <button
            onClick={() => onNavigate("post-job")}
            className={`hover:underline transition-all ${currentPage === "post-job" ? "underline opacity-100" : "opacity-80"}`}
          >
            Post a Job
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
