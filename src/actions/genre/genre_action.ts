"use server";

import { prisma } from "@/lib/prisma_client/primsa_client";


export async function getGenreList() {
    return prisma.genre.findMany({
        orderBy: { name: 'asc' },
    });
}

export async function getGenreBySlug(slug: string) {
    return prisma.genre.findUnique({
        where: { slug },
    });
}

export async function getMoviesByGenre(
    genreSlug: string, 
    options: {
        filter?: 'all' | '2024' | '2023' | 'top' | 'popular';
        sort?: 'latest' | 'rating' | 'popularity' | 'year' | 'az';
        page?: number;
        limit?: number;
    } = {}
) {
    const { filter = 'all', sort = 'latest', page = 1, limit = 20 } = options;
    
    // Build where clause
    const where: any = {
        genre: {
            slug: genreSlug
        }
    };

    // Apply filters
    if (filter === '2024' || filter === '2023') {
        const year = parseInt(filter);
        where.releaseDate = {
            gte: new Date(`${year}-01-01`),
            lt: new Date(`${year + 1}-01-01`)
        };
    } else if (filter === 'top') {
        where.rating = {
            gte: 8.5
        };
    }

    // Build orderBy clause
    let orderBy: any = { createdAt: 'desc' }; // default
    
    switch (sort) {
        case 'latest':
            orderBy = { releaseDate: 'desc' };
            break;
        case 'rating':
            orderBy = { rating: 'desc' };
            break;
        case 'year':
            orderBy = { releaseDate: 'desc' };
            break;
        case 'az':
            orderBy = { title: 'asc' };
            break;
        case 'popularity':
            // You might want to add a popularity field to your schema
            // For now, using rating as a proxy
            orderBy = { rating: 'desc' };
            break;
    }

    // Get total count for pagination
    const totalCount = await prisma.movie.count({ where });

    // Get movies with pagination
    const movies = await prisma.movie.findMany({
        where,
        orderBy,
        skip: (page - 1) * limit,
        take: limit,
        include: {
            genre: true
        }
    });

    // For 'popular' filter, limit to top results
    if (filter === 'popular') {
        const popularMovies = await prisma.movie.findMany({
            where: {
                genre: {
                    slug: genreSlug
                }
            },
            orderBy: { rating: 'desc' },
            take: 6,
            include: {
                genre: true
            }
        });
        return {
            movies: popularMovies,
            totalCount: popularMovies.length,
            totalPages: 1
        };
    }

    return {
        movies,
        totalCount,
        totalPages: Math.ceil(totalCount / limit)
    };
}