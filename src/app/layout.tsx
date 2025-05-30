import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "StreamFlix - Ultimate Streaming Destination",
  description:
    "Watch the latest movies and web series online. StreamFlix brings you HD entertainment, trending releases, and more!",
  openGraph: {
    title: "StreamFlix - Ultimate Streaming Destination",
    description:
      "Watch the latest movies and web series online. StreamFlix brings you HD entertainment, trending releases, and more!",
    url: "https://streamflix.example.com/",
    siteName: "StreamFlix",
    images: [
      {
        url: "/api/og?title=StreamFlix",
        width: 1200,
        height: 630,
        alt: "StreamFlix Hero Banner",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "StreamFlix - Ultimate Streaming Destination",
    description:
      "Watch the latest movies and web series online. StreamFlix brings you HD entertainment, trending releases, and more!",
    images: ["/api/og?title=StreamFlix"],
    site: "@streamflix",
  },
};

// Add JSON-LD for organization
function JsonLd() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "StreamFlix",
          url: "https://streamflix.example.com/",
          logo: "/favicon.ico",
          sameAs: [
            "https://facebook.com/streamflix",
            "https://twitter.com/streamflix",
            "https://instagram.com/streamflix",
          ],
        }),
      }}
    />
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
