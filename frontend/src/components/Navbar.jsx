// import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="text-xl font-bold tracking-wide">Intern House</div>
        <div className="flex gap-6 text-sm font-medium">
          <a href="#" className="hover:underline transition-all">
            Job Postings
          </a>
          <a
            href="#"
            className="hover:underline opacity-80 hover:opacity-100 transition-all"
          >
            Post a Job
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
