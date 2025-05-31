import Header from "../components/Header";
import HeroBanner from "../components/HeroBanner";
import GenreList from "../components/GenreList";
import Footer from "@/components/Footer";
import HomeClientSections from "@/components/HomeClientSections";

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
        <HomeClientSections newReleases={newReleases} trendingMovies={trendingMovies} webSeries={webSeries} />
        <section className="mb-12 w-full">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">Browse by Genre</h2>
          <div className="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-32">
            <GenreList />
          </div>
        </section>
      </main>
      <Footer></Footer>
    </div>
  );
}
