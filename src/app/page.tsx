import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import Section from "../components/Section";
import CardRow from "../components/CardRow";
import GenreList from "../components/GenreList";

export default async function Home() {
 
  // Example data for cards
  const newReleases = [
    {
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=300&h=450&fit=crop",
      title: "Cyber Punk 2077",
      year: "2024",
      genre: "Sci-Fi",
      rating: 8.5,
    },
    {
      image: "https://images.unsplash.com/photo-1489599904537-7e2b9e74d6f6?w=300&h=450&fit=crop",
      title: "Space Odyssey",
      year: "2024",
      genre: "Adventure",
      rating: 9.2,
    },
    {
      image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=300&h=450&fit=crop",
      title: "Dark Waters",
      year: "2024",
      genre: "Thriller",
      rating: 8.8,
    },
    {
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
      title: "Fire Storm",
      year: "2024",
      genre: "Action",
      rating: 7.9,
    },
    {
      image: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=300&h=450&fit=crop",
      title: "Quantum Realm",
      year: "2024",
      genre: "Sci-Fi",
      rating: 8.1,
    },
    {
      image: "https://images.unsplash.com/photo-1594909122845-11baa439b7bf?w=300&h=450&fit=crop",
      title: "Night Runner",
      year: "2024",
      genre: "Crime",
      rating: 8.3,
    },
  ];

  const trendingMovies = [
    {
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=450&fit=crop",
      title: "Arctic Storm",
      year: "2023",
      genre: "Action",
      rating: 8.7,
    },
    {
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=300&h=450&fit=crop",
      title: "Desert Moon",
      year: "2023",
      genre: "Drama",
      rating: 9.0,
    },
    {
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=450&fit=crop",
      title: "Ocean Deep",
      year: "2023",
      genre: "Adventure",
      rating: 8.4,
    },
    {
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=450&fit=crop",
      title: "City Lights",
      year: "2023",
      genre: "Romance",
      rating: 7.8,
    },
    {
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=300&h=450&fit=crop",
      title: "Storm Chaser",
      year: "2023",
      genre: "Thriller",
      rating: 8.9,
    },
  ];

  const webSeries = [
    {
      image: "https://images.unsplash.com/photo-1560169897-fc0cdbdfa4d5?w=300&h=450&fit=crop",
      title: "Mind Games",
      year: "2024",
      genre: "Thriller",
      rating: 9.1,
    },
    {
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=450&fit=crop",
      title: "Digital World",
      year: "2024",
      genre: "Sci-Fi",
      rating: 8.6,
    },
    {
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=450&fit=crop",
      title: "Lost Chronicles",
      year: "2024",
      genre: "Adventure",
      rating: 8.9,
    },
    {
      image: "https://images.unsplash.com/photo-1489599904537-7e2b9e74d6f6?w=300&h=450&fit=crop",
      title: "Shadow Agents",
      year: "2024",
      genre: "Action",
      rating: 8.2,
    },
    {
      image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=300&h=450&fit=crop",
      title: "Royal Court",
      year: "2024",
      genre: "Drama",
      rating: 9.3,
    },
  ];

  return (
    <div className="bg-black text-white min-h-screen font-sans w-full">
      <Header />
      <main className="w-full px-0 sm:px-0 py-8">
        <HeroBanner />
        <section className="mb-12 w-full">
          <div className="flex items-center justify-between mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <h2 className="text-2xl sm:text-3xl font-bold">New Releases</h2>
            <button className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1">
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
            <button className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1">
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">Browse by Genre</h2>
          <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <GenreList />
          </div>
        </section>
        <section className="mb-12 w-full">
          <div className="flex items-center justify-between mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <h2 className="text-2xl sm:text-3xl font-bold">Popular Web Series</h2>
            <button className="text-red-400 hover:text-red-300 text-sm font-medium flex items-center gap-1">
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
      </main>
      <footer className="bg-gray-900 py-8 mt-16 w-full">
        <div className="w-full px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32 max-w-none">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <div className="text-xl font-bold text-red-500 mb-3">StreamFlix</div>
              <p className="text-gray-400 text-sm">Your ultimate streaming destination.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Company</h3>
              <div className="space-y-2">
                <div><a href="#" className="text-gray-400 hover:text-white text-sm">About Us</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white text-sm">Careers</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white text-sm">Press</a></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Support</h3>
              <div className="space-y-2">
                <div><a href="#" className="text-gray-400 hover:text-white text-sm">Help Center</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white text-sm">Contact</a></div>
                <div><a href="#" className="text-gray-400 hover:text-white text-sm">Privacy</a></div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-3 text-sm">Connect</h3>
              <div className="flex space-x-3">
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="text-xs">f</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="text-xs">t</span>
                </div>
                <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors cursor-pointer">
                  <span className="text-xs">ig</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-center">
            <p className="text-gray-400 text-sm">&copy; 2024 StreamFlix. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
