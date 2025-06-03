"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface MovieClientPageProps {
  children: React.ReactNode;
  movieData: any;
}

export default function MovieClientPage({ children, movieData }: MovieClientPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Remove redirect logic - popup will handle authentication
  }, [status, router]);

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${movieData.title} - TamilYogiVip`,
        text: `Check out this amazing movie on TamilYogiVip!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied!");
    }
  };

  // Handle genre click
  const handleGenreClick = () => {
    router.push(`/genere/${movieData.genre.slug}`);
  };

  // Add event handlers to the DOM after component mounts
  useEffect(() => {
    // Add click handlers to share button
    const shareButton = document.querySelector('[data-share-button]');
    if (shareButton) {
      shareButton.addEventListener('click', handleShare);
    }

    // Add click handlers to genre tags
    const genreTag = document.querySelector('[data-genre-tag]');
    if (genreTag) {
      genreTag.addEventListener('click', handleGenreClick);
    }

    return () => {
      if (shareButton) {
        shareButton.removeEventListener('click', handleShare);
      }
      if (genreTag) {
        genreTag.removeEventListener('click', handleGenreClick);
      }
    };
  }, [movieData]);

  return <>{children}</>;
}
