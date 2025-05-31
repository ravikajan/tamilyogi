import { NextResponse, NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Try to get the session token from cookies
  const sessionToken = req.cookies.get("next-auth.session-token")?.value || req.cookies.get("__Secure-next-auth.session-token")?.value;

  // If no session token, redirect to /login
  if (!sessionToken) {
    const url = req.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

export const config = {
  matcher: [
    // Protect everything except static assets, images, and login/register/api routes
    "/((?!_next/static|_next/image|favicon.ico|icon-192x192.png|icon-512x512.png|sw.js|login|register|api/auth).*)",
  ],
};
