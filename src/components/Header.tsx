"use client";
import React from "react";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-50 bg-black bg-opacity-95 backdrop-blur border-b border-gray-800 py-4 px-4 sm:px-8 flex items-center justify-between shadow-md">
      {/* Logo */}
      <div
        className="text-2xl font-bold text-red-500 cursor-pointer select-none"
        onClick={() => router.push("/")}
        tabIndex={0}
        role="button"
        aria-label="Go to home page"
        onKeyDown={e => { if (e.key === "Enter" || e.key === " ") router.push("/"); }}
      >
        StreamFlix
      </div>
      {/* Right: Avatar */}
      <div className="flex items-center gap-4">
        <UserAvatar />
      </div>
    </header>
  );
};

export default Header;
