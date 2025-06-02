import { prisma } from '@/lib/prisma_client/primsa_client';

export async function getNewReleases(limit: number = 6) {
    return prisma.movie.findMany({
        take: limit,
        orderBy: { releaseDate: 'desc' },
        include: {
            genre: true
        },
        where: {
            // Optional: only show movies released in the last 3 months
            createdAt: {
                gte: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000) // 90 days ago
            }
        }
    });
}

export async function getTrendingMovies(limit: number = 6) {
    return prisma.movie.findMany({
        take: limit,
        orderBy: [
            { rating: 'desc' },
            { createdAt: 'desc' }
        ],
        include: {
            genre: true
        },
        where: {
            type: 'MOVIE',
            rating: {
                gte: 7.5 // Only movies with good ratings
            }
        }
    });
}

export async function getPopularWebSeries(limit: number = 6) {
    return prisma.movie.findMany({
        take: limit,
        orderBy: [
            { rating: 'desc' },
            { createdAt: 'desc' }
        ],
        include: {
            genre: true,
            seasons: {
                take: 1,
                orderBy: { seasonNumber: 'asc' }
            }
        },
        where: {
            type: 'WEB_SERIES',
            rating: {
                gte: 7.0
            }
        }
    });
}

export async function getHomePageData() {
    const [newReleases, trendingMovies, webSeries] = await Promise.all([
        getNewReleases(6),
        getTrendingMovies(6),
        getPopularWebSeries(6)
    ]);

    return {
        newReleases,
        trendingMovies,
        webSeries
    };
}

// Helper function to transform database movie to component format
export function transformMovieForCard(movie: any) {
    return {
        id: movie.id,
        title: movie.title,
        year: movie.releaseDate ? new Date(movie.releaseDate).getFullYear().toString() : "2024",
        genre: movie.genre?.name || "Unknown",
        rating: movie.rating || 0,
        image: movie.poster || "/placeholder-movie.jpg", // Add a default placeholder
        slug: movie.slug,
        type: movie.type
    };
}