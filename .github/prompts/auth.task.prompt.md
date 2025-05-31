---
mode: 'agent'
---
# Auth.js + Next.js 15 + Bun Implementation Tasks (Windows)

## Overview
Implement Auth.js authentication with Next.js 15 using email/password credentials provider, middleware protection, and mock external API integration. Setup optimized for Windows with Bun package manager.

## Prerequisites
- Next.js 15 app with App Router (minimum Next.js 14.0 required for Auth.js v5)
- Existing login page
- TypeScript support
- Bun installed on Windows
- PowerShell or Command Prompt access

## Installation Tasks

### 1. Install Dependencies with Bun
```bash
# Install Auth.js (latest stable version for Next.js 15)
bun add next-auth@beta

# Install additional dependencies
bun add bcryptjs zod
bun add -d @types/bcryptjs

# Generate auth secret using PowerShell (Windows alternative to openssl)
# Option 1: Using PowerShell
Add-Type -AssemblyName System.Web
[System.Web.Security.Membership]::GeneratePassword(32, 0)

# Option 2: Using Node.js (if PowerShell doesn't work)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Option 3: Using Bun directly
bun -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Environment Variables (Windows)
Create/update `.env.local`:
```bash
# Copy the generated secret from step 1
AUTH_SECRET=your_generated_secret_here
AUTH_URL=http://localhost:3000

# Legacy support (optional)
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:3000
```

## Configuration Files

### 3. Create `auth.config.ts` (root directory)
```typescript
import type { NextAuthConfig } from "next-auth"

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard')
      const isOnLogin = nextUrl.pathname.startsWith('/login')
      const isOnRegister = nextUrl.pathname.startsWith('/register')
      
      if (isOnDashboard) {
        if (isLoggedIn) return true
        return false // Redirect unauthenticated users to login page
      } else if (isLoggedIn && (isOnLogin || isOnRegister)) {
        return Response.redirect(new URL('/dashboard', nextUrl))
      }
      return true
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig
```

### 4. Create `auth.ts` (root directory)
Configure Auth.js with the new v5 format:
```typescript
import NextAuth from 'next-auth'
import { authConfig } from './auth.config'
import Credentials from 'next-auth/providers/credentials'
import { z } from 'zod'
import bcrypt from 'bcryptjs'

// Mock user data - replace with your actual database calls
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    name: 'Admin User',
  },
  {
    id: '2', 
    email: 'user@example.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    name: 'Regular User',
  }
]

async function getUser(email: string) {
  try {
    const user = mockUsers.find(u => u.email === email.toLowerCase())
    return user
  } catch (error) {
    console.error('Failed to fetch user:', error)
    throw new Error('Failed to fetch user.')
  }
}

async function createUser(email: string, password: string, name: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = {
      id: String(mockUsers.length + 1),
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    }
    mockUsers.push(newUser)
    return { id: newUser.id, email: newUser.email, name: newUser.name }
  } catch (error) {
    console.error('Failed to create user:', error)
    throw new Error('Failed to create user.')
  }
}

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        action: { label: "Action", type: "hidden" }
      },
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ 
            email: z.string().email(), 
            password: z.string().min(6),
            action: z.string().optional()
          })
          .safeParse(credentials)

        if (parsedCredentials.success) {
          const { email, password, action } = parsedCredentials.data
          
          if (action === 'register') {
            try {
              const existingUser = await getUser(email)
              if (existingUser) {
                throw new Error('User already exists')
              }
              const user = await createUser(email, password, email.split('@')[0])
              return user
            } catch (error) {
              console.error('Registration error:', error)
              return null
            }
          } else {
            // Login logic
            const user = await getUser(email)
            if (!user) return null
            
            const passwordsMatch = await bcrypt.compare(password, user.password)
            if (passwordsMatch) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
              }
            }
          }
        }
        
        console.log('Invalid credentials')
        return null
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string
      }
      return session
    },
  },
})
```

### 5. Create `middleware.ts` (root directory)
Use the new middleware format for Auth.js v5:
```typescript
export { auth as middleware } from "@/auth"

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
}
```

## API Routes

### 6. Create `app/api/auth/[...nextauth]/route.ts`
```typescript
import { handlers } from '@/auth'
export const { GET, POST } = handlers
```

### 7. Create `app/api/user/route.ts` - Protected API route
```typescript
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function GET() {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Mock external API call with user data
  const mockApiResponse = {
    user: session.user,
    additionalData: {
      role: 'user',
      preferences: {
        theme: 'light',
        notifications: true
      },
      lastLogin: new Date().toISOString()
    }
  }

  return NextResponse.json(mockApiResponse)
}
```

### 8. Create `app/api/external/route.ts` - Mock external API integration
```typescript
import { auth } from '@/auth'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const session = await auth()
  
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get('endpoint')

  // Mock external API responses
  const mockExternalData = {
    users: [
      { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
    ],
    products: [
      { id: 1, name: 'Product A', price: 29.99, category: 'electronics' },
      { id: 2, name: 'Product B', price: 49.99, category: 'clothing' },
    ],
    analytics: {
      totalUsers: 1250,
      activeUsers: 980,
      revenue: 15640.50,
      conversionRate: 3.2
    }
  }

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500))

  const data = mockExternalData[endpoint as keyof typeof mockExternalData] || { message: 'Endpoint not found' }
  
  return NextResponse.json({
    success: true,
    data,
    timestamp: new Date().toISOString(),
    user: session.user.email
  })
}
```

## Page Components

### 9. Update existing login page
Enhance your existing login page to work with Auth.js:
```typescript
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid credentials')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}
          {/* Form fields and submit button */}
          <div className="mt-4 p-4 bg-blue-50 rounded-md">
            <h3 className="text-sm font-medium text-blue-800">Demo Credentials:</h3>
            <p className="text-sm text-blue-600">Email: admin@example.com</p>
            <p className="text-sm text-blue-600">Password: password</p>
          </div>
        </form>
      </div>
    </div>
  )
}
```

### 10. Create `app/register/page.tsx`
```typescript
'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      const result = await signIn('credentials', {
        email,
        password,
        action: 'register',
        redirect: false,
      })

      if (result?.error) {
        setError('Registration failed. User may already exist.')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('An error occurred. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    // Registration form JSX
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Registration form implementation */}
    </div>
  )
}
```

### 11. Create `app/dashboard/page.tsx`
```typescript
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import DashboardClient from './dashboard-client'

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect('/login')
  }

  return <DashboardClient session={session} />
}
```

### 12. Create `app/dashboard/dashboard-client.tsx`
```typescript
'use client'

