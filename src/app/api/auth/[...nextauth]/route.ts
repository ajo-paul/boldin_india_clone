import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import CredentialsProvider from "next-auth/providers/credentials";
import { SupabaseAdapter } from "@auth/supabase-adapter";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  adapter: SupabaseAdapter({
    url: process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    secret: process.env.SUPABASE_SERVICE_ROLE_KEY as string,
  }),
  pages: {
    signIn: '/login', // We will build a custom login page
  },
  session: {
    strategy: "jwt",
  },
};

// Add developer credential provider only in non-production environments
if (process.env.NODE_ENV !== 'production') {
  authOptions.providers.push(
    CredentialsProvider({
      name: "Developer Login",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "dev@boldin.local" },
      },
      async authorize(credentials) {
        if (credentials?.email) {
          // Mock a valid user for development
          return { id: "dev-uuid-1234", email: credentials.email, name: "Developer Mode" };
        }
        return null;
      }
    })
  );
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
