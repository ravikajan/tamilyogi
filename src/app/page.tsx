import type { Metadata } from "next";
import { auth } from "@/../auth";
import Header from "../components/Header";
import SearchBanner from "../components/SearchBanner";
import GenreList from "../components/GenreList";
import Footer from "@/components/Footer";
import HomeClientSections from "@/components/HomeClientSections";
import AuthPopup from "@/components/AuthPopup";
import { WebsiteJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import { generateSEOMetadata } from "@/components/seo/SEOMetadata";
import {
  getHomePageData,
  transformMovieForCard,
} from "@/actions/home/home_action"; // adjust import path

export const metadata: Metadata = generateSEOMetadata({
  title: "TamilYogiVip - Watch Tamil, Hindi, English Movies & Web Series Online in HD",
  description: "Stream latest Tamil, Hindi, English movies and web series in HD quality on TamilYogiVip. Watch new releases, trending movies, and popular web series online for free.",
  keywords: ["tamil movies", "hindi movies", "english movies", "web series", "watch online", "HD streaming", "new releases", "trending movies", "TamilYogiVip", "free movies"],
  canonical: "/",
  pageType: "website",
  subtitle: "Stream HD Movies & Web Series Online",
});

export default async function Home() {
  const session = await auth();

  // Fetch real data from database
  const { newReleases, trendingMovies, webSeries } = await getHomePageData();

  // Transform data for components
  const transformedNewReleases = newReleases.map(transformMovieForCard);
  const transformedTrendingMovies = trendingMovies.map(transformMovieForCard);
  const transformedWebSeries = webSeries.map(transformMovieForCard);

  return (
    <div className="bg-black text-white min-h-screen font-sans w-full">
      {/* Website JSON-LD structured data */}
      <WebsiteJsonLd />
      
      <Header />
      <main className="w-full px-0 sm:px-0 py-8">
        <SearchBanner />
        <HomeClientSections
          newReleases={transformedNewReleases}
          trendingMovies={transformedTrendingMovies}
          webSeries={transformedWebSeries}
        />
        <section className="mb-12 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            Browse by Genre
          </h2>
          <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <GenreList />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
