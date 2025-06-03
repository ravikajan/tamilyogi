import React from "react";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Card from "@/components/Card";
import { getNewReleases, getTrendingMovies, getPopularWebSeries, transformMovieForCard } from "@/actions/home/home_action";
import { generateSEOMetadata } from "@/components/seo/SEOMetadata";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import Link from 'next/link';

const listApiMap: Record<string, () => Promise<any[]>> = {
  "new-releases": () => getNewReleases(100),
  "trending-movies": () => getTrendingMovies(100),
  "web-series": () => getPopularWebSeries(100),
};

const listTitles: Record<string, string> = {
  "new-releases": "New Releases",
  "trending-movies": "Trending Movies",
  "web-series": "Popular Web Series",
};

const listDescriptions: Record<string, string> = {
  "new-releases": "The latest movies just released.",
  "trending-movies": "Movies trending right now.",
  "web-series": "Top-rated and popular web series.",
};

const MOVIES_PER_PAGE = 20;

interface PageProps {
  params: Promise<{ list: string }>;
  searchParams: Promise<{ page?: string }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: { params: Promise<{ list: string }> }): Promise<Metadata> {
  const { list: listKey } = await params;
  
  const title = listTitles[listKey];
  const description = listDescriptions[listKey];
  
  if (!title) {
    return {
      title: "List Not Found | TamilYogiVip"
    };
  }

  const pageTitle = title;
  const pageDescription = `${description} Watch and stream the best ${title.toLowerCase()} online in HD quality on TamilYogiVip - your ultimate destination for Tamil entertainment.`;
  const keywords = [
    title.toLowerCase(),
    `${title.toLowerCase()} online`,
    `watch ${title.toLowerCase()}`,
    "Tamil movies",
    "HD movies",
    "streaming",
    "TamilYogiVip",
    "Tamil cinema",
    "online movies"
  ];

  // Add specific keywords based on list type
  if (listKey === "new-releases") {
    keywords.push("new movies", "latest releases", "recent movies", "2024 movies");
  } else if (listKey === "trending-movies") {
    keywords.push("trending", "popular movies", "hot movies", "viral movies");
  } else if (listKey === "web-series") {
    keywords.push("web series", "TV shows", "series", "episodes", "seasons");
  }

  return generateSEOMetadata({
    title: pageTitle,
    description: pageDescription,
    canonical: `https://tamilyogivip.me/list/${listKey}`,
    ogImage: `https://tamilyogivip.me/api/og?title=${encodeURIComponent(pageTitle)}&type=list`,
    keywords
  });
}

// Server-side Pagination Component
function ServerPagination({ 
  currentPage, 
  totalPages, 
  listKey 
}: { 
  currentPage: number; 
  totalPages: number; 
  listKey: string; 
}) {
  if (totalPages <= 1) return null;

  const pages = [];
  const showPages = 5; // Number of page buttons to show
  let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
  let endPage = Math.min(totalPages, startPage + showPages - 1);

  if (endPage - startPage + 1 < showPages) {
    startPage = Math.max(1, endPage - showPages + 1);
  }

  // Previous button
  if (currentPage > 1) {
    pages.push(
      <Link
        key="prev"
        href={`/list/${listKey}?page=${currentPage - 1}`}
        className="px-3 py-2 mx-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
      >
        Previous
      </Link>
    );
  }

  // Page numbers
  for (let i = startPage; i <= endPage; i++) {
    pages.push(
      <Link
        key={i}
        href={`/list/${listKey}?page=${i}`}
        className={`px-3 py-2 mx-1 rounded transition ${
          i === currentPage
            ? 'bg-red-600 text-white'
            : 'bg-gray-800 text-white hover:bg-gray-700'
        }`}
      >
        {i}
      </Link>
    );
  }

  // Next button
  if (currentPage < totalPages) {
    pages.push(
      <Link
        key="next"
        href={`/list/${listKey}?page=${currentPage + 1}`}
        className="px-3 py-2 mx-1 bg-gray-800 text-white rounded hover:bg-gray-700 transition"
      >
        Next
      </Link>
    );
  }

  return (
    <div className="flex justify-center items-center mt-12">
      {pages}
    </div>
  );
}

export default async function ListPage({ 
  params, 
  searchParams 
}: PageProps) {
  const { list: listKey } = await params;
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  
  const apiFn = listApiMap[listKey];
  let items: any[] = [];
  
  if (apiFn) {
    const data = await apiFn();
    items = data.map(transformMovieForCard);
  }
  
  const title = listTitles[listKey] || "List";
  const description = listDescriptions[listKey] || "";

  if (!listApiMap[listKey]) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <h1 className="text-3xl font-bold mb-4">List Not Found</h1>
        <Link 
          href="/" 
          className="inline-block px-4 py-2 bg-red-600 rounded text-white hover:bg-red-700 transition"
        >
          Go Home
        </Link>
      </div>
    );
  }

  const totalPages = Math.ceil(items.length / MOVIES_PER_PAGE);
  const startIndex = (currentPage - 1) * MOVIES_PER_PAGE;
  const pagedMovies = items.slice(startIndex, startIndex + MOVIES_PER_PAGE);

  // Breadcrumb items for structured data
  const breadcrumbItems = [
    { name: "Home", url: "https://tamilyogivip.me" },
    { name: title, url: `https://tamilyogivip.me/list/${listKey}` }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <div className="bg-black min-h-screen text-white flex flex-col">
        <Header />
        <main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <div className="flex items-center space-x-2 text-sm">
              <Link
                href="/"
                className="breadcrumb-item text-gray-400 hover:text-white"
              >
                Home
              </Link>
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
              <span className="text-red-400">{title}</span>
            </div>
          </nav>

          {/* List Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold">{title}</h1>
                {description && (
                  <p className="text-gray-400 mt-1">{description}</p>
                )}
                <p className="text-gray-500 text-sm mt-2">
                  Showing {pagedMovies.length} of {items.length} movies {currentPage > 1 ? `(Page ${currentPage})` : ''}
                </p>
              </div>
            </div>
          </div>

          {/* Movies Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5 xl:gap-6 pb-8">
            {pagedMovies.length === 0 ? (
              <div className="col-span-full text-center text-gray-400 py-12">No movies found.</div>
            ) : (
              pagedMovies.map((movie, idx) => (
                <div key={movie.slug || movie.title + idx} className="flex h-full">
                  <Card {...movie} />
                </div>
              ))
            )}
          </div>

          {/* Server-side Pagination */}
          <ServerPagination 
            currentPage={currentPage}
            totalPages={totalPages}
            listKey={listKey}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}