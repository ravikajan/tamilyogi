"use client";

import React from "react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import AuthPopup from "./AuthPopup";
import { useAuthPopup } from "@/hooks/useAuthPopup";

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { isPopupOpen, closePopup, isAuthenticated } = useAuthPopup();
  const pathname = usePathname();

  // Don't show popup on authentication pages
  const isAuthPage = pathname === "/login" || pathname === "/register" || pathname?.startsWith("/api/");

  return (
    <>
      {children}      <AuthPopup
        isOpen={isPopupOpen && !isAuthenticated && !isAuthPage}
        onClose={closePopup}
        title="Login Required"
        description="Access our exclusive movie collection"
      />
    </>
  );
};

export default AuthWrapper;
