import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma_client/primsa_client";
import Credentials from "next-auth/providers/credentials";
import { signInSchema } from "@/lib/signInSchema";
import { verifyPassword } from "@/lib/password";
import { ZodError } from "zod";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
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
          // Return user object for session
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
          };
        } catch (error) {
          if (error instanceof ZodError) return null;
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
