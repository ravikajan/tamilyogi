import React from "react";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGenreBySlug, getMoviesByGenre } from "@/actions/genre/genre_action";
import { generateSEOMetadata } from "@/components/seo/SEOMetadata";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";
import GenreClientPage from "@/components/GenreClientPage";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ 
    filter?: string; 
    sort?: string; 
    page?: string; 
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const genre = await getGenreBySlug(slug);
  
  if (!genre) {
    return {
      title: "Genre Not Found | TamilYogiVip"
    };
  }

  const genreTitle = `${genre.name} Movies`;
  const genreDescription = `Watch the best ${genre.name.toLowerCase()} movies online in HD quality. Stream ${genre.name} movies and web series on TamilYogiVip - your ultimate destination for Tamil entertainment.`;
  const keywords = [
    `${genre.name} movies`,
    `${genre.name.toLowerCase()} films`,
    `watch ${genre.name.toLowerCase()} movies online`,
    `${genre.name} Tamil movies`,
    `${genre.name} web series`,
    "HD movies",
    "streaming",
    "TamilYogiVip",
    "Tamil cinema",
    "online movies"
  ];

  return generateSEOMetadata({
    title: genreTitle,
    description: genreDescription,
    canonical: `https://tamilyogivip.me/genere/${genre.slug}`,
    ogImage: `https://tamilyogivip.me/api/og?title=${encodeURIComponent(genreTitle)}&type=genre&emoji=${encodeURIComponent(genre.emoji)}`,
    keywords
  });
}

export default async function GenrePage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const searchParamsResolved = await searchParams;
  
  const genre = await getGenreBySlug(slug);

  if (!genre) {
    notFound();
  }

  // Get initial movies data
  const filter = searchParamsResolved.filter || "all";
  const sort = searchParamsResolved.sort || "latest";
  const page = parseInt(searchParamsResolved.page || "1", 10);
  const MOVIES_PER_PAGE = 20;

  const moviesData = await getMoviesByGenre(slug, {
    filter: filter as any,
    sort: sort as any,
    page,
    limit: MOVIES_PER_PAGE
  });

  // Breadcrumb items for structured data
  const breadcrumbItems = [
    { name: "Home", url: "https://tamilyogivip.me" },
    { name: `${genre.name} Movies`, url: `https://tamilyogivip.me/genere/${genre.slug}` }
  ];

  return (
    <>
      {/* JSON-LD Structured Data */}
      <BreadcrumbJsonLd items={breadcrumbItems} />
      
      <GenreClientPage 
        genre={genre}
        initialMoviesData={moviesData}
        initialFilter={filter}
        initialSort={sort}
        initialPage={page}
      />
    </>
  );
}
