"use client";
import { useRouter } from "next/navigation";
import CardRow from "./CardRow";

export default function HomeClientSections({ newReleases, trendingMovies, webSeries }: {
  newReleases: any[];
  trendingMovies: any[];
  webSeries: any[];
}) {
  const router = useRouter();
  return (
    <>
      <section className="mb-12 w-full">
        <div className="flex items-center justify-between mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <h2 className="text-2xl sm:text-3xl font-bold">New Releases</h2>
          <button
            className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1"
            onClick={() => router.push('/list/new-releases')}
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <CardRow items={newReleases} />
        </div>
      </section>
      <section className="mb-12 w-full">
        <div className="flex items-center justify-between mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <h2 className="text-2xl sm:text-3xl font-bold">Trending Movies</h2>
          <button
            className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1"
            onClick={() => router.push('/list/trending-movies')}
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <CardRow items={trendingMovies} />
        </div>
      </section>
      <section className="mb-12 w-full">
        <div className="flex items-center justify-between mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <h2 className="text-2xl sm:text-3xl font-bold">Popular Web Series</h2>
          <button
            className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1"
            onClick={() => router.push('/list/web-series')}
          >
            View All
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </button>
        </div>
        <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
          <CardRow items={webSeries} />
        </div>
      </section>
    </>
  );
}
