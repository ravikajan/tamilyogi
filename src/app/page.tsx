import { auth } from "@/../auth";
import Header from "../components/Header";
import SearchBanner from "../components/SearchBanner";
import GenreList from "../components/GenreList";
import Footer from "@/components/Footer";
import HomeClientSections from "@/components/HomeClientSections";
import AuthPopup from "@/components/AuthPopup";
import {
  getHomePageData,
  transformMovieForCard,
} from "@/actions/home/home_action"; // adjust import path

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
