import NextAuth from "next-auth"
import { prismaClient } from "./lib/prisma"
import { PrismaAdapter } from "@auth/prisma-adapter"
import Credentials from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import { compareSync, hashSync } from "bcrypt-ts"
import { cookies } from "next/headers"


export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prismaClient),
    session: { strategy: "jwt" },
    providers: [
        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials) {
                const email = credentials.email as string
                const password = credentials.password as string

                if (!email || !password) {
                    return null
                }

                const user = await prismaClient.userTeam.findUnique({
                    where: {
                        email: email
                    }
                });

                if (!user) {
                    return null
                }

                const matches = compareSync(password, user.password ?? '')


                if (!matches) {
                    throw new Error("User not found.")
                }

                await cookies().set({ name: "role_token", value: hashSync(user.role)})
                return {
                    id: user.id, name: user.name, email: user.email, role: user.role
                }
            }
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code",
                },
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }) {

            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            session.user.id = token.id as string
            return session
        },
    },
    pages: {
        signIn: "/login",
    },
})


