import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import bcrypt from 'bcryptjs';

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
];

async function getUser(email: string) {
  try {
    const user = mockUsers.find(u => u.email === email.toLowerCase());
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

async function createUser(email: string, password: string, name: string) {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: String(mockUsers.length + 1),
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
    };
    mockUsers.push(newUser);
    return { id: newUser.id, email: newUser.email, name: newUser.name };
  } catch (error) {
    console.error('Failed to create user:', error);
    throw new Error('Failed to create user.');
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
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password, action } = parsedCredentials.data;
          if (action === 'register') {
            try {
              const existingUser = await getUser(email);
              if (existingUser) {
                throw new Error('User already exists');
              }
              const user = await createUser(email, password, email.split('@')[0]);
              return user;
            } catch (error) {
              console.error('Registration error:', error);
              return null;
            }
          } else {
            // Login logic
            const user = await getUser(email);
            if (!user) return null;
            const passwordsMatch = await bcrypt.compare(password, user.password);
            if (passwordsMatch) {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
              };
            }
          }
        }
        console.log('Invalid credentials');
        return null;
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
});
