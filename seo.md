# Complete OTT Platform SEO Guide with JSON-LD Structured Data

## Table of Contents
1. [JSON-LD Structured Data](#json-ld-structured-data)
2. [Meta Tags Implementation](#meta-tags-implementation)
3. [Sitemap Configuration](#sitemap-configuration)
4. [Rich Snippets Setup](#rich-snippets-setup)
5. [Page Structure Examples](#page-structure-examples)
6. [Performance Optimization](#performance-optimization)
7. [Google Search Console Setup](#google-search-console-setup)

## JSON-LD Structured Data

### 1. Organization Schema (Root Level)

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "YourOTT Platform",
  "alternateName": "YourOTT",
  "description": "Premium streaming platform with latest movies, TV shows, and web series",
  "url": "https://yourott.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://yourott.com/logo.png",
    "width": 600,
    "height": 60
  },
  "foundingDate": "2024",
  "founder": {
    "@type": "Person",
    "name": "Founder Name"
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Tech Street",
    "addressLocality": "City",
    "addressRegion": "State",
    "postalCode": "12345",
    "addressCountry": "US"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+1-555-123-4567",
    "contactType": "customer service",
    "availableLanguage": ["English", "Spanish", "French"]
  },
  "sameAs": [
    "https://facebook.com/yourott",
    "https://twitter.com/yourott",
    "https://instagram.com/yourott",
    "https://youtube.com/yourott"
  ]
}
```

### 2. Website Schema

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "YourOTT Platform",
  "description": "Stream latest movies, TV shows, and exclusive content",
  "url": "https://yourott.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://yourott.com/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  },
  "publisher": {
    "@type": "Organization",
    "name": "YourOTT Platform",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourott.com/logo.png"
    }
  }
}
```

### 3. Movie Schema (Individual Movie Pages)

```json
{
  "@context": "https://schema.org",
  "@type": "Movie",
  "name": "Movie Title",
  "alternateName": ["Alternative Title 1", "Alternative Title 2"],
  "description": "Complete movie description with plot summary",
  "image": [
    "https://yourott.com/images/movie-poster-1x1.jpg",
    "https://yourott.com/images/movie-poster-4x3.jpg",
    "https://yourott.com/images/movie-poster-16x9.jpg"
  ],
  "director": [
    {
      "@type": "Person",
      "name": "Director Name",
      "url": "https://yourott.com/person/director-slug"
    }
  ],
  "actor": [
    {
      "@type": "Person",
      "name": "Actor Name 1",
      "url": "https://yourott.com/person/actor1-slug"
    },
    {
      "@type": "Person",
      "name": "Actor Name 2",
      "url": "https://yourott.com/person/actor2-slug"
    }
  ],
  "genre": ["Action", "Adventure", "Sci-Fi"],
  "datePublished": "2024-01-15",
  "duration": "PT2H30M",
  "contentRating": "PG-13",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "8.5",
    "reviewCount": "1250",
    "bestRating": "10",
    "worstRating": "1"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "9",
        "bestRating": "10"
      },
      "author": {
        "@type": "Person",
        "name": "John Reviewer"
      },
      "reviewBody": "Amazing movie with great storytelling and visual effects."
    }
  ],
  "productionCompany": [
    {
      "@type": "Organization",
      "name": "Production Company Name"
    }
  ],
  "countryOfOrigin": {
    "@type": "Country",
    "name": "United States"
  },
  "inLanguage": "English",
  "url": "https://yourott.com/movie/movie-slug",
  "trailer": {
    "@type": "VideoObject",
    "name": "Movie Title - Official Trailer",
    "description": "Watch the official trailer",
    "thumbnailUrl": "https://yourott.com/images/trailer-thumb.jpg",
    "uploadDate": "2024-01-01",
    "contentUrl": "https://yourott.com/videos/trailer.mp4",
    "embedUrl": "https://yourott.com/embed/trailer",
    "duration": "PT2M30S"
  },
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "price": "0",
    "priceCurrency": "USD",
    "seller": {
      "@type": "Organization",
      "name": "YourOTT Platform"
    }
  }
}
```

### 4. TV Series Schema

```json
{
  "@context": "https://schema.org",
  "@type": "TVSeries",
  "name": "TV Series Title",
  "description": "Complete series description",
  "image": "https://yourott.com/images/series-poster.jpg",
  "genre": ["Drama", "Thriller"],
  "numberOfEpisodes": 24,
  "numberOfSeasons": 3,
  "startDate": "2022-01-15",
  "endDate": "2024-12-15",
  "contentRating": "TV-MA",
  "creator": [
    {
      "@type": "Person",
      "name": "Creator Name"
    }
  ],
  "actor": [
    {
      "@type": "Person",
      "name": "Lead Actor Name"
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "9.2",
    "reviewCount": "3450"
  },
  "url": "https://yourott.com/series/series-slug",
  "containsSeason": [
    {
      "@type": "TVSeason",
      "seasonNumber": 1,
      "numberOfEpisodes": 8,
      "url": "https://yourott.com/series/series-slug/season/1"
    }
  ]
}
```

### 5. Episode Schema

```json
{
  "@context": "https://schema.org",
  "@type": "TVEpisode",
  "name": "Episode Title",
  "episodeNumber": 1,
  "seasonNumber": 1,
  "description": "Episode description",
  "image": "https://yourott.com/images/episode-thumb.jpg",
  "datePublished": "2024-01-15",
  "duration": "PT45M",
  "partOfSeries": {
    "@type": "TVSeries",
    "name": "TV Series Title",
    "url": "https://yourott.com/series/series-slug"
  },
  "partOfSeason": {
    "@type": "TVSeason",
    "seasonNumber": 1,
    "url": "https://yourott.com/series/series-slug/season/1"
  },
  "video": {
    "@type": "VideoObject",
    "name": "Episode Title",
    "description": "Watch Episode 1",
    "thumbnailUrl": "https://yourott.com/images/episode-thumb.jpg",
    "uploadDate": "2024-01-15",
    "duration": "PT45M",
    "contentUrl": "https://yourott.com/watch/episode-id"
  }
}
```

### 6. Person Schema (Actors/Directors)

```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Actor/Director Name",
  "description": "Biography and career highlights",
  "image": "https://yourott.com/images/person-photo.jpg",
  "birthDate": "1980-05-15",
  "birthPlace": {
    "@type": "Place",
    "name": "City, Country"
  },
  "nationality": "American",
  "jobTitle": ["Actor", "Director"],
  "url": "https://yourott.com/person/person-slug",
  "sameAs": [
    "https://www.imdb.com/name/nm123456",
    "https://en.wikipedia.org/wiki/Person_Name"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "YourOTT Platform"
  }
}
```

### 7. Breadcrumb Schema

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://yourott.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Movies",
      "item": "https://yourott.com/movies"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "Action Movies",
      "item": "https://yourott.com/movies/action"
    },
    {
      "@type": "ListItem",
      "position": 4,
      "name": "Movie Title",
      "item": "https://yourott.com/movie/movie-slug"
    }
  ]
}
```

## Meta Tags Implementation

### Homepage Meta Tags

```html
<!-- Primary Meta Tags -->
<title>YourOTT - Stream Latest Movies, TV Shows & Web Series Online</title>
<meta name="title" content="YourOTT - Stream Latest Movies, TV Shows & Web Series Online">
<meta name="description" content="Watch unlimited movies, TV shows, and exclusive web series. Stream HD quality content with subtitles. New releases added daily. Start your free trial today!">
<meta name="keywords" content="streaming, movies, TV shows, web series, online streaming, HD movies, latest releases">
<meta name="robots" content="index, follow">
<meta name="language" content="English">
<meta name="author" content="YourOTT Platform">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="https://yourott.com/">
<meta property="og:title" content="YourOTT - Stream Latest Movies, TV Shows & Web Series Online">
<meta property="og:description" content="Watch unlimited movies, TV shows, and exclusive web series. Stream HD quality content with subtitles.">
<meta property="og:image" content="https://yourott.com/images/og-homepage.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:site_name" content="YourOTT Platform">
<meta property="og:locale" content="en_US">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="https://yourott.com/">
<meta property="twitter:title" content="YourOTT - Stream Latest Movies, TV Shows & Web Series Online">
<meta property="twitter:description" content="Watch unlimited movies, TV shows, and exclusive web series. Stream HD quality content with subtitles.">
<meta property="twitter:image" content="https://yourott.com/images/twitter-homepage.jpg">
<meta property="twitter:site" content="@yourott">
<meta property="twitter:creator" content="@yourott">

<!-- Additional Meta Tags -->
<meta name="theme-color" content="#000000">
<meta name="msapplication-TileColor" content="#000000">
<meta name="apple-mobile-web-app-title" content="YourOTT">
<meta name="application-name" content="YourOTT">
```

### Movie Page Meta Tags

```html
<title>{Movie Title} ({Year}) - Watch Online | YourOTT</title>
<meta name="description" content="Watch {Movie Title} ({Year}) online in HD quality. {Genre} movie starring {Lead Actor}. {Brief plot description}. Stream now on YourOTT.">
<meta name="keywords" content="{Movie Title}, {Year}, {Genre}, {Lead Actor}, {Director}, watch online, stream, HD">

<!-- Movie-specific Open Graph -->
<meta property="og:type" content="video.movie">
<meta property="og:title" content="{Movie Title} ({Year}) - YourOTT">
<meta property="og:description" content="{Movie description}">
<meta property="og:image" content="{Movie poster URL}">
<meta property="og:url" content="https://yourott.com/movie/{movie-slug}">
<meta property="video:duration" content="{duration in seconds}">
<meta property="video:release_date" content="{release date}">
<meta property="video:tag" content="{genre1}">
<meta property="video:tag" content="{genre2}">
```

## Rich Snippets Configuration

### 1. FAQ Schema for Common Questions

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How much does YourOTT subscription cost?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "YourOTT offers multiple subscription plans starting from $9.99/month for Basic plan, $14.99/month for Standard, and $19.99/month for Premium with 4K streaming."
      }
    },
    {
      "@type": "Question",
      "name": "Can I download movies to watch offline?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, YourOTT allows downloading of movies and TV shows for offline viewing on mobile devices with Standard and Premium plans."
      }
    },
    {
      "@type": "Question",
      "name": "How many devices can stream simultaneously?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Basic plan allows 1 device, Standard allows 2 devices, and Premium allows up to 4 devices streaming simultaneously."
      }
    }
  ]
}
```

### 2. Service Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Video Streaming Service",
  "description": "Premium streaming platform with unlimited access to movies, TV shows, and exclusive content",
  "provider": {
    "@type": "Organization",
    "name": "YourOTT Platform"
  },
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Streaming Plans",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Basic Plan"
        },
        "price": "9.99",
        "priceCurrency": "USD",
        "billingIncrement": "P1M"
      }
    ]
  }
}
```

## Next.js Implementation Components

### 1. SEO Component

```typescript
// components/SEO.tsx
import Head from 'next/head'

