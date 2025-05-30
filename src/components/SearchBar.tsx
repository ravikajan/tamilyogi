import React from "react";

const SearchBar = () => (
  <div className="relative hidden sm:block">
    <input
      type="text"
      placeholder="Search movies..."
      className="bg-gray-800 border border-gray-700 rounded-full px-4 py-2 pl-10 w-48 lg:w-64 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
      defaultValue=""
    />
    <svg
      className="w-4 h-4 absolute left-3 top-3 text-gray-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  </div>
);

export default SearchBar;
