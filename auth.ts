import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const adminEmail    = process.env.ADMIN_EMAIL!;
        const adminPassword = process.env.ADMIN_PASSWORD!;

        if (!credentials?.email || !credentials?.password) return null;
        if (credentials.email !== adminEmail) return null;

        // Support both bcrypt-hashed and plain-text passwords (plain for dev ease)
        let passwordMatch = false;
        if (adminPassword.startsWith("$2")) {
          // bcrypt hash
          passwordMatch = await bcrypt.compare(credentials.password as string, adminPassword);
        } else {
          // plain text comparison (set a proper hash in production)
          passwordMatch = credentials.password === adminPassword;
        }

        if (!passwordMatch) return null;

        return {
          id:    "admin",
          email: adminEmail,
          name:  "Admin",
          role:  "admin",
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.role = (user as { role?: string }).role;
      return token;
    },
    async session({ session, token }) {
      if (session.user) (session.user as { role?: string }).role = token.role as string;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.AUTH_SECRET,
});
