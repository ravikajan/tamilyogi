"use client";
import Head from "next/head";
import { OrganizationJsonLd, WebsiteJsonLd, BreadcrumbJsonLd, FAQJsonLd, ServiceJsonLd } from "./JsonLd";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  noIndex?: boolean;
  ogImage?: string;
  ogType?: "website" | "article" | "video.movie" | "video.tv_show";
  jsonLd?: any;
  breadcrumbs?: Array<{ name: string; url: string }>;
  faqs?: Array<{ question: string; answer: string }>;
  includeOrganization?: boolean;
  includeWebsite?: boolean;
  includeService?: boolean;
}

export default function SEOComponent({
  title = "TamilYogiVip - Ultimate Streaming Destination",
  description = "Watch the latest movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!",
  canonical,
  noIndex = false,
  ogImage,
  ogType = "website",
  jsonLd,
  breadcrumbs,
  faqs,
  includeOrganization = false,
  includeWebsite = false,
  includeService = false,
}: SEOProps) {
  const fullTitle = title.includes("TamilYogiVip") ? title : `${title} | TamilYogiVip`;
  const siteUrl = "https://tamilyogivip.me";
  const canonicalUrl = canonical || siteUrl;
  const imageUrl = ogImage || `${siteUrl}/api/og?title=${encodeURIComponent(title)}`;

  return (
    <>
      <Head>
        <title>{fullTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content={fullTitle} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content={ogType} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={title} />
        <meta property="og:site_name" content="TamilYogiVip" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={fullTitle} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:site" content="@tamilyogivip" />
        <meta name="twitter:creator" content="@tamilyogivip" />
        
        {/* Additional Meta Tags */}
        <meta name="theme-color" content="#111111" />
        <meta name="color-scheme" content="dark" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </Head>

      {/* JSON-LD Structured Data */}
      {includeOrganization && <OrganizationJsonLd />}
      {includeWebsite && <WebsiteJsonLd />}
      {includeService && <ServiceJsonLd />}
      
      {breadcrumbs && breadcrumbs.length > 0 && (
        <BreadcrumbJsonLd items={breadcrumbs} />
      )}
      
      {faqs && faqs.length > 0 && (
        <FAQJsonLd faqs={faqs} />
      )}
      
      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      )}
    </>
  );
}
