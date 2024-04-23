import { PrismaAdapter } from "@auth/prisma-adapter";
import { prismaClient } from "./prisma";
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismaClient),
    providers: [
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'email' },
                password: { label: 'password', type: 'password' },
            },

            async authorize(credentials, req) {
                const user = await prismaClient.userTeam.findFirst({
                    where: {
                        email: credentials?.email,
                    }
                })

                if (!user) {
                    return null
                }

                if (user.password !== credentials?.password) {
                    return null
                }

                return user
            },
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            session.user = { ...session.user, id: user.id } as {
                id: string;
                name: string;
                email: string;
            };

            return session;
        }
    },
    pages: {
        signIn: "/login",
    }
}