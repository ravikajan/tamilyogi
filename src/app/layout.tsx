import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import RegisterSW from "@/components/RegisterSW";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TamilYogiVip - Ultimate Streaming Destination",
  description:
    "Watch the latest movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!",
  openGraph: {
    title: "TamilYogiVip - Ultimate Streaming Destination",
    description:
      "Watch the latest movies and web series online. TamilYogiVip brings you HD entertainment, trending releases, and more!",
    url: "https://tamiliyogivip.example.com/",
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
    site: "@tamiliyogivip",
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
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
          name: "TamilYogiVip",
          url: "https://tamiliyogivip.example.com/",
          logo: "/favicon.ico",
          sameAs: [
            "https://facebook.com/tamiliyogivip",
            "https://twitter.com/tamiliyogivip",
            "https://instagram.com/tamiliyogivip",
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
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#111111" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <RegisterSW />
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
