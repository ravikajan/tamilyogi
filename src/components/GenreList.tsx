"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getGenreList } from "@/actions/genre/genre_action";

const GenreList = () => {
  const router = useRouter();
  const [genres, setGenres] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const data = await getGenreList();
      setGenres(data || []);
      setLoading(false);
    })();
  }, []);
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
      {loading
        ? Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="genre-card bg-gray-800 rounded-lg p-4 sm:p-6 text-center w-full animate-pulse"
            >
              <div className="h-8 w-8 sm:h-10 sm:w-10 mx-auto mb-2 bg-gray-700 rounded-full" />
              <div className="h-4 w-16 sm:w-20 mx-auto bg-gray-700 rounded" />
            </div>
          ))
        : genres.map((genre) => (
            <button
              key={genre.slug}
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
