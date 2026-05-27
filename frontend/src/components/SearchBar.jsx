// import React from "react";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-6">
      <input
        type="text"
        placeholder="Search by job title..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
    </div>
  );
};

export default SearchBar;
