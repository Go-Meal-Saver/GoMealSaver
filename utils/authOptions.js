import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  providers: [
    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),

    // Credentials Provider
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // Validate input
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required');
        }

        // Connect to database
        await connectDB();

        // Find user
        const user = await User.findOne({ email: credentials.email });
        if (!user) {
          throw new Error('No user found with this email');
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error('Invalid password');
        }

        // Return user object
        return {
          id: user._id.toString(),
          email: user.email,
          username: user.username,
          image: user.image,
        };
      },
    }),
  ],

  // Callbacks
  callbacks: {
    // Handle sign-in (especially for OAuth)
    async signIn({ account, profile }) {
      try {
        await connectDB();

        // Handle Google OAuth sign-in
        if (account.provider === 'google') {
          const userExists = await User.findOne({ email: profile.email });

          // Create user if not exists
          if (!userExists) {
            const username = profile.name
              .slice(0, 20)
              .toLowerCase()
              .replace(/\s/g, '');
            await User.create({
              email: profile.email,
              username: username,
              image: profile.picture,
            });
          }
        }
        return true;
      } catch (error) {
        console.error('Error in signIn callback:', error);
        return false;
      }
    },

    // Modify session to include additional user info
    async session({ session, token }) {
      try {
        await connectDB();

        // Find user and add additional details to session
        const user = await User.findOne({ email: session.user.email });
        if (user) {
          session.user.id = user._id.toString();
          session.user.username = user.username;
          session.user.image = user.image;
        }
        return session;
      } catch (error) {
        console.error('Error in session callback:', error);
        return session;
      }
    },

    // JWT callback
    async jwt({ token, user, account, profile }) {
      // Add user ID to token
      if (user) {
        token.id = user.id;
        token.username = user.username;
      }
      return token;
    },
  },

  // Session strategy
  session: {
    strategy: 'jwt',
  },

  // Custom pages
  pages: {
    signIn: '/', // Redirect to home page for sign-in
  },
};
