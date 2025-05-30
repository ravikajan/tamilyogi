"use client";
import React from "react";
import { useRouter } from "next/navigation";

const genres = [
  { name: "Action", emoji: "🎬", slug: "action" },
  { name: "Comedy", emoji: "😂", slug: "comedy" },
  { name: "Romance", emoji: "💕", slug: "romance" },
  { name: "Horror", emoji: "😱", slug: "horror" },
  { name: "Sci-Fi", emoji: "🚀", slug: "sci-fi" },
  { name: "Drama", emoji: "📚", slug: "drama" },
  { name: "Mystery", emoji: "🔍", slug: "mystery" },
  { name: "Fantasy", emoji: "⚔️", slug: "fantasy" },
  { name: "Musical", emoji: "🎭", slug: "musical" },
  { name: "Animation", emoji: "🌟", slug: "animation" },
  { name: "Crime", emoji: "🔥", slug: "crime" },
  { name: "Documentary", emoji: "🌍", slug: "documentary" },
];

const GenreList = () => {
  const router = useRouter();
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {genres.map((genre) => (
        <button
          key={genre.name}
          className="genre-card bg-gray-800 rounded-lg p-4 sm:p-6 text-center cursor-pointer hover:shadow-lg transition-all w-full"
          onClick={() => router.push(`/genere/${genre.slug}`)}
        >
          <div className="text-2xl sm:text-3xl mb-2">{genre.emoji}</div>
          <div className="text-sm sm:text-base font-medium">{genre.name}</div>
        </button>
      ))}
    </div>
  );
};

export default GenreList;
