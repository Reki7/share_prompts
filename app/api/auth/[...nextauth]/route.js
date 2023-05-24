import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers';
import { connectToDB } from '@utils/database';
import User from '@models/user';
// const NextAuth = require("next-auth");

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  async session({session}) {},
  async signIn({profile}) {
    try {
      await connectToDB();
      // check if a user already exists
      const userExists = await User.findOne({
        email: profile.email,
      });

      // if not, create a new user
      await User.create({
        email: profile.email,
        username: profile.username.replace(' ', '').toLowerCase(),
        image: profile.picture,
      })
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  },
});

export { handler as GET, handler as POST }
