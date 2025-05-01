import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/mongodb";
import User from "@/models/User"; // Import User model

const adminEmails = [
  "syedmirhabib@gmail.com",
  "ebrikkho2024@gmail.com"
];

// Verify required environment variables
if (!process.env.GOOGLE_ID || !process.env.GOOGLE_SECRET) {
  throw new Error(
    'Missing environment variables. Please add GOOGLE_ID and GOOGLE_SECRET to .env.local'
  );
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "select_account"
        }
      }
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account.provider === "google") {
        if (adminEmails.includes(user.email)) {
          // Set admin privileges during sign in
          await (await clientPromise)
            .db(process.env.MONGODB_DB)
            .collection("users")
            .updateOne(
              { email: user.email },
              {
                $set: {
                  isAdmin: true,
                  role: "admin",
                  metadata: {
                    position: "Admin",
                    department: "Management",
                    joinedDate: new Date(),
                    lastLogin: new Date()
                  }
                }
              },
              { upsert: true }
            );
        }
        return profile.email_verified;
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        // Get user from database with proper admin check
        const user = await User.findOne({ email: session.user.email });
        
        // Explicitly set admin status
        session.user.isAdmin = Boolean(user?.isAdmin);
        session.user.role = user?.role || 'user';
        
        // Log for debugging
        console.log("Session User Data:", {
          email: session.user.email,
          isAdmin: session.user.isAdmin,
          role: session.user.role
        });
      }
      return session;
    },
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error',
  }
};

export default NextAuth(authOptions);