import { useState, useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { Session } from 'next-auth'

interface DashboardClientProps {
  session: Session
}

export default function DashboardClient({ session }: DashboardClientProps) {
  const [apiData, setApiData] = useState<any>({})
  const [loading, setLoading] = useState<string | null>(null)
  const [userProfile, setUserProfile] = useState<any>(null)

  useEffect(() => {
    fetchUserProfile()
  }, [])

  const fetchUserProfile = async () => {
    try {
      const response = await fetch('/api/user')
      if (response.ok) {
        const data = await response.json()
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error)
    }
  }

  const fetchExternalData = async (endpoint: string) => {
    setLoading(endpoint)
    try {
      const response = await fetch(`/api/external?endpoint=${endpoint}`)
      if (response.ok) {
        const result = await response.json()
        setApiData(prev => ({ ...prev, [endpoint]: result.data }))
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(null)
    }
  }

  const handleSignOut = () => {
    signOut({ callbackUrl: '/login' })
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Dashboard UI implementation */}
    </div>
  )
}
```

### 13. Update `app/layout.tsx`
```typescript
import { Inter } from 'next/font/google'
import { SessionProvider } from 'next-auth/react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  )
}
```

### 14. Update `app/page.tsx`
```typescript
import { auth } from '@/auth'
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth()
  
  if (session) {
    redirect('/dashboard')
  } else {
    redirect('/login')
  }
}
```

## Mock Data Structure

### 15. User Mock Data
```typescript
const mockUsers = [
  {
    id: '1',
    email: 'admin@example.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    name: 'Admin User',
  },
  {
    id: '2', 
    email: 'user@example.com',
    password: '$2b$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // "password"
    name: 'Regular User',
  }
]
```

### 16. External API Mock Data
```typescript
const mockExternalData = {
  users: [
    { id: 1, name: 'John Doe', email: 'john@example.com', status: 'active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', status: 'inactive' },
  ],
  products: [
    { id: 1, name: 'Product A', price: 29.99, category: 'electronics' },
    { id: 2, name: 'Product B', price: 49.99, category: 'clothing' },
  ],
  analytics: {
    totalUsers: 1250,
    activeUsers: 980,
    revenue: 15640.50,
    conversionRate: 3.2
  }
}
```

## Authentication Flow

### 17. Login Flow
1. User submits email/password
2. Credentials provider validates input with zod
3. Check user exists in mock data
4. Compare hashed passwords with bcryptjs
5. Return user object or null
6. Redirect to dashboard on success

### 18. Registration Flow
1. User submits email/password with action: 'register'
2. Check if user already exists
3. Hash password and create new user
4. Return user object
5. Redirect to dashboard on success

### 19. Protection Flow
1. Middleware checks all routes using auth() function
2. Redirect unauthenticated users to login
3. Allow authenticated users to protected routes
4. API routes check session before returning data

## Development Commands (Windows + Bun)

### 20. Development Setup
```bash
# Start development server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Check types
bun run type-check

# Generate new auth secret
bun -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Testing Checklist
- [ ] Can register new users
- [ ] Can login with existing users
- [ ] Protected routes redirect to login
- [ ] Authenticated users can access dashboard
- [ ] Sign out works correctly
- [ ] API routes require authentication
- [ ] Mock external API data displays correctly
- [ ] Middleware protects all routes properly

## Demo Credentials
- Email: `admin@example.com`
- Password: `password`

## Notes for Windows + Bun
- Use PowerShell for better command support
- Bun handles TypeScript natively, no need for additional transpilation
- Auth.js v5 is fully compatible with Next.js 15
- Environment variables work the same as with npm/yarn
- Replace mock user data with actual database calls when ready
- Add proper error handling for production
- Consider adding email verification for registration
- Implement password reset functionality if needed

## Key Differences from NextAuth
- Auth.js v5 uses a simplified configuration with auth, handlers, signIn, signOut exports
- Credentials provider syntax is slightly updated
- Environment variables can use AUTH_ prefix instead of NEXTAUTH_
- Middleware implementation is more streamlined
- Better TypeScript support out of the box