"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import DynamicImage from "./DynamicImage";
import { searchMovies, getPopularSearches, SearchResult } from "@/actions/search/search_action";

const SearchBanner = () => {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [popularSearches, setPopularSearches] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load popular searches on component mount
    const loadPopularSearches = async () => {
      const popular = await getPopularSearches();
      setPopularSearches(popular);
    };
    loadPopularSearches();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (searchQuery.trim().length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    setShowDropdown(true);
    
    try {
      const results = await searchMovies(searchQuery);
      setSearchResults(results);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = () => {
    if (query.trim().length >= 2 || popularSearches.length > 0) {
      setShowDropdown(true);
    }
  };

  const displayResults = query.trim().length >= 2 ? searchResults : popularSearches;

  return (    <section className="relative flex flex-col justify-center items-center min-h-[420px] bg-gradient-to-t from-black via-black/80 to-transparent rounded-xl mb-12">
      <div className="absolute inset-0 rounded-xl overflow-hidden">
        <DynamicImage
          src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=1200&h=600&fit=crop"
          alt="Search Banner"
          width={1200}
          height={600}
          className="w-full h-full object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>      
      <div className="relative z-20 text-center max-w-4xl px-8">
        <h1 className="text-white text-4xl sm:text-5xl font-extrabold mb-4 drop-shadow-lg">
          Discover Amazing Movies & Series
        </h1>
        <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
          Search through thousands of movies and web series. Find your next favorite watch!
        </p>
        
        <div ref={searchRef} className="relative w-full max-w-2xl mx-auto z-[55]">
          <div className="relative">            <input
              type="text"
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              onFocus={handleInputFocus}
              placeholder="Search for movies, series..."
              className="w-full px-6 py-4 text-lg text-white bg-gray-800 border border-gray-700 rounded-full shadow-lg focus:outline-none focus:ring-4 focus:ring-red-500/50 focus:shadow-xl focus:border-red-500 pr-14 transition-all duration-200 placeholder-gray-400"
            />
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
              {isLoading ? (
                <div className="animate-spin h-6 w-6 border-2 border-red-500 border-t-transparent rounded-full"></div>              ) : (
                <svg
                  className="w-6 h-6 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
          </div>          {showDropdown && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 rounded-lg shadow-2xl border border-gray-700 overflow-hidden z-[60] max-h-80 overflow-y-auto backdrop-blur-sm">
              {displayResults.length > 0 ? (
                <>
                  {query.trim().length < 2 && (                    <div className="px-4 py-2 bg-gray-800 text-sm text-gray-300 font-medium border-b border-gray-700">
                      Popular Searches
                    </div>
                  )}
                  {displayResults.map((result) => (                    <Link
                      key={result.id}
                      href={`/movie/${result.slug}`}
                      className="flex items-center p-4 hover:bg-gray-800 border-b border-gray-700 last:border-b-0 transition-all duration-200 hover:shadow-sm"
                      onClick={() => setShowDropdown(false)}
                    >
                      {result.poster && (
                        <DynamicImage
                          src={result.poster}
                          alt={result.title}
                          width={50}
                          height={75}
                          className="w-12 h-18 object-cover rounded mr-4 flex-shrink-0"
                        />
                      )}
                      <div className="flex-1 min-w-0">                        <h3 className="font-semibold text-white truncate">
                          {result.title}
                        </h3>                        <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                          <span className="bg-red-600 text-white px-2 py-1 rounded text-xs">
                            {result.type === "MOVIE" ? "Movie" : "Series"}
                          </span>
                          {result.releaseYear && (
                            <span>{result.releaseYear}</span>
                          )}
                          {result.rating && (
                            <span className="flex items-center gap-1">
                              <span className="text-yellow-400">★</span>
                              {result.rating}
                            </span>
                          )}
                        </div>
                        {result.description && (
                          <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                            {result.description}
                          </p>
                        )}
                      </div>
                    </Link>
                  ))}
                </>
              ) : query.trim().length >= 2 ? (                <div className="px-4 py-8 text-center text-gray-400">
                  <svg
                    className="w-12 h-12 mx-auto mb-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                  <p className="text-white">No results found for "{query}"</p>
                  <p className="text-sm mt-1 text-gray-500">Try searching with different keywords</p>
                </div>
              ) : null}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default SearchBanner;
