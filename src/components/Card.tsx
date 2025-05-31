"use client";
import React from "react";
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

  return (
    <div
      className="flex-none w-36 sm:w-48 md:w-56 bg-gray-900 rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
      onClick={handleClick}
    >
      {/* Image Container */}
      <div className="relative group w-full aspect-[3/4] bg-gray-800">
        <DynamicImage
          src={image}
          alt={title}
          width={224}
          height={288}
          className="w-full h-full object-cover"
          fallbackSrc="/images/placeholder.png"
          priority
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

      {/* Content */}
      <div className="p-3 sm:p-4 bg-gray-900">
        <h3 className="font-bold text-sm sm:text-base mb-1 truncate text-white">
          {title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-2">
          {year} • {genre}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1">
            <span className="text-gray-400 text-xs">IMDb</span>
          </div>
          <button className="text-red-400 hover:text-red-300 text-xs transition-colors">
            + List
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;