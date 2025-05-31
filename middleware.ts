import { auth } from "./auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  console.log('🔥 Middleware executing for:', req.nextUrl.pathname)
  console.log('🔥 Auth status:', !!req.auth)
  
  if (!req.auth && !req.nextUrl.pathname.startsWith('/login') && !req.nextUrl.pathname.startsWith('/register')) {
    console.log('🔥 Redirecting to login')
    return NextResponse.redirect(new URL('/login', req.url))
  }
  
  return NextResponse.next()
})

export const config = {
  matcher: [
    
    '/((?!login|register|api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
