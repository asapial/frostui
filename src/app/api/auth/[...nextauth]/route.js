import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("Incoming credentials:", credentials);

          // 1️⃣ Connect to DB & find user
          const collection = await dbConnect("userCollection");
          const userData = await collection.findOne({ email: credentials.email });
          console.log("Found user:", userData);

          if (!userData) {
            console.warn("❌ No user found with this email");
            return null;
          }

          // 2️⃣ Compare hashed password
          const isValid = await bcrypt.compare(
            credentials.password,
            userData.password
          );
          console.log("Password valid:", isValid);

          if (!isValid) {
            console.warn("❌ Incorrect password");
            return null;
          }

          // 3️⃣ Return safe user object
          return {
            id: userData._id.toString(),
            name: userData.name,
            email: userData.email,
            phone: userData.phone,
            age: userData.age,
            gender: userData.gender,
            country: userData.country,
            dob: userData.dob,
            photo: userData.photo,
            role: userData.role,
            status: userData.status,
            provider: userData.provider,
            isProfileOk: userData.isProfileOk,
            isProfileOk: userData.isProfileOk,
            createdAt: userData.createdAt


          };
        } catch (err) {
          console.error("Error in authorize:", err);
          return null;
        }
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      try {
        if (account.provider === "google") {
          const collection = await dbConnect("userCollection");
          const existingUser = await collection.findOne({ email: user.email });

          if (!existingUser) {
            console.log("📌 Creating new Google user");
            await collection.insertOne({


            name: user.name,
            email: user.email,
            phone: '',
            age: '',
            gender: '',
            country: '',
            dob: '',
            photo: user.image,
            role: "user",
            status: "active",
            provider:  "google",
            isProfileOk: false, 
            createdAt: new Date(),

            });
          }
        }
        return true;
      } catch (err) {
        console.error("Error in signIn callback:", err);
        return false;
      }
    },

    async session({ session }) {
      try {
        const collection = await dbConnect("userCollection");
        const dbUser = await collection.findOne({ email: session.user.email });

        if (dbUser) {
          session.user.id = dbUser._id.toString();
          session.user.name = dbUser.name;
          session.user.email = dbUser.email;
          session.user.phone = dbUser.phone;
          session.user.gender = dbUser.gender;
          session.user.country = dbUser.country;
          session.user.dob = dbUser.dob;
          session.user.photo = dbUser.photo;
          session.user.role = dbUser.role;
          session.user.status = dbUser.status;
          session.user.createdAt = dbUser.createdAt;
          session.user.provider = dbUser.provider;
          session.user.isProfileOk = dbUser.isProfileOk;
          session.user.age = dbUser.age;
        }
        return session;
      } catch (err) {
        console.error("Error in session callback:", err);
        return session;
      }
    },
  },

  pages: {
    signIn: "/auth/signin",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
