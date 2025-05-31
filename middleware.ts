import { auth } from "./auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  // Only allow access if authenticated, otherwise always redirect to login
  const isAuth = !!req.auth?.user;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login") || req.nextUrl.pathname.startsWith("/register") || req.nextUrl.pathname.startsWith("/api/auth");

  if (!isAuth && !isAuthRoute) {
    // Always redirect to login if not authenticated
    return NextResponse.redirect(new URL("/login", req.url));
  }
  // If authenticated or on login/register/auth route, allow
  return NextResponse.next();
});

export const config = {
  matcher: [
    // Protect everything except static assets and auth routes
    "/((?!_next/static|_next/image|favicon.ico|icon-192x192.png|icon-512x512.png|sw.js).*)",
  ],
};
