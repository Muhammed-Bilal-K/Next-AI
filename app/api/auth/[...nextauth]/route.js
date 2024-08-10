import NextAuth from "next-auth";
import GoogleProvider from 'next-auth/providers/google';

import { connectToDB } from "@utils/database";
import User from "@models/user";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    callbacks: {

        async session({ session }) {
            // store the user's id coming from mongodb to session
            const sessionUser = await User.findOne({ email: session.user.email });
            session.user.id = sessionUser._id.toString();

            return session;
        },

        async signIn({ profile }) {
            try {
                //serverless -> lambda -> dynamodb
                await connectToDB();

                //check if a user already exists
                const userExists = await User.findOne({ email: profile.email });
                //if not, create a new user

                const generateUsername = (name) => {
                    let username = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase(); 
                    username = username.slice(0, 20); 
                
                    if (username.length < 3) {
                        username = username.padEnd(3, '0'); 
                    }
                
                    return username;
                };


                if (!userExists) {
                    const newUsername = generateUsername(profile.name);

                    await User.create({
                        email: profile.email,
                        username: newUsername,
                        image: profile.picture,
                    });
                }

                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
})

export { handler as GET, handler as POST };