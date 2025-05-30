"use client";
import React, { useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import SearchBar from "@/components/SearchBar";
import UserAvatar from "@/components/UserAvatar";
import Card from "@/components/Card";
import Footer from "@/components/Footer";
import Pagination from "@/components/Pagination";

// Demo genre data (should match your GenreList)
const genres = [
	{
		name: "Action",
		emoji: "🎬",
		slug: "action",
		description: "Explosive entertainment and thrilling adventures",
	},
	{
		name: "Drama",
		emoji: "🎭",
		slug: "drama",
		description: "Emotional stories and powerful performances",
	},
	{
		name: "Comedy",
		emoji: "😂",
		slug: "comedy",
		description: "Laugh-out-loud fun and feel-good moments",
	},
	{
		name: "Horror",
		emoji: "👻",
		slug: "horror",
		description: "Spine-chilling scares and suspense",
	},
	{
		name: "Sci-Fi",
		emoji: "🚀",
		slug: "sci-fi",
		description: "Futuristic worlds and mind-bending adventures",
	},
	{
		name: "Romance",
		emoji: "❤️",
		slug: "romance",
		description: "Heartwarming love stories",
	},
	// Add more as needed
];

// Demo movie data (replace with real data/fetch in production)
const allMovies = [
	{
		title: "Cyber Punk 2077",
		year: 2024,
		genre: "action",
		rating: 8.5,
		quality: "HD",
		image:
			"https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
	},
	{
		title: "Fire Storm",
		year: 2024,
		genre: "action",
		rating: 7.9,
		quality: "4K",
		image:
			"https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
	},
	{
		title: "Arctic Storm",
		year: 2023,
		genre: "action",
		rating: 8.7,
		quality: "HD",
		image:
			"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
	},
	{
		title: "Night Runner",
		year: 2024,
		genre: "action",
		rating: 8.3,
		quality: "4K",
		image:
			"https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
	},
	{
		title: "Space Odyssey",
		year: 2024,
		genre: "action",
		rating: 9.2,
		quality: "HD",
		image:
			"https://images.unsplash.com/photo-1489599904537-7e2b9e74d6f6?w=300&h=450&fit=crop",
	},
	{
		title: "Dark Waters",
		year: 2024,
		genre: "action",
		rating: 8.8,
		quality: "4K",
		image:
			"https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
	},
	{
		title: "Quantum Realm",
		year: 2024,
		genre: "action",
		rating: 8.1,
		quality: "HD",
		image:
			"https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
	},
	{
		title: "Desert Moon",
		year: 2023,
		genre: "action",
		rating: 9.0,
		quality: "4K",
		image:
			"https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
	},
	{
		title: "Ocean Deep",
		year: 2023,
		genre: "action",
		rating: 8.4,
		quality: "HD",
		image:
			"https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=450&fit=crop",
	},
	{
		title: "City Lights",
		year: 2023,
		genre: "action",
		rating: 7.8,
		quality: "HD",
		image:
			"https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
	},
	{
		title: "Storm Chaser",
		year: 2023,
		genre: "action",
		rating: 8.9,
		quality: "4K",
		image:
			"https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=450&fit=crop",
	},
	{
		title: "Mind Games",
		year: 2024,
		genre: "action",
		rating: 8.5,
		quality: "HD",
		image:
			"https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=300&h=450&fit=crop",
	},
	// Add more movies and genres as needed
];

const filterOptions = [
	{ label: "All", value: "all" },
	{ label: "2024", value: "2024" },
	{ label: "2023", value: "2023" },
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

	const genre = genres.find((g) => g.slug === slug);
	const [filter, setFilter] = useState("all");
	const [sort, setSort] = useState("latest");
	const [page, setPage] = useState(1);

	// Filter and sort movies
	const movies = useMemo(() => {
		let filtered = allMovies.filter((m) => m.genre === slug);
		if (filter === "2024" || filter === "2023") {
			filtered = filtered.filter((m) => m.year.toString() === filter);
		} else if (filter === "top") {
			filtered = filtered.filter((m) => m.rating >= 8.5);
		} else if (filter === "popular") {
			filtered = filtered.slice(0, 6); // Demo: top 6 as popular
		}
		// Sorting
		if (sort === "latest") {
			filtered = filtered.sort((a, b) => b.year - a.year);
		} else if (sort === "rating") {
			filtered = filtered.sort((a, b) => b.rating - a.rating);
		} else if (sort === "az") {
			filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
		} else if (sort === "year") {
			filtered = filtered.sort((a, b) => b.year - a.year);
		}
		return filtered;
	}, [slug, filter, sort]);

	// Pagination
	const totalPages = Math.ceil(movies.length / MOVIES_PER_PAGE);
	const pagedMovies = movies.slice(
		(page - 1) * MOVIES_PER_PAGE,
		page * MOVIES_PER_PAGE
	);

	if (!genre) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
				<h1 className="text-3xl font-bold mb-4">Genre Not Found</h1>
				<button
					className="px-4 py-2 bg-red-600 rounded"
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
							className="breadcrumb-item text-gray-400 hover:text-white"
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
								{genre.description}
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
									className={`filter-button px-4 py-2 rounded-full text-sm font-medium ${
										filter === opt.value
											? "bg-red-600 text-white"
											: "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"
									}`}
									onClick={() => {
										setFilter(opt.value);
										setPage(1);
									}}
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
							Showing {movies.length}{" "}
							{genre.name.toLowerCase()} movies
						</p>
					</div>
				</div>
				{/* Movies Grid */}
				<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
					{pagedMovies.length === 0 ? (
						<div className="col-span-full text-center text-gray-400 py-12">
							No movies found.
						</div>
					) : (
						pagedMovies.map((movie, idx) => (
							<Card
								key={movie.title + idx}
								{...movie}
								year={movie.year.toString()}
							/>
						))
					)}
				</div>
				{/* Pagination */}
				{totalPages > 1 && (
					<div className="mt-12 flex justify-center">
						<Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
