import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MovieClientPage from "@/components/MovieClientPage";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { getMovieBySlug } from "@/actions/movie/movie_action";
import { generateSEOMetadata } from "@/components/seo/SEOMetadata";
import { MovieJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);
  
  if (!movie) {
    return {
      title: "Movie Not Found | TamilYogiVip"
    };
  }

  const movieTitle = movie.title;
  const movieDescription = movie.description || `Watch ${movieTitle} online in HD quality. ${movie.genre.name} movie released in ${movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : 'N/A'}.`;
  const keywords = [
    movieTitle,
    `${movieTitle} online`,
    `watch ${movieTitle}`,
    movie.genre.name,
    "Tamil movies",
    "HD movies",
    "streaming",
    "TamilYogiVip"
  ];
  return generateSEOMetadata({
    title: movieTitle,
    description: movieDescription,
    canonical: `https://tamilyogivip.me/movie/${movie.slug}`,
    ogType: movie.type === "MOVIE" ? "video.movie" : "video.tv_show",
    pageType: "movie",
    subtitle: `${movie.releaseDate?.getFullYear()} • ${movie.genre.name}`,
    keywords,
    publishedTime: movie.releaseDate?.toISOString(),
    modifiedTime: movie.updatedAt?.toISOString()
  });
}

export default async function MoviePage({ params }: PageProps) {
  const { slug } = await params;
  const movie = await getMovieBySlug(slug);

  if (!movie) {
    notFound();
  }

  // Breadcrumb items for structured data
  const breadcrumbItems = [
    { name: "Home", url: "https://tamilyogivip.me" },
    { name: movie.genre.name, url: `https://tamilyogivip.me/genere/${movie.genre.slug}` },
    { name: movie.title, url: `https://tamilyogivip.me/movie/${movie.slug}` }
  ];
  return (
    <>
      {/* JSON-LD Structured Data */}
      <MovieJsonLd movie={movie} />
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <MovieClientPage movieData={movie}>
        <div className="relative bg-black text-white min-h-screen flex flex-col">
          <AnimatedBackground variant="cinema" particleCount={10} />
          <div className="relative z-10 flex flex-col min-h-screen">
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
                ) : (
                  <div className="w-full h-[400px] bg-gray-900 rounded-xl flex items-center justify-center">
                    <div className="text-center">
                      <svg className="w-16 h-16 mx-auto mb-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-gray-400">Video not available</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Movie Info */}
              <div className="grid md:grid-cols-3 gap-8">
                {/* Main Info */}
                <div className="md:col-span-2">
                  <h1 className="text-3xl sm:text-4xl font-bold mb-4">{movie.title}</h1>
                  
                  {/* Movie Meta */}
                  <div className="flex flex-wrap items-center gap-4 mb-6">
                    {movie.rating && (
                      <div className="flex items-center gap-2">
                        <span className="bg-yellow-500 text-black px-3 py-1 rounded-full text-sm font-bold">
                          {movie.rating}
                        </span>
                        <span className="text-gray-400">IMDb</span>
                      </div>
                    )}
                    <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                      HD
                    </span>
                    <span className="text-gray-400">
                      {movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "-"}
                    </span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-400">{movie.type}</span>
                    <span className="text-gray-400">•</span>
                    <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">
                      HD
                    </span>
                  </div>

                  {/* Genre Tags */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    <span
                      data-genre-tag
                      className="genre-tag bg-gray-800 hover:bg-red-600 px-4 py-2 rounded-full text-sm cursor-pointer transition-colors"
                    >
                      {movie.genre.name}
                    </span>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-3">Synopsis</h2>
                    <p className="text-gray-300 leading-relaxed">{movie.description}</p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button
                      data-share-button
                      className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg font-semibold transition-colors flex items-center gap-2"
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

                  {/* Seasons & Episodes for TV Series */}
                  {(movie.type === "WEB_SERIES" || movie.type === "TV_SHOW") && movie.seasons && movie.seasons.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-xl font-semibold mb-4">Seasons & Episodes</h3>
                      <div className="space-y-4">
                        {movie.seasons.map((season: any, sIdx: number) => (
                          <div key={sIdx} className="bg-gray-900 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="text-lg font-semibold">Season {season.seasonNumber}: {season.title}</h4>
                              <span className="text-sm text-gray-400">{season.episodes.length} episodes</span>
                            </div>
                            {season.description && (
                              <p className="text-gray-400 text-sm mb-3">{season.description}</p>
                            )}
                            <div className="grid gap-2">
                              {season.episodes.map((ep: any, epIdx: number) => (
                                <div key={ep.id} className="text-sm">
                                  Ep {ep.episodeNumber}: {ep.title}
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Side Info */}
                <div className="space-y-6">
                  {/* Movie Details */}
                  <div className="bg-gray-900 rounded-lg p-6">
                    <h3 className="text-lg font-semibold mb-4">Movie Details</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Type:</span>
                        <span>{movie.type}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Genre:</span>
                        <span>{movie.genre.name}</span>
                      </div>
                      {movie.releaseDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Release Date:</span>
                          <span>{new Date(movie.releaseDate).toLocaleDateString()}</span>
                        </div>
                      )}
                      {movie.rating && (
                        <div className="flex justify-between">
                          <span className="text-gray-400">Rating:</span>
                          <span>{movie.rating}/10</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Poster */}
                  {movie.poster && (
                    <div className="bg-gray-900 rounded-lg p-6">
                      <h3 className="text-lg font-semibold mb-4">Poster</h3>
                      <img 
                        src={movie.poster} 
                        alt={`${movie.title} poster`}
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                </div>
              </div>            </div>
          </main>
          <Footer />
          </div>
        </div>
      </MovieClientPage>
    </>
  );
}
