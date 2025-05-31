"use client";
import React from "react";
import { useRouter } from "next/navigation";
import UserAvatar from "./UserAvatar";
import { useSession, signOut } from "next-auth/react";

const Header = () => {
  const router = useRouter();
  const { data: session } = useSession();

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
        TamilYogiVip
      </div>
      {/* Right: Avatar and user info */}
      <div className="flex items-center gap-4">
        {session?.user ? (
          <>
            <UserAvatar user={session.user} />
            <div className="flex flex-col text-right">
              <span className="text-sm text-white font-semibold">{session.user.name}</span>
              <span className="text-xs text-gray-400">{session.user.email}</span>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="ml-4 px-3 py-1 rounded bg-gray-800 text-gray-200 hover:bg-red-600 hover:text-white text-xs font-medium border border-gray-700 transition"
            >
              Sign out
            </button>
          </>
        ) : (
          <button
            onClick={() => router.push("/login")}
            className="ml-4 px-3 py-1 rounded bg-red-600 text-white text-xs font-medium border border-red-700 hover:bg-red-700 transition"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
