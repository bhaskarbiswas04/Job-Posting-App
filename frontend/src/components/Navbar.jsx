import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
        <Link
          to="/"
          className="text-xl font-bold tracking-wide cursor-pointer select-none"
        >
          Intern House
        </Link>
        <div className="flex gap-6 text-sm font-medium">
          <Link
            to="/"
            className={`hover:underline transition-all ${location.pathname === "/" ? "underline opacity-100" : "opacity-80"}`}
          >
            Job Postings
          </Link>
          <Link
            to="/post-a-job"
            className={`hover:underline transition-all ${location.pathname === "/post-a-job" ? "underline opacity-100" : "opacity-80"}`}
          >
            Post a Job
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;