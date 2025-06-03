import React, { Suspense } from "react";
import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SearchClientPage from "@/components/SearchClientPage";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generateSEOMetadata } from "@/components/seo/SEOMetadata";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams;
  const query = params.q || "";
  const searchTitle = query 
    ? `Search Results for "${query}" - TamilYogiVip` 
    : "Search Movies & TV Shows - TamilYogiVip";
  
  const searchDescription = query
    ? `Find "${query}" movies, TV shows, and web series on TamilYogiVip. Discover high-quality Tamil, Hindi, English content with HD streaming.`
    : "Search and discover thousands of movies, TV shows, and web series on TamilYogiVip. Find your favorite Tamil, Hindi, English content in HD quality.";
  const keywords = query
    ? [
        query,
        `${query} movies`,
        `${query} watch online`,
        `${query} streaming`,
        "tamil movies",
        "hindi movies", 
        "english movies",
        "web series",
        "HD streaming",
        "TamilYogiVip"
      ]
    : [
        "search movies",
        "find movies",
        "movie search",
        "tamil movies search",
        "hindi movies search",
        "english movies search", 
        "web series search",
        "HD streaming search",
        "TamilYogiVip search"
      ];
  return generateSEOMetadata({
    title: searchTitle,
    description: searchDescription,
    keywords: keywords,
    canonical: query ? `/search?q=${encodeURIComponent(query)}` : "/search",
    pageType: "search",
    subtitle: query ? `"${query}" search results` : "Find your favorite content",
  });
}



// Loading component for Suspense fallback
function SearchLoading() {
	return (
		<div className="bg-black text-white min-h-screen flex flex-col">
			<Header />
			<main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
				<div className="animate-pulse">
					<div className="h-8 bg-gray-800 rounded w-1/3 mb-4"></div>
					<div className="h-4 bg-gray-800 rounded w-1/2 mb-8"></div>
					<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
						{[...Array(12)].map((_, i) => (
							<div key={i} className="h-64 bg-gray-800 rounded"></div>
						))}
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

// Main exported component with Suspense wrapper
export default async function SearchPage({ searchParams }: SearchPageProps) {
	const params = await searchParams;
	const query = params.q || "";

	return (
		<div className="bg-black text-white min-h-screen flex flex-col">
			<Header />
			<main className="container mx-auto px-4 sm:px-6 py-8 flex-1">
				{/* Breadcrumb JSON-LD */}
				<BreadcrumbJsonLd
					items={[
						{ name: "Home", url: "/" },
						{ name: "Search Results", url: `/search${query ? `?q=${encodeURIComponent(query)}` : ""}` },
					]}
				/>

				<Suspense fallback={<SearchLoading />}>
					<SearchClientPage query={query} />
				</Suspense>
			</main>
			<Footer />
		</div>
	);
}