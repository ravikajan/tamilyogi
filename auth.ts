import NextAuth from "next-auth";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma_client/primsa_client";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/signInSchema";
import { verifyPassword } from "@/lib/password";
import { ZodError } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email", placeholder: "johndoe@gmail.com" },
        password: { label: "Password", type: "password", placeholder: "********" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(credentials);
          // Find user by email
          const user = await prisma.user.findUnique({ where: { email } });
          if (!user || !user.id || !user.email) return null;
          // Check password
          if (!user.password) return null;
          const valid = await verifyPassword(password, user.password);
          if (!valid) return null;
          // Return the full user object for session
          return user;
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // Defensive: always ensure session.user exists
      if (!session.user) session.user = {} as typeof session.user;
      if (token) {
        session.user.id = (token.id as string) || token.sub || "";
        session.user.name = (token.name as string) || undefined;
        session.user.email = (token.email as string) || "";
        session.user.image = (token.picture as string) || undefined;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.picture = user.image;
      }
      return token;
    },
  },
  pages: {
    signIn: "/login",
  },
});
