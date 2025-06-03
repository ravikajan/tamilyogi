"use server";

import { prisma } from "@/lib/prisma_client/primsa_client";

export interface SearchResult {
  id: number;
  title: string;
  slug: string;
  poster?: string;
  releaseYear?: number;
  rating?: number;
  type: "MOVIE" | "WEB_SERIES";
  description?: string;
}

export async function searchMovies(query: string): Promise<SearchResult[]> {
  if (!query || query.trim().length < 2) {
    return [];
  }

  try {
    const searchTerm = query.trim();
    const searchWords = searchTerm.toLowerCase().split(/\s+/);

    // First, try exact phrase matching
    let movies = await prisma.movie.findMany({
      where: {
        OR: [
          {
            title: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
          {
            description: {
              contains: searchTerm,
              mode: "insensitive",
            },
          },
        ],
      },
      take: 15,
      orderBy: [
        { rating: "desc" },
        { releaseDate: "desc" },
      ],
    });

    // If we don't have enough results, try word-based matching
    if (movies.length < 5) {
      const wordBasedResults = await prisma.movie.findMany({
        where: {
          OR: searchWords.map(word => ({
            title: {
              contains: word,
              mode: "insensitive" as const,
            },
          })),
        },
        take: 20,
        orderBy: [
          { rating: "desc" },
          { releaseDate: "desc" },
        ],
      });

      // Merge results and remove duplicates
      const existingIds = new Set(movies.map(m => m.id));
      const newResults = wordBasedResults.filter(m => !existingIds.has(m.id));
      movies = [...movies, ...newResults];
    }

    // Additional filtering for space-removed matching (client-side)
    const searchTermNoSpaces = searchTerm.replace(/\s+/g, "").toLowerCase();
    if (searchTermNoSpaces.length >= 3) {
      const additionalResults = await prisma.movie.findMany({
        take: 50, // Get more to filter through
        orderBy: [
          { rating: "desc" },
          { releaseDate: "desc" },
        ],
      });

      const spaceMatchResults = additionalResults.filter(movie => {
        const titleNoSpaces = movie.title.replace(/\s+/g, "").toLowerCase();
        return titleNoSpaces.includes(searchTermNoSpaces) && 
               !movies.some(existing => existing.id === movie.id);
      });

      movies = [...movies, ...spaceMatchResults];
    }

    // Limit final results and sort by relevance
    movies = movies.slice(0, 15);

    return movies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      poster: movie.poster || undefined,
      releaseYear: movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : undefined,
      rating: movie.rating || undefined,
      type: movie.type as "MOVIE" | "WEB_SERIES",
      description: movie.description || undefined,
    }));
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
}

export async function getPopularSearches(): Promise<SearchResult[]> {
  try {
    const popularMovies = await prisma.movie.findMany({
      take: 5,
      orderBy: [
        { rating: "desc" },
        { releaseDate: "desc" },
      ],
    });

    return popularMovies.map((movie) => ({
      id: movie.id,
      title: movie.title,
      slug: movie.slug,
      poster: movie.poster || undefined,
      releaseYear: movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : undefined,
      rating: movie.rating || undefined,
      type: movie.type as "MOVIE" | "WEB_SERIES",
      description: movie.description || undefined,
    }));
  } catch (error) {
    console.error("Error fetching popular searches:", error);
    return [];
  }
}
