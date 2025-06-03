"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { getMoviesByGenre } from "@/actions/genre/genre_action";

// Types
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

type MoviesData = {
    movies: Movie[];
    totalCount: number;
    totalPages: number;
};

interface GenreClientPageProps {
    genre: Genre;
    initialMoviesData: MoviesData;
    initialFilter: string;
    initialSort: string;
    initialPage: number;
}

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

export default function GenreClientPage({
    genre,
    initialMoviesData,
    initialFilter,
    initialSort,
    initialPage
}: GenreClientPageProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, status } = useSession();

    // State
    const [moviesData, setMoviesData] = useState<MoviesData>(initialMoviesData);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    
    const [filter, setFilter] = useState(initialFilter);
    const [sort, setSort] = useState(initialSort);
    const [page, setPage] = useState(initialPage);

    // Update URL when filters change
    const updateURL = (newFilter: string, newSort: string, newPage: number) => {
        const params = new URLSearchParams();
        if (newFilter !== "all") params.set("filter", newFilter);
        if (newSort !== "latest") params.set("sort", newSort);
        if (newPage !== 1) params.set("page", newPage.toString());
        
        const queryString = params.toString();
        const newURL = queryString ? `?${queryString}` : "";
        router.push(`/genere/${genre.slug}${newURL}`, { scroll: false });
    };

    // Load movies with new filters
    const loadMovies = async (newFilter: string, newSort: string, newPage: number) => {
        try {
            setLoading(true);
            setError(null);

            const result = await getMoviesByGenre(genre.slug, {
                filter: newFilter as any,
                sort: newSort as any,
                page: newPage,
                limit: MOVIES_PER_PAGE
            });

            setMoviesData(result);
        } catch (err) {
            console.error('Error loading movies:', err);
            setError("Failed to load movies");
        } finally {
            setLoading(false);
        }
    };

    // Handle filter change
    const handleFilterChange = (newFilter: string) => {
        const newPage = 1; // Reset to first page
        setFilter(newFilter);
        setPage(newPage);
        updateURL(newFilter, sort, newPage);
        loadMovies(newFilter, sort, newPage);
    };

    // Handle sort change
    const handleSortChange = (newSort: string) => {
        const newPage = 1; // Reset to first page
        setSort(newSort);
        setPage(newPage);
        updateURL(filter, newSort, newPage);
        loadMovies(filter, newSort, newPage);
    };

    // Handle page change
    const handlePageChange = (newPage: number) => {
        setPage(newPage);
        updateURL(filter, sort, newPage);
        loadMovies(filter, sort, newPage);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Handle genre navigation
    const handleGenreClick = (genreSlug: string) => {
        router.push(`/genere/${genreSlug}`);
    };

    if (status === "loading") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
            </div>
        );
    }    return (
        <div className="relative bg-black min-h-screen text-white flex flex-col">
            <AnimatedBackground variant="dark" particleCount={12} />
            <div className="relative z-10 flex flex-col min-h-screen">
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
                        <span className="text-red-400">{genre.name}</span>
                    </div>
                </nav>

                {/* Genre Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="text-4xl">{genre.emoji}</div>
                        <div>
                            <h1 className="text-3xl sm:text-4xl font-bold">
                                {genre.name} Movies
                            </h1>
                            <p className="text-gray-400 mt-1">
                                Discover the best {genre.name.toLowerCase()} movies
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
                                    onClick={() => handleFilterChange(opt.value)}
                                    disabled={loading}
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
                                onChange={(e) => handleSortChange(e.target.value)}
                                disabled={loading}
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
                            Showing {moviesData.totalCount} {genre.name.toLowerCase()} movies
                        </p>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-900/20 border border-red-600 rounded-lg text-red-400">
                        {error}
                    </div>
                )}

                {/* Movies Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-6 min-h-[300px] relative">
                    {loading && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                        </div>
                    )}
                    
                    {moviesData.movies.length === 0 && !loading ? (
                        <div className="col-span-full text-center text-gray-400 py-12">
                            <div className="text-6xl mb-4">🎬</div>
                            <h3 className="text-xl font-semibold mb-2">No movies found</h3>
                            <p>Try adjusting your filters or check back later.</p>
                        </div>
                    ) : (
                        moviesData.movies.map((movie) => (
                            <div key={movie.id} className="flex h-full">
                                <Card 
                                    title={movie.title}
                                    year={movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : "N/A"}
                                    rating={movie.rating || 0}
                                    genre={movie.genre?.name || ""}
                                    image={movie.poster || "/placeholder-movie.jpg"}
                                    slug={movie.slug}
                                    onGenreClick={() => handleGenreClick(movie.genre?.slug || "")}
                                />
                            </div>
                        ))
                    )}
                </div>

                {/* Pagination */}
                {moviesData.totalPages > 1 && (
                    <div className="mt-12 flex justify-center">
                        <Pagination 
                            page={page} 
                            totalPages={moviesData.totalPages} 
                            onPageChange={handlePageChange}
                            disabled={loading}
                        />
                    </div>
                )}            </main>
            <Footer />
            </div>
        </div>
    );
}
