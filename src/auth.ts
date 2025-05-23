import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from "./dbConfig";

import bcrypt from "bcryptjs";
import User from "./model/userModel";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@example.com",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      authorize: async (credentials) => {
        await connectDB();

        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;

        if (!email || !password) {
          throw new Error("Missing credentials");
        }

        // Find user in database
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User not found");
        }

        // Compare password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        // Return user object
        return {
          id: user._id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    signIn: async ({ user, account }) => {
      try {
        if (account?.provider === "google") {
          const { email, name, image, id } = user;
          await connectDB();
          const userExists = await User.findOne({ email });
          if (userExists) {
            return true;
          } else {
            await User.create({ googleId: id, email, name, image });
            return true;
          }
        }
        if (account?.provider === "credentials") {
          return true;
        }
        return false;
      } catch (error) {
        throw new Error("Error during sign in");
        console.log(error);
      }
    },
  },
});