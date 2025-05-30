"use client";
import React from "react";
import { useRouter } from "next/navigation";

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
  return (
    <div
      className="movie-card flex-none w-36 sm:w-48 md:w-56 bg-gray-900 rounded-lg overflow-hidden transition-all cursor-pointer"
      onClick={() => router.push(`/movie/${slug}`)}
    >
      <div className="relative group">
        <img
          src={image}
          alt={title}
          className="w-full h-48 sm:h-64 md:h-72 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all flex items-center justify-center">
          <button className="opacity-0 group-hover:opacity-100 bg-red-600 hover:bg-red-700 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-3 sm:p-4">
        <h3 className="font-bold text-sm sm:text-base mb-1 truncate">
          {title}
        </h3>
        <p className="text-gray-400 text-xs sm:text-sm mb-2">
          {year} • {genre}
        </p>
        <div className="flex items-center gap-1">
          <span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded text-xs font-bold">
            {rating}
          </span>
          <span className="text-gray-400 text-xs">IMDb</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
