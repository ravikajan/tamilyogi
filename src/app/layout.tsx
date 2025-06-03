import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import RegisterSW from "@/components/RegisterSW";
import AuthWrapper from "@/components/AuthWrapper";
import { OrganizationJsonLd, WebsiteJsonLd } from "@/components/seo/JsonLd";
import { PerformanceOptimizer, CriticalCSS } from "@/components/seo/PerformanceOptimizer";
import { initSEOMonitoring } from "@/lib/seo/seoMonitoring";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "TamilYogiVip - Ultimate Streaming Destination",
    template: "%s | TamilYogiVip"
  },
  description:
    "Watch the latest movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!",
  keywords: ["tamil movies", "web series", "streaming", "HD movies", "online movies", "entertainment", "watch online"],
  authors: [{ name: "TamilYogiVip" }],
  creator: "TamilYogiVip",
  publisher: "TamilYogiVip",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "TamilYogiVip - Ultimate Streaming Destination",
    description:
      "Watch the latest movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!",
    url: "https://tamilyogivip.me",
    siteName: "TamilYogiVip",
    images: [
      {
        url: "/api/og?title=TamilYogiVip",
        width: 1200,
        height: 630,
        alt: "TamilYogiVip Hero Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TamilYogiVip - Ultimate Streaming Destination",
    description:
      "Watch the latest movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!",
    images: ["/api/og?title=TamilYogiVip"],
    site: "@tamilyogivip",
    creator: "@tamilyogivip",
  },
  verification: {
    google: "your-google-verification-code",
    other: {
      "msvalidate.01": "your-bing-verification-code",
    },
  },
  alternates: {
    canonical: "https://tamilyogivip.me",
  },
  metadataBase: new URL("https://tamilyogivip.me"),
  other: {
    "theme-color": "#111111",
    "color-scheme": "dark",
  },
};

// Initialize SEO monitoring in development
if (typeof window !== 'undefined') {
  initSEOMonitoring();
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <CriticalCSS />
        <OrganizationJsonLd />
        <WebsiteJsonLd />
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#111111" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PerformanceOptimizer
          prefetchUrls={[
            '/search',
            '/genere/action',
            '/genere/comedy',
            '/genere/drama',
            '/list/new-releases',
            '/list/trending'
          ]}
        >
          <RegisterSW />
          <SessionProvider>
            <AuthWrapper>
              {children}
            </AuthWrapper>
          </SessionProvider>
        </PerformanceOptimizer>
      </body>
    </html>
  );
}
