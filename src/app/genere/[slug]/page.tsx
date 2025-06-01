"use client";
import React, { useMemo, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import { getGenreBySlug, getMoviesByGenre } from "@/actions/genre/genre_action"; // adjust import path

// Types based on your Prisma schema
type Genre = {
    id: number;
    name: string;
    emoji: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
};

type Movie = {
    id: number;
    title: string;
    slug: string;
    description: string | null;
    poster: string | null;
    trailer: string | null;
    releaseDate: Date | null;
    rating: number | null;
    type: string;
    createdAt: Date;
    updatedAt: Date;
    genreId: number;
    genre: Genre;
};

const filterOptions = [
    { label: "All", value: "all" },
    { label: "Top Rated", value: "top" },
    { label: "Most Popular", value: "popular" },
];

const sortOptions = [
    { label: "Latest", value: "latest" },
    { label: "Rating", value: "rating" },
    { label: "Popularity", value: "popularity" },
    { label: "Year", value: "year" },
    { label: "A-Z", value: "az" },
];

const MOVIES_PER_PAGE = 20;

export default function GenrePage() {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const { data: session, status } = useSession();

    // State
    const [genre, setGenre] = useState<Genre | null>(null);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [totalCount, setTotalCount] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [filter, setFilter] = useState("all");
    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);

    // Auth check
    useEffect(() => {
        if (status === "loading") return;
        if (!session) router.replace("/login");
    }, [session, status, router]);

    // Load genre and movies
    useEffect(() => {
        if (!slug || !session) return;
        
        const loadData = async () => {
            try {
                setLoading(true);
                setError(null);

                // Load genre info
                const genreData = await getGenreBySlug(slug);
                if (!genreData) {
                    setError("Genre not found");
                    return;
                }
                setGenre(genreData);

                // Load movies with current filters
                const result = await getMoviesByGenre(slug, {
                    filter: filter as any,
                    sort: sort as any,
                    page,
                    limit: MOVIES_PER_PAGE
                });

                setMovies(result.movies);
                setTotalCount(result.totalCount);
                setTotalPages(result.totalPages);

            } catch (err) {
                console.error('Error loading genre data:', err);
                setError("Failed to load movies");
            } finally {
                setLoading(false);
            }
        };

        loadData();
    }, [slug, session, filter, sort, page]);

    // Reset page when filters change
    useEffect(() => {
        setPage(1);
    }, [filter, sort]);

    if (status === "loading" || !session) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }

    if (error || (!genre && !loading)) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
                <h1 className="text-3xl font-bold mb-4">
                    {error || "Genre Not Found"}
                </h1>
                <button
                    className="px-4 py-2 bg-red-600 rounded hover:bg-red-700 transition-colors"
                    onClick={() => router.push("/")}
                >
                    Go Home
                </button>
            </div>
        );
    }

    return (
        <div className="bg-black min-h-screen text-white flex flex-col">
            <Header />
            <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
                {/* Breadcrumb */}
                <nav className="mb-6">
                    <div className="flex items-center space-x-2 text-sm">
                        <a
                            href="/"
                            className="breadcrumb-item text-gray-400 hover:text-white transition-colors"
                        >
                            Home
                        </a>
                        <svg
                            className="w-4 h-4 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                        <span className="text-red-400">{genre?.name}</span>
                    </div>
                </nav>

                {/* Genre Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{genre?.emoji}</div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                {genre?.name} Movies
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Discover the best {genre?.name.toLowerCase()} movies
                            </p>
                        </div>
                    </div>
                </div>

                {/* Filters & Sort */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                        {/* Filter Buttons */}
                        <div className="flex flex-wrap gap-2">
                            {filterOptions.map((opt) => (
                                <button
                                    key={opt.value}
                                    className={`filter-button px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        filter === opt.value
                                            ? "bg-red-600 text-white"
                                            : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
                                    }`}
                                    onClick={() => setFilter(opt.value)}
                                >
                                    {opt.label}
                                </button>
                            ))}
                        </div>

                        {/* Sort Dropdown */}
                        <div className="relative">
                            <select
                                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
                                value={sort}
                                onChange={(e) => setSort(e.target.value)}
                            >
                                {sortOptions.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        Sort by: {opt.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Results Count */}
                    <div className="mt-4">
                        <p className="text-gray-400 text-sm">
                            Showing {totalCount} {genre?.name.toLowerCase()} movies
                        </p>
                    </div>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 min-h-[300px]">
                    {loading ? (
                        Array.from({ length: 8 }).map((_, i) => (
                            <div key={i} className="flex h-full">
                                <div className="w-full bg-gray-900 rounded-lg overflow-hidden flex flex-col h-full animate-pulse">
                                    <div className="w-full aspect-[3/4] bg-gray-700" />
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
                            </div>
                        ))
                    ) : movies.length === 0 ? (
                        <div className="col-span-full text-center text-gray-400 py-12">
                            <div className="text-6xl mb-4">🎬</div>
                            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                            <p>Try adjusting your filters or check back later.</p>
                        </div>
                    ) : (
                        movies.map((movie) => (
                            <div key={movie.id} className="flex h-full">
                                <Card 
                                    title={movie.title}
                                    year={movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : "N/A"}
                                    rating={movie.rating || 0}
                                    genre={movie.genre?.name || ""}
                                    image={movie.poster || "/placeholder-movie.jpg"}
                                />
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination 
                            page={page} 
                            totalPages={totalPages} 
                            onPageChange={setPage} 
                        />
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
}