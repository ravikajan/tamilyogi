import React from "react";
import SearchBar from "./SearchBar";
import UserAvatar from "./UserAvatar";

const Header = () => (
  <header className="sticky top-0 z-50 bg-black bg-opacity-95 backdrop-blur-md border-b border-gray-800">
    <div className="container mx-auto px-4 sm:px-6">
      <div className="flex items-center justify-between py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-red-500">StreamFlix</div>
        {/* Center Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#" className="nav-item active font-medium">Home</a>
          <a href="#" className="nav-item font-medium">Movies</a>
          <a href="#" className="nav-item font-medium">Web Series</a>
        </nav>
        {/* Search & Profile */}
        <div className="flex items-center space-x-4">
          <SearchBar />
          {/* Mobile Search Icon */}
          <button className="sm:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
          </button>
          <UserAvatar />
        </div>
      </div>
      {/* Mobile Navigation */}
      <nav className="md:hidden flex justify-center space-x-6 pb-4">
        <a href="#" className="nav-item active text-sm font-medium">Home</a>
        <a href="#" className="nav-item text-sm font-medium">Movies</a>
        <a href="#" className="nav-item text-sm font-medium">Web Series</a>
      </nav>
    </div>
  </header>
);

export default Header;
