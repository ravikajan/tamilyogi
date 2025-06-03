import type { MetadataRoute } from 'next'
import { getNewReleases, getTrendingMovies, getPopularWebSeries } from '@/actions/home/home_action'
import { getGenreList } from '@/actions/genre/genre_action'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://tamilyogivip.com'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
  ]

  // Dynamic movie list pages
  const listPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/list/new-releases`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/list/trending-movies`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/list/web-series`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Fetch genres for genre pages
  const genres = await getGenreList()
  const genrePages: MetadataRoute.Sitemap = genres.map((genre: any) => ({
    url: `${baseUrl}/genere/${genre.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Fetch dynamic movie pages
  try {
    const [newReleases, trendingMovies, webSeries] = await Promise.all([
      getNewReleases(1000), // Fetch more for sitemap
      getTrendingMovies(1000),
      getPopularWebSeries(1000),
    ])

    // Combine all movies and remove duplicates
    const allMovies = [
      ...newReleases,
      ...trendingMovies,
      ...webSeries
    ]

    // Remove duplicates based on movie ID
    const uniqueMovies = allMovies.filter(
      (movie: any, index: number, self: any[]) => 
        self.findIndex(m => m.id === movie.id) === index
    )

    // Generate movie pages sitemap entries
    const moviePages: MetadataRoute.Sitemap = uniqueMovies.map((movie: any) => ({
      url: `${baseUrl}/movie/${movie.slug || movie.id}`,
      lastModified: movie.updatedAt ? new Date(movie.updatedAt) : new Date(),
      changeFrequency: 'weekly' as const,
      priority: movie.type === 'MOVIE' ? 0.8 : 0.7, // Movies get slightly higher priority than series
    }))

    return [
      ...staticPages,
      ...listPages,
      ...genrePages,
      ...moviePages,
    ]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    
    // Return at least static pages and genre pages if movie fetching fails
    return [
      ...staticPages,
      ...listPages,
      ...genrePages,
    ]
  }
}