interface SEOProps {
  title: string
  description: string
  canonical?: string
  ogImage?: string
  ogType?: string
  schema?: object[]
  noindex?: boolean
}

export default function SEO({
  title,
  description,
  canonical,
  ogImage = '/images/default-og.jpg',
  ogType = 'website',
  schema = [],
  noindex = false
}: SEOProps) {
  const siteUrl = 'https://yourott.com'
  const fullTitle = `${title} | YourOTT`
  const canonicalUrl = canonical || siteUrl

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow'} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      <meta property="og:site_name" content="YourOTT" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* JSON-LD Schema */}
      {schema.map((schemaObj, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schemaObj)
          }}
        />
      ))}
    </Head>
  )
}
```

### 2. Movie Schema Generator

```typescript
// utils/movieSchema.ts
export function generateMovieSchema(movie: any) {
  return {
    "@context": "https://schema.org",
    "@type": "Movie",
    "name": movie.title,
    "description": movie.description,
    "image": movie.posterUrl,
    "director": movie.directors?.map((director: any) => ({
      "@type": "Person",
      "name": director.name,
      "url": `https://yourott.com/person/${director.slug}`
    })),
    "actor": movie.cast?.map((actor: any) => ({
      "@type": "Person",
      "name": actor.name,
      "url": `https://yourott.com/person/${actor.slug}`
    })),
    "genre": movie.genres,
    "datePublished": movie.releaseDate,
    "duration": `PT${movie.durationMinutes}M`,
    "contentRating": movie.rating,
    "aggregateRating": movie.imdbRating ? {
      "@type": "AggregateRating",
      "ratingValue": movie.imdbRating,
      "reviewCount": movie.reviewCount,
      "bestRating": "10",
      "worstRating": "1"
    } : undefined,
    "url": `https://yourott.com/movie/${movie.slug}`,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "price": "0",
      "priceCurrency": "USD"
    }
  }
}
```

## Google Search Console Setup

### 1. Sitemap Submission

```bash
# Submit these URLs to Google Search Console
https://yourott.com/sitemap.xml
https://yourott.com/sitemap-movies.xml
https://yourott.com/sitemap-series.xml
https://yourott.com/sitemap-people.xml
```

### 2. URL Parameters Configuration

```
# In Google Search Console > URL Parameters
page = Pagination parameter
sort = Sorting parameter  
filter = Filter parameter
q = Search query parameter
```

### 3. Core Web Vitals Optimization

```typescript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['yourott.com', 'cdn.yourott.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react']
  }
}

