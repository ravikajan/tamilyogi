"use server";
import { prisma } from "@/lib/prisma_client/primsa_client";

export async function createOrUpdateMovie(data: any, isDraft: boolean = false) {
  // Destructure and sanitize input
  const {
    id,
    type,
    title,
    slug,
    description,
    rating,
    releaseDate,
    genreId,
    posterUrl,
    trailer,
    videoUrl,
    seasons = [],
  } = data;

  // Prepare movie data
  const movieData: any = {
    type,
    title,
    slug,
    description,
    rating: rating ? parseFloat(rating) : null,
    releaseDate: releaseDate ? new Date(releaseDate) : null,
    genreId: Number(genreId),
    poster: posterUrl || null,
    trailer: trailer || null,
    videoUrl: type === "MOVIE" ? (videoUrl || null) : null,
    // Optionally add a draft flag if you want to support drafts in your schema
  };

  let movie;
  if (id) {
    // Update existing movie
    movie = await prisma.movie.update({
      where: { id: Number(id) },
      data: movieData,
    });
  } else {
    // Create new movie
    movie = await prisma.movie.create({
      data: movieData,
    });
  }

  // Handle seasons and episodes (delete all and recreate for update)
  if (id) {
    await prisma.season.deleteMany({ where: { movieId: movie.id } });
  }
  for (const s of seasons) {
    const season = await prisma.season.create({
      data: {
        seasonNumber: s.seasonNumber,
        title: s.title,
        description: s.description,
        releaseDate: s.releaseDate ? new Date(s.releaseDate) : null,
        movieId: movie.id,
      },
    });
    for (const e of s.episodes || []) {
      await prisma.episode.create({
        data: {
          episodeNumber: e.episodeNumber,
          title: e.title,
          description: e.description,
          releaseDate: e.releaseDate ? new Date(e.releaseDate) : null,
          videoUrl: e.videoUrl || null,
          seasonId: season.id,
        },
      });
    }
  }

  return movie;
}

export async function getMovieBySlug(slug: string) {
  return prisma.movie.findUnique({
    where: { slug },
    include: {
      genre: true,
      seasons: {
        include: {
          episodes: true,
        },
      },
    },
  });
}


