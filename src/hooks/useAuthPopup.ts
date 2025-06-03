"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

export const useAuthPopup = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { data: session, status } = useSession();

  useEffect(() => {
    // Show popup if user is not authenticated and not currently loading
    if (status === "unauthenticated") {
      // Small delay to ensure smooth page load
      const timer = setTimeout(() => {
        setIsPopupOpen(true);
      }, 500); // Reduced delay for faster popup appearance
      return () => clearTimeout(timer);
    } else if (status === "authenticated") {
      setIsPopupOpen(false);
    }
  }, [status]);

  const openPopup = () => setIsPopupOpen(true);
  // Remove closePopup function to prevent manual closing
  
  return {
    isPopupOpen,
    openPopup,
    closePopup: () => {}, // Empty function - popup can only be closed by authentication
    isAuthenticated: status === "authenticated",
    isLoading: status === "loading",
  };
};
