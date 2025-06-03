"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import { getMovieBySlug } from "@/actions/movie/movie_action";

export default function MoviePage() {
	const { data: session, status } = useSession();
	const params = useParams();
	const router = useRouter();
	const slug = params?.slug as string;

	const [movie, setMovie] = useState<any>(null);
	const [loading, setLoading] = useState(true);
	useEffect(() => {
		// Remove redirect logic - popup will handle authentication
	}, [status, router]);

	useEffect(() => {
		async function fetchMovie() {
			setLoading(true);
			const data = await getMovieBySlug(slug);
			setMovie(data);
			setLoading(false);
		}
		if (slug) fetchMovie();
	}, [slug]);

	if (status === "loading" || loading) {
		return (
			<div className="min-h-screen flex flex-col bg-black text-white">
				<Header />
				<main className="container mx-auto px-4 sm:px-6 py-8 flex-1 w-full">
					<div className="space-y-10 w-full max-w-5xl mx-auto">
						{/* Skeleton for video player */}
						<div className="skeleton-video bg-gray-900 rounded-2xl w-full h-[700px] mb-8 flex items-center justify-center animate-pulse">
							<div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center">
								<svg
									className="w-12 h-12 text-gray-700"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									viewBox="0 0 24 24"
								>
									<path strokeLinecap="round" strokeLinejoin="round" d="M8 5v14l11-7z" />
								</svg>
							</div>
						</div>
						{/* Skeleton for title and meta */}
						<div className="space-y-4">
							<div className="h-10 bg-gray-800 rounded w-2/3" />
							<div className="flex gap-4">
								<div className="h-6 bg-gray-800 rounded w-24" />
								<div className="h-6 bg-gray-800 rounded w-16" />
								<div className="h-6 bg-gray-800 rounded w-20" />
								<div className="h-6 bg-gray-800 rounded w-12" />
							</div>
						</div>
						{/* Skeleton for genre tags */}
						<div className="flex gap-2 mb-4">
							<div className="h-8 w-20 bg-gray-800 rounded-full" />
							<div className="h-8 w-16 bg-gray-800 rounded-full" />
						</div>
						{/* Skeleton for description */}
						<div className="space-y-2">
							<div className="h-6 bg-gray-800 rounded w-1/3" />
							<div className="h-4 bg-gray-800 rounded w-2/3" />
							<div className="h-4 bg-gray-800 rounded w-1/2" />
							<div className="h-4 bg-gray-800 rounded w-1/4" />
						</div>
						{/* Skeleton for action buttons */}
						<div className="flex gap-4 mt-6">
							<div className="h-12 w-32 bg-gray-800 rounded-lg" />
							<div className="h-12 w-40 bg-gray-800 rounded-lg" />
							<div className="h-12 w-28 bg-gray-800 rounded-lg" />
						</div>
						{/* Skeleton for side info */}
						<div className="grid md:grid-cols-3 gap-8 mt-10">
							<div className="h-40 bg-gray-900 rounded-lg" />
							<div className="h-40 bg-gray-900 rounded-lg" />
							<div className="h-40 bg-gray-900 rounded-lg" />
						</div>
					</div>
				</main>
				<Footer />
			</div>
		);
	}

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

	// Related movies: same genre, not this movie (fetch from API or filter if you have all movies in state)
	// For now, leave related as empty or implement a fetch if needed
	const related: any[] = [];

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
							href={`/genere/${movie.genre.slug}`}
							className="breadcrumb-item text-gray-400 hover:text-white"
						>
							{movie.genre.name}
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
				<div className="mb-4">
					<div className="video-player relative rounded-xl overflow-hidden max-h-[700px] sm:mt-0 mt-2 sm:mb-8 mb-2">
						{/* Directly embed the videoUrl as raw HTML if present */}
						{movie.videoUrl ? (
							<div
								className="w-full rounded-xl border-0 overflow-hidden h-[180px] sm:h-[400px] lg:h-[500px] xl:h-[700px]"
								dangerouslySetInnerHTML={{ __html: movie.videoUrl }}
							/>
						) : null}
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
									HD
								</span>
								<span className="text-gray-400">
									{movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "-"}
								</span>
								<span className="text-gray-400">•</span>
								<span className="text-gray-400">2h 35m</span>
								<span className="text-gray-400">•</span>
								<span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
									R
								</span>
							</div>
							{/* Genre Tags */}
							<div className="flex flex-wrap gap-2 mb-6">
								<span
									className="genre-tag bg-gray-800 hover:bg-red-600 px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
									onClick={() => router.push(`/genere/${movie.genre.slug}`)}
								>
									{movie.genre.name}
								</span>
							</div>
							{/* Description */}
							<div className="mb-6">
								<h3 className="text-xl font-semibold mb-3">Synopsis</h3>
								<p className="text-gray-300 leading-relaxed">{movie.description}</p>
							</div>
							{/* Action Buttons */}
							<div className="flex flex-wrap gap-4">
								<button
									className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
									onClick={() => {
										if (navigator.share) {
											navigator.share({
												title: `${movie.title} - TamilYogiVip`,
												text: `Check out this amazing movie on TamilYogiVip!`,
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
							{/* Genre */}
							<div className="bg-gray-900 rounded-lg p-6">
								<h3 className="text-lg font-semibold mb-4">Genre</h3>
								<div className="font-medium">{movie.genre.name}</div>
							</div>
							{/* Seasons & Episodes (if any) */}
							{movie.seasons && movie.seasons.length > 0 && (
								<div className="bg-gray-900 rounded-lg p-6">
									<h3 className="text-lg font-semibold mb-4">Seasons & Episodes</h3>
									{movie.seasons.map((season: any) => (
										<div key={season.id} className="mb-4">
											<div className="font-semibold">
												Season {season.seasonNumber}: {season.title}
											</div>
											<div className="text-xs text-gray-400 mb-2">
												{season.description}
											</div>
											<div className="ml-4 mt-2 space-y-1">
												{season.episodes.map((ep: any) => (
													<div key={ep.id} className="text-sm">
														Ep {ep.episodeNumber}: {ep.title}
													</div>
												))}
											</div>
										</div>
									))}
								</div>
							)}
						</div>
					</div>
				</div>
				{/* Related Movies section placeholder */}
			</main>
			<Footer />
		</div>
	);
}