module.exports = nextConfig
```

## Performance & SEO Best Practices

### 1. Image Optimization

```typescript
// components/OptimizedImage.tsx
import Image from 'next/image'

interface Props {
  src: string
  alt: string
  width?: number
  height?: number
  priority?: boolean
}

export default function OptimizedImage({ 
  src, 
  alt, 
  width = 300, 
  height = 450, 
  priority = false 
}: Props) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ..."
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    />
  )
}
```

### 2. Loading States for Better UX

```typescript
// components/MovieCardSkeleton.tsx
export default function MovieCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-gray-300 aspect-[2/3] rounded-lg mb-2"></div>
      <div className="h-4 bg-gray-300 rounded mb-1"></div>
      <div className="h-3 bg-gray-300 rounded w-3/4"></div>
    </div>
  )
}
```

## Monitoring & Analytics

### 1. Schema Validation Tools

- Google's Rich Results Test
- Schema.org Validator
- JSON-LD Playground

### 2. SEO Monitoring

```typescript
// Track important SEO metrics
const seoMetrics = {
  coreWebVitals: ['LCP', 'FID', 'CLS'],
  searchRankings: ['branded', 'category', 'long-tail'],
  indexationStatus: ['total-pages', 'indexed-pages', 'errors']
}
```

This comprehensive guide provides everything needed to achieve rich search results like the example shown. The key is implementing proper JSON-LD structured data, optimized meta tags, and ensuring excellent page performance.


// app/movie/[slug]/page.tsx
import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getMovieBySlug } from '@/actions/movies/movie_actions'
import { generateMovieSchema, generateBreadcrumbSchema } from '@/utils/seo-schemas'
import SEOHead from '@/components/SEOHead'
import MovieDetails from '@/components/MovieDetails'

interface Props {
  params: Promise<{ slug: string }>
}

// Generate metadata for SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const movie = await getMovieBySlug(slug)

  if (!movie) {
    return {
      title: 'Movie Not Found | YourOTT',
      description: 'The requested movie could not be found.'
    }
  }

  const title = `${movie.title} (${new Date(movie.releaseDate).getFullYear()}) - Watch Online`
  const description = `Watch ${movie.title} online in HD quality. ${movie.genres?.join(', ')} movie ${movie.cast?.length ? `starring ${movie.cast[0].name}` : ''}. ${movie.description?.substring(0, 120)}...`

  return {
    title,
    description,
    keywords: [
      movie.title,
      new Date(movie.releaseDate).getFullYear().toString(),
      ...movie.genres || [],
      ...movie.cast?.slice(0, 3).map(actor => actor.name) || [],
      'watch online',
      'stream',
      'HD movie'
    ].join(', '),
    openGraph: {
      title,
      description,
      type: 'video.movie',
      url: `https://yourott.com/movie/${movie.slug}`,
      images: [
        {
          url: movie.posterUrl,
          width: 300,
          height: 450,
          alt: `${movie.title} poster`
        },
        {
          url: movie.backdropUrl || movie.posterUrl,
          width: 1200,
          height: 630,
          alt: `${movie.title} backdrop`
        }
      ],
      releaseDate: movie.releaseDate,
      tags: movie.genres
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [movie.backdropUrl || movie.posterUrl]
    },
    alternates: {
      canonical: `https://yourott.com/movie/${movie.slug}`
    },
    other: {
      'video:duration': movie.durationMinutes ? `${movie.durationMinutes * 60}` : undefined,
      'video:release_date': movie.releaseDate,
      'video:tag': movie.genres?.join(',')
    }
  }
}

