import { Movie, Genre, Season, Episode } from "@prisma/client";

interface JsonLdProps {
  type: "organization" | "website" | "movie" | "tvseries" | "breadcrumb" | "person" | "faq" | "service";
  data?: any;
}

// Organization Schema
export function OrganizationJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TamilYogiVip",
    url: "https://tamilyogivip.me",
    logo: "https://tamilyogivip.me/logo.png",
    description: "Ultimate streaming destination for Tamil movies and web series. Watch HD entertainment online.",
    foundingDate: "2024",
    sameAs: [
      "https://facebook.com/tamilyogivip",
      "https://twitter.com/tamilyogivip",
      "https://instagram.com/tamilyogivip",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      availableLanguage: ["Tamil", "English"]
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Website Schema
export function WebsiteJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "TamilYogiVip",
    url: "https://tamilyogivip.me",
    description: "Watch the latest Tamil movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!",
    publisher: {
      "@type": "Organization",
      name: "TamilYogiVip",
      url: "https://tamilyogivip.me"
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://tamilyogivip.me/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Movie Schema
interface MovieWithGenre extends Movie {
  genre: Genre;
  seasons?: (Season & { episodes: Episode[] })[];
}

interface MovieJsonLdProps {
  movie: MovieWithGenre;
}

export function MovieJsonLd({ movie }: MovieJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": movie.type === "MOVIE" ? "Movie" : "TVSeries",
    name: movie.title,
    description: movie.description,
    url: `https://tamilyogivip.me/movie/${movie.slug}`,
    image: movie.poster || "https://tamilyogivip.me/default-poster.jpg",
    datePublished: movie.releaseDate?.toISOString().split('T')[0],
    genre: movie.genre.name,
    aggregateRating: movie.rating ? {
      "@type": "AggregateRating",
      ratingValue: movie.rating,
      bestRating: 10,
      worstRating: 1,
      ratingCount: 100 // You might want to make this dynamic
    } : undefined,
    director: {
      "@type": "Person",
      name: "Director Name" // You'd want to add director field to your model
    },
    actor: [
      {
        "@type": "Person",
        name: "Actor Name" // You'd want to add actors field to your model
      }
    ],
    productionCompany: {
      "@type": "Organization",
      name: "TamilYogiVip"
    },
    ...(movie.type !== "MOVIE" && movie.seasons ? {
      numberOfSeasons: movie.seasons.length,
      numberOfEpisodes: movie.seasons.reduce((total, season) => total + season.episodes.length, 0)
    } : {})
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Breadcrumb Schema
interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbJsonLdProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Person Schema (for actors, directors)
interface PersonJsonLdProps {
  name: string;
  description?: string;
  image?: string;
  jobTitle?: string;
}

export function PersonJsonLd({ name, description, image, jobTitle }: PersonJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    description,
    image,
    jobTitle
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// FAQ Schema
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQJsonLdProps {
  faqs: FAQItem[];
}

export function FAQJsonLd({ faqs }: FAQJsonLdProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(faq => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// Service Schema
export function ServiceJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Movie Streaming Service",
    description: "Stream the latest Tamil movies and web series in HD quality",
    provider: {
      "@type": "Organization",
      name: "TamilYogiVip",
      url: "https://tamilyogivip.me"
    },
    serviceType: "Entertainment Streaming",
    areaServed: "Worldwide",
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: "https://tamilyogivip.me",
      servicePhone: "+1-XXX-XXX-XXXX"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
