import { Metadata } from "next";

interface SEOData {
  title: string;
  description: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article" | "video.movie" | "video.tv_show";
  noIndex?: boolean;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  pageType?: "movie" | "genre" | "search" | "website";
  subtitle?: string;
}

const DEFAULT_TITLE = "TamilYogiVip - Ultimate Streaming Destination";
const DEFAULT_DESCRIPTION = "Watch the latest movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!";
const SITE_URL = "https://tamilyogivip.me";

export function generateSEOMetadata(data: SEOData): Metadata {  const {
    title,
    description,
    canonical,
    ogImage,
    ogType = "website",
    noIndex = false,
    keywords = [],
    author,
    publishedTime,
    modifiedTime,
    pageType = "website",
    subtitle
  } = data;

  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | TamilYogiVip`;
  const canonicalUrl = canonical || SITE_URL;
  
  // Generate dynamic OG image with page type and optional subtitle
  let ogImageUrl = ogImage;
  if (!ogImageUrl) {
    const ogParams = new URLSearchParams({
      title: title,
      type: pageType,
    });
    if (subtitle) {
      ogParams.set('subtitle', subtitle);
    }
    ogImageUrl = `${SITE_URL}/api/og?${ogParams.toString()}`;
  }

  return {
    title: fullTitle,
    description,
    keywords: keywords.length > 0 ? keywords.join(", ") : undefined,
    authors: author ? [{ name: author }] : undefined,
    creator: "TamilYogiVip",
    publisher: "TamilYogiVip",
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: "TamilYogiVip",
      type: ogType,      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: "en_US",
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [ogImageUrl],
      site: "@tamilyogivip",
      creator: "@tamilyogivip",
    },
    other: {
      "theme-color": "#111111",
      "color-scheme": "dark",
    },
  };
}

// Pre-configured SEO metadata generators for different page types

export function generateHomeSEO(): Metadata {
  return generateSEOMetadata({
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    canonical: SITE_URL,
    keywords: ["tamil movies", "web series", "streaming", "HD movies", "online movies", "entertainment"],
  });
}

export function generateMovieSEO(movie: {
  title: string;
  description: string | null;
  slug: string;
  poster: string | null;
  releaseDate: Date | null;
  genre: { name: string };
  rating: number | null;
  type: string;
}): Metadata {
  const releaseYear = movie.releaseDate ? new Date(movie.releaseDate).getFullYear() : "";
  const rating = movie.rating ? `⭐ ${movie.rating}/10` : "";
  
  return generateSEOMetadata({
    title: `${movie.title} (${releaseYear}) - Watch Online`,
    description: movie.description || `Watch ${movie.title} online in HD quality. ${movie.genre.name} ${movie.type.toLowerCase()} ${rating ? `rated ${rating}` : ""} streaming on TamilYogiVip.`,
    canonical: `${SITE_URL}/movie/${movie.slug}`,
    ogImage: movie.poster || undefined,
    ogType: movie.type === "MOVIE" ? "video.movie" : "video.tv_show",
    keywords: [
      movie.title,
      movie.genre.name,
      "watch online",
      "HD",
      "streaming",
      "tamil",
      movie.type.toLowerCase(),
      ...(releaseYear ? [releaseYear.toString()] : [])
    ],
    publishedTime: movie.releaseDate?.toISOString(),
  });
}

export function generateGenreSEO(genre: {
  name: string;
  slug: string;
  emoji: string;
}): Metadata {
  return generateSEOMetadata({
    title: `${genre.name} Movies & Series - Watch Online`,
    description: `Discover the best ${genre.name.toLowerCase()} movies and web series. Stream HD ${genre.name.toLowerCase()} entertainment online on TamilYogiVip.`,
    canonical: `${SITE_URL}/genere/${genre.slug}`,
    keywords: [
      genre.name,
      "movies",
      "web series",
      "streaming",
      "HD",
      "online",
      "tamil",
      "entertainment"
    ],
  });
}

export function generateListSEO(listType: string): Metadata {
  const listTitles: Record<string, string> = {
    "new-releases": "New Releases",
    "trending-movies": "Trending Movies",
    "web-series": "Popular Web Series",
  };

  const listDescriptions: Record<string, string> = {
    "new-releases": "Watch the latest movie releases online in HD. Fresh content updated daily on TamilYogiVip.",
    "trending-movies": "Discover what's trending now. Most popular movies streaming online in HD quality.",
    "web-series": "Binge-watch the most popular web series. HD streaming of top-rated series on TamilYogiVip.",
  };

  const title = listTitles[listType] || "Movies & Series";
  const description = listDescriptions[listType] || "Stream movies and series online in HD quality.";

  return generateSEOMetadata({
    title: `${title} - Stream Online HD`,
    description,
    canonical: `${SITE_URL}/list/${listType}`,
    keywords: [
      title.toLowerCase(),
      "movies",
      "streaming",
      "HD",
      "online",
      "watch",
      "tamil",
      "entertainment"
    ],
  });
}

export function generateSearchSEO(query?: string): Metadata {
  const title = query ? `Search Results for "${query}"` : "Search Movies & Series";
  const description = query 
    ? `Find movies and series matching "${query}". Search results from TamilYogiVip's extensive library.`
    : "Search through thousands of movies and web series. Find your favorite entertainment on TamilYogiVip.";

  return generateSEOMetadata({
    title,
    description,
    canonical: `${SITE_URL}/search${query ? `?q=${encodeURIComponent(query)}` : ""}`,
    keywords: [
      "search",
      "movies",
      "web series",
      "find",
      "entertainment",
      ...(query ? [query] : [])
    ],
    noIndex: !query, // Don't index search pages without query
  });
}
