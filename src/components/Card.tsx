"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import DynamicImage from "./DynamicImage";

interface CardProps {
  image: string;
  title: string;
  year: string;
  genre: string;
  rating: number;
}

const Card = ({ image, title, year, genre, rating }: CardProps) => {
  const router = useRouter();
  const [imgLoaded, setImgLoaded] = useState(false);
  
  // Generate slug from title (kebab-case)
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  const handleClick = () => {
    router.push(`/movie/${slug}`);
  };

  const handlePlayClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when play button is clicked
    router.push(`/movie/${slug}`);
  };

  const handleWatchlistClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when watchlist button is clicked
    // Add watchlist logic here
    console.log(`Added ${title} to watchlist`);
  };

  return (
    <div
      className="w-44 sm:w-56 md:w-64 bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl flex flex-col h-full"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative group w-full aspect-[3/4] bg-gray-800 overflow-hidden flex-shrink-0">
        {/* Skeleton Loader */}
        {!imgLoaded && (
          <div className="absolute inset-0 animate-pulse bg-gray-700 rounded" />
        )}
        <DynamicImage
          src={image}
          alt={title}
          width={300}
          height={450}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${imgLoaded ? "opacity-100" : "opacity-0"}`}
          fallbackSrc="/images/placeholder.png"
          priority={false}
          onLoad={() => setImgLoaded(true)}
        />
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              className="bg-red-600 hover:bg-red-700 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg"
              onClick={handlePlayClick}
              aria-label={`Play ${title}`}
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5 text-white ml-0.5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Rating Badge */}
        <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded text-xs font-bold shadow-md">
          {rating}
        </div>
      </div>

      {/* Content - This will expand to fill remaining space */}
      <div className="p-3 sm:p-4 bg-gray-900 flex-grow flex flex-col justify-between">
        <div className="flex-grow">
          <h3 className="font-bold text-sm sm:text-base mb-1 line-clamp-2 text-white leading-tight">
            {title}
          </h3>
          <p className="text-gray-400 text-xs sm:text-sm mb-2">
            {year} • {genre}
          </p>
        </div>
        
        <div className="flex items-center justify-between mt-auto pt-2">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-xs">IMDb</span>
          </div>
          <button 
            className="text-red-400 hover:text-red-300 text-xs transition-colors hover:underline"
            onClick={handleWatchlistClick}
            aria-label={`Add ${title} to watchlist`}
          >
            + List
          </button>
        </div>
      </div>
    </div>
  );
};

// Card Skeleton for loading state
export const CardSkeleton = () => (
  <div className="w-full bg-gray-900 rounded-lg overflow-hidden flex flex-col h-full animate-pulse">
    {/* Image Skeleton */}
    <div className="w-full aspect-[3/4] bg-gray-700" />
    {/* Content Skeleton */}
    <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between">
      <div>
        <div className="h-4 bg-gray-700 rounded w-3/4 mb-2" />
        <div className="h-3 bg-gray-700 rounded w-1/2 mb-4" />
      </div>
      <div className="flex items-center justify-between mt-auto pt-2">
        <div className="h-3 w-8 bg-gray-700 rounded" />
        <div className="h-3 w-10 bg-gray-700 rounded" />
      </div>
    </div>
  </div>
);

export default Card;