export default async function MoviePage({ params }: Props) {
  const { slug } = await params
  const movie = await getMovieBySlug(slug)

  if (!movie) {
    notFound()
  }

  // Generate structured data
  const movieSchema = generateMovieSchema(movie)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://yourott.com' },
    { name: 'Movies', url: 'https://yourott.com/movies' },
    { name: movie.genres?.[0] || 'Movies', url: `https://yourott.com/movies/${movie.genres?.[0]?.toLowerCase()}` },
    { name: movie.title, url: `https://yourott.com/movie/${movie.slug}` }
  ])

  const schemas = [movieSchema, breadcrumbSchema]

  return (
    <>
      <SEOHead schemas={schemas} />
      <MovieDetails movie={movie} />
    </>
  )
}

// Generate static params for popular movies (optional, for better performance)
export async function generateStaticParams() {
  // Get top 100 movies for static generation
  const popularMovies = await getPopularMovies(100)
  
  return popularMovies.map((movie) => ({
    slug: movie.slug,
  }))
}


// utils/seo-schemas.ts

interface Movie {
  title: string
  slug: string
  description: string
  posterUrl: string
  backdropUrl?: string
  releaseDate: string
  durationMinutes?: number
  rating?: string
  genres?: string[]
  cast?: Array<{ name: string; slug: string }>
  directors?: Array<{ name: string; slug: string }>
  imdbRating?: number
  reviewCount?: number
  trailerUrl?: string
}

interface TVSeries {
  title: string
  slug: string
  description: string
  posterUrl: string
  startDate: string
  endDate?: string
  numberOfSeasons: number
  numberOfEpisodes: number
  rating?: string
  genres?: string[]
  cast?: Array<{ name: string; slug: string }>
  creators?: Array<{ name: string; slug: string }>
  imdbRating?: number
  reviewCount?: number
}

interface BreadcrumbItem {
  name: string
  url: string
}

export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "YourOTT Platform",
    "alternateName": "YourOTT",
    "description": "Premium streaming platform with latest movies, TV shows, and web series",
    "url": "https://yourott.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://yourott.com/logo.png",
      "width": 600,
      "height": 60
    },
    "foundingDate": "2024",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "123 Tech Street",
      "addressLocality": "San Francisco",
      "addressRegion": "CA",
      "postalCode": "94105",
      "addressCountry": "US"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["English", "Spanish", "French"]
    },
    "sameAs": [
      "https://facebook.com/yourott",
      "https://twitter.com/yourott",
      "https://instagram.com/yourott",
      "https://youtube.com/yourott"
    ]
  }
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type
