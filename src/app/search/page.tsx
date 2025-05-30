"use client";
import React, { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";

// Demo data (should be fetched in real app)
const allMovies = [
	{
		image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
		title: "Cyber Punk 2077",
		year: "2024",
		genre: "Action, Sci-Fi",
		rating: 8.5,
		quality: "HD",
		description:
			"In a dystopian future where technology has merged with humanity, a mercenary outlaw navigates the dangerous streets of Night City...",
	},
	{
		image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
		title: "Fire Storm",
		year: "2024",
		genre: "Action",
		rating: 7.9,
		quality: "4K",
	},
	{
		image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
		title: "Arctic Storm",
		year: "2023",
		genre: "Action",
		rating: 8.7,
		quality: "HD",
	},
	{
		image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
		title: "Night Runner",
		year: "2024",
		genre: "Action",
		rating: 8.3,
		quality: "4K",
	},
	{
		image: "https://images.unsplash.com/photo-1489599904537-7e2b9e74d6f6?w=300&h=450&fit=crop",
		title: "Space Odyssey",
		year: "2024",
		genre: "Action",
		rating: 9.2,
		quality: "HD",
	},
	{
		image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
		title: "Dark Waters",
		year: "2024",
		genre: "Action",
		rating: 8.8,
		quality: "4K",
	},
	{
		image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
		title: "Quantum Realm",
		year: "2024",
		genre: "Action",
		rating: 8.1,
		quality: "HD",
	},
];

const suggestions = [
	"action thriller",
	"action comedy",
	"sci-fi action",
	"adventure movies",
];

const filterOptions = [
	"All Results",
	"Movies",
	"TV Shows",
	"Actors",
	"Directors",
];

const sortOptions = [
	"Relevance",
	"Rating",
	"Year",
	"Popularity",
	"A-Z",
];

export default function SearchPage() {
	const searchParams = useSearchParams();
	const router = useRouter();
	const [view, setView] = useState("grid");
	const [filter, setFilter] = useState("All Results");
	const [sort, setSort] = useState("Relevance");
	const query = searchParams.get("q") || "";

	// Filter and sort logic (demo)
	const filtered = allMovies.filter((m) =>
		m.title.toLowerCase().includes(query.toLowerCase()) ||
		m.genre.toLowerCase().includes(query.toLowerCase())
	);

	return (
		<div className="bg-black text-white min-h-screen flex flex-col">
			<Header />
			<main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
				{/* Breadcrumb */}
				<nav className="mb-6">
					<div className="flex items-center space-x-2 text-sm">
						<a href="/" className="breadcrumb-item text-gray-400 hover:text-white">Home</a>
						<svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
						</svg>
						<span className="text-red-400">Search Results</span>
					</div>
				</nav>
				{/* Search Header */}
				<div className="mb-8">
					<h1 className="text-3xl sm:text-4xl font-bold mb-2">Search Results</h1>
					<p className="text-gray-400">
						Found <span className="text-white font-medium">{filtered.length} results</span> for "<span className="text-red-400">{query}</span>"
					</p>
				</div>
				{/* Suggestions */}
				{filtered.length < 3 && (
					<div className="mb-8">
						<h2 className="text-xl font-semibold mb-4">Did you mean?</h2>
						<div className="flex flex-wrap gap-2">
							{suggestions.map((s) => (
								<button
									key={s}
									className="search-suggestion bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-sm transition-colors"
									onClick={() => router.push(`/search?q=${encodeURIComponent(s)}`)}
								>
									{s}
								</button>
							))}
						</div>
					</div>
				)}
				{/* Filters & Sort */}
				<div className="mb-8">
					<div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
						<div className="flex flex-wrap gap-2">
							{filterOptions.map((opt) => (
								<button
									key={opt}
									className={`filter-button px-4 py-2 rounded-full text-sm font-medium ${filter === opt ? "bg-red-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-red-600 hover:text-white"}`}
									onClick={() => setFilter(opt)}
								>
									{opt}
								</button>
							))}
						</div>
						<div className="flex items-center gap-4">
							<select
								className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
								value={sort}
								onChange={e => setSort(e.target.value)}
							>
								{sortOptions.map(opt => (
									<option key={opt} value={opt}>Sort by: {opt}</option>
								))}
							</select>
							<div className="flex bg-gray-800 rounded-lg p-1">
								<button
									className={`view-toggle px-3 py-1 rounded text-sm ${view === "grid" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
									onClick={() => setView("grid")}
								>
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M3 3h7v7H3V3zm11 0h7v7h-7V3zM3 14h7v7H3v-7zm11 0h7v7h-7v-7z" />
									</svg>
								</button>
								<button
									className={`view-toggle px-3 py-1 rounded text-sm ${view === "list" ? "bg-red-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
									onClick={() => setView("list")}
								>
									<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
										<path d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z" />
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
				{/* Featured Top Result (dummy) */}
				{filtered.length > 0 && (
					<section className="mb-10">
						<h2 className="text-2xl font-bold mb-6">Top Result</h2>
						<div className="result-card bg-gray-900 rounded-lg p-4 sm:p-6 mb-6 hover:bg-gray-800 transition-colors">
							<div className="flex flex-col sm:flex-row gap-4">
								<div className="flex-shrink-0">
									<img src={filtered[0].image} alt={filtered[0].title} className="w-full sm:w-32 h-48 sm:h-48 object-cover rounded-lg" />
								</div>
								<div className="flex-grow">
									<div className="flex items-start justify-between mb-2">
										<h3 className="text-xl font-bold">{filtered[0].title}</h3>
										<span className="bg-yellow-500 text-black px-2 py-1 rounded text-sm font-bold">{filtered[0].rating}</span>
									</div>
									<div className="flex flex-wrap items-center gap-2 mb-3">
										<span className="bg-red-600 text-white px-2 py-1 rounded text-xs">MOVIE</span>
										<span className="text-gray-400 text-sm">{filtered[0].year} • {filtered[0].genre}</span>
										<span className="bg-green-600 text-white px-2 py-1 rounded text-xs">{filtered[0].quality}</span>
									</div>
									<p className="text-gray-300 text-sm mb-4 line-clamp-2">
										{filtered[0].description || "No description available."}
									</p>
									<div className="flex flex-wrap gap-3">
										<button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2">
											<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
												<path d="M8 5v14l11-7z" />
											</svg>
											Watch Now
										</button>
										<button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
											+ Watchlist
										</button>
										<button className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
											More Info
										</button>
									</div>
								</div>
							</div>
						</div>
					</section>
				)}
				{/* Results */}
				{filtered.length === 0 ? (
					<div className="text-center py-16">
						<svg className="w-24 h-24 mx-auto text-gray-600 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
						</svg>
						<h2 className="text-2xl font-bold mb-4">No results found</h2>
						<p className="text-gray-400 mb-6">We couldn't find any content matching your search.</p>
						<div className="space-y-4">
							<p className="text-sm text-gray-500">Try searching for:</p>
							<div className="flex flex-wrap justify-center gap-2">
								{suggestions.map((s) => (
									<button key={s} className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full text-sm" onClick={() => router.push(`/search?q=${encodeURIComponent(s)}`)}>{s}</button>
								))}
							</div>
						</div>
					</div>
				) : (
					<div className={view === "grid" ? "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6" : "space-y-4"}>
						{filtered.map((movie, idx) => (
							<Card key={movie.title + idx} {...movie} />
						))}
					</div>
				)}
			</main>
			<Footer />
		</div>
	);
}
