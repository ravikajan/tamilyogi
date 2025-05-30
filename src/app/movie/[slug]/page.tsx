"use client";
import React from "react";
import { useParams, useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";

// Demo movie data (should be shared or fetched in real app)
const allMovies = [
	{
		slug: "cyber-punk-2077",
		title: "Cyber Punk 2077",
		year: 2024,
		genre: "action",
		genres: ["Action", "Sci-Fi", "Thriller", "Adventure"],
		rating: 8.5,
		quality: "HD",
		duration: "2h 35m",
		certificate: "R",
		image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=1920&h=1080&fit=crop",
		poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
		description:
			"In a dystopian future where technology has merged with humanity, a mercenary outlaw navigates the dangerous streets of Night City. When a heist goes wrong, they must fight for survival while uncovering a conspiracy that threatens the very fabric of society. With cutting-edge cybernetic enhancements and the help of unlikely allies, the protagonist must choose between personal gain and saving humanity.",
		director: "John Rodriguez",
		cast: "Alex Chen, Sarah Martinez",
		producer: "Michael Johnson",
		studio: "CyberFlix Studios",
		technical: {
			quality: "4K Ultra HD",
			audio: "Dolby Atmos",
			subtitles: "15 Languages",
			release: "March 15, 2024",
		},
		video: "#", // Demo
	},
	// ...other movies (add at least 5-6 for related)
	{
		slug: "fire-storm",
		title: "Fire Storm",
		year: 2024,
		genre: "action",
		genres: ["Action"],
		rating: 7.9,
		quality: "4K",
		image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
		poster: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=1920&h=1080&fit=crop",
	},
	{
		slug: "space-odyssey",
		title: "Space Odyssey",
		year: 2024,
		genre: "sci-fi",
		genres: ["Sci-Fi"],
		rating: 9.2,
		quality: "HD",
		image: "https://images.unsplash.com/photo-1489599904537-7e2b9e74d6f6?w=300&h=450&fit=crop",
		poster: "https://images.unsplash.com/photo-1489599904537-7e2b9e74d6f6?w=1920&h=1080&fit=crop",
	},
	{
		slug: "quantum-realm",
		title: "Quantum Realm",
		year: 2024,
		genre: "sci-fi",
		genres: ["Sci-Fi"],
		rating: 8.1,
		quality: "HD",
		image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
		poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=1920&h=1080&fit=crop",
	},
	{
		slug: "dark-waters",
		title: "Dark Waters",
		year: 2024,
		genre: "thriller",
		genres: ["Thriller"],
		rating: 8.8,
		quality: "4K",
		image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
		poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=1920&h=1080&fit=crop",
	},
	{
		slug: "night-runner",
		title: "Night Runner",
		year: 2024,
		genre: "action",
		genres: ["Action"],
		rating: 8.3,
		quality: "4K",
		image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
		poster: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=1920&h=1080&fit=crop",
	},
	{
		slug: "arctic-storm",
		title: "Arctic Storm",
		year: 2023,
		genre: "action",
		genres: ["Action"],
		rating: 8.7,
		quality: "HD",
		image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
		poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop",
	},
];

export default function MoviePage() {
	const params = useParams();
	const router = useRouter();
	const slug = params?.slug as string;
	const movie = allMovies.find((m) => m.slug === slug);
	if (!movie) {
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
				<h1 className="text-3xl font-bold mb-4">Movie Not Found</h1>
				<button className="px-4 py-2 bg-red-600 rounded" onClick={() => router.push("/")}>
					Go Home
				</button>
			</div>
		);
	}
	// Related movies: same genre, not this movie
	const related = allMovies.filter((m) => m.genre === movie.genre && m.slug !== movie.slug).slice(0, 6);

	return (
		<div className="bg-black text-white min-h-screen flex flex-col">
			<Header />
			<main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
				{/* Breadcrumb */}
				<nav className="mb-6">
					<div className="flex items-center space-x-2 text-sm">
						<a href="/" className="breadcrumb-item text-gray-400 hover:text-white">
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
						<a
							href="/genere/action"
							className="breadcrumb-item text-gray-400 hover:text-white"
						>
							{movie.genre.charAt(0).toUpperCase() + movie.genre.slice(1)}
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
						<span className="text-red-400">{movie.title}</span>
					</div>
				</nav>
				{/* Video Player */}
				<div className="mb-8">
					<div className="video-player relative mb-6 rounded-xl overflow-hidden max-h-[400px]">
						<video
							className="w-full h-full object-cover max-h-[400px]"
							controls
							poster={movie.poster}
							id="moviePlayer"
						>
							<source src={movie.video} type="video/mp4" />
							<p className="text-center text-gray-400 py-8">
								Your browser does not support the video tag.
							</p>
						</video>
						{/* Overlay play button (demo) */}
						<div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center" id="playerOverlay">
							<button
								className="bg-red-600 hover:bg-red-700 w-20 h-20 rounded-full flex items-center justify-center transition-all hover:scale-110"
								onClick={() => {
									const video = document.getElementById("moviePlayer") as HTMLVideoElement;
									const overlay = document.getElementById("playerOverlay");
									if (video && overlay) {
										overlay.style.display = "none";
										video.play();
									}
								}}
							>
								<svg className="w-8 h-8 ml-1" fill="currentColor" viewBox="0 0 24 24">
									<path d="M8 5v14l11-7z" />
								</svg>
							</button>
						</div>
					</div>
					{/* Movie Info */}
					<div className="grid md:grid-cols-3 gap-8">
						{/* Main Info */}
						<div className="md:col-span-2">
							<h1 className="text-3xl sm:text-4xl font-bold mb-4">{movie.title}</h1>
							{/* Movie Meta */}
							<div className="flex flex-wrap items-center gap-4 mb-6">
								<div className="flex items-center gap-2">
									<span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
										{movie.rating}
									</span>
									<span className="text-gray-400">IMDb</span>
								</div>
								<span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
									{movie.quality}
								</span>
								<span className="text-gray-400">{movie.year}</span>
								<span className="text-gray-400">•</span>
								<span className="text-gray-400">{movie.duration || "2h 35m"}</span>
								<span className="text-gray-400">•</span>
								<span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
									{movie.certificate || "R"}
								</span>
							</div>
							{/* Genre Tags */}
							<div className="flex flex-wrap gap-2 mb-6">
								{movie.genres?.map((g) => (
									<span
										key={g}
										className="genre-tag bg-gray-800 hover:bg-red-600 px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
										onClick={() => router.push(`/genere/${g.toLowerCase()}`)}
									>
										{g}
									</span>
								))}
							</div>
							{/* Description */}
							<div className="mb-6">
								<h3 className="text-xl font-semibold mb-3">Synopsis</h3>
								<p className="text-gray-300 leading-relaxed">{movie.description}</p>
							</div>
							{/* Action Buttons */}
							<div className="flex flex-wrap gap-4">
								<button
									className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
									onClick={() => {
										const video = document.getElementById("moviePlayer") as HTMLVideoElement;
										const overlay = document.getElementById("playerOverlay");
										if (video && overlay) {
											overlay.style.display = "none";
											video.play();
										}
									}}
								>
									<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
										<path d="M8 5v14l11-7z" />
									</svg>
									Play Now
								</button>
								<button
									className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
									onClick={() => alert("Added to Watchlist!")}
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M12 6v6m0 0v6m0-6h6m-6 0H6"
										/>
									</svg>
									Add to Watchlist
								</button>
								<button
									className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
									onClick={() => {
										if (navigator.share) {
											navigator.share({
												title: `${movie.title} - StreamFlix`,
												text: `Check out this amazing movie on StreamFlix!`,
												url: window.location.href,
											});
										} else {
											navigator.clipboard.writeText(window.location.href);
											alert("Link copied!");
										}
									}}
								>
									<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth="2"
											d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
										/>
									</svg>
									Share
								</button>
							</div>
						</div>
						{/* Side Info */}
						<div className="space-y-6">
							{/* Cast & Crew */}
							<div className="bg-gray-900 rounded-lg p-6">
								<h3 className="text-lg font-semibold mb-4">Cast & Crew</h3>
								<div className="space-y-3">
									<div>
										<div className="text-sm text-gray-400">Director</div>
										<div className="font-medium">{movie.director || "-"}</div>
									</div>
									<div>
										<div className="text-sm text-gray-400">Starring</div>
										<div className="font-medium">{movie.cast || "-"}</div>
									</div>
									<div>
										<div className="text-sm text-gray-400">Producer</div>
										<div className="font-medium">{movie.producer || "-"}</div>
									</div>
									<div>
										<div className="text-sm text-gray-400">Studio</div>
										<div className="font-medium">{movie.studio || "-"}</div>
									</div>
								</div>
							</div>
							{/* Technical Info */}
							<div className="bg-gray-900 rounded-lg p-6">
								<h3 className="text-lg font-semibold mb-4">Technical Details</h3>
								<div className="space-y-3">
									<div className="flex justify-between">
										<span className="text-gray-400">Quality</span>
										<span>{movie.technical?.quality || movie.quality}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">Audio</span>
										<span>{movie.technical?.audio || "-"}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">Subtitles</span>
										<span>{movie.technical?.subtitles || "-"}</span>
									</div>
									<div className="flex justify-between">
										<span className="text-gray-400">Release Date</span>
										<span>{movie.technical?.release || "-"}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Related Movies */}
				<section className="mb-12">
					<div className="flex items-center justify-between mb-6">
						<h2 className="text-2xl sm:text-3xl font-bold">Related Movies</h2>
						<button
							className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1"
							onClick={() => router.push(`/genere/${movie.genre}`)}
						>
							View All
							<svg
								className="w-4 h-4"
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
						</button>
					</div>
					<div className="slider-container flex gap-3 sm:gap-4 overflow-x-auto pb-4">
						{related.map((rel) => (
							<div
								key={rel.slug}
								className="movie-card flex-none w-36 sm:w-48 md:w-56 bg-gray-900 rounded-lg overflow-hidden cursor-pointer"
								onClick={() => router.push(`/movie/${rel.slug}`)}
							>
								<img
									src={rel.image}
									alt={rel.title}
									className="w-full h-48 sm:h-64 md:h-72 object-cover"
								/>
								<div className="p-3 sm:p-4">
									<h3 className="font-bold text-sm sm:text-base mb-1 truncate">
										{rel.title}
									</h3>
									<p className="text-gray-400 text-xs sm:text-sm mb-2">
										{rel.year} • {rel.genres?.[0] || rel.genre}
									</p>
									<div className="flex items-center gap-1">
										<span className="bg-yellow-500 text-black px-1.5 py-0.5 rounded text-xs font-bold">
											{rel.rating}
										</span>
										<span className="text-gray-400 text-xs">IMDb</span>
									</div>
								</div>
							</div>
						))}
					</div>
				</section>
			</main>
			<Footer />
		</div>
	);
}
