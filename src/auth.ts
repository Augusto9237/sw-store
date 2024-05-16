import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import { prismaClient } from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"

export const { auth, handlers, signIn, signOut } = NextAuth({
    adapter: PrismaAdapter(prismaClient),
    providers: [Credentials({
        credentials: {
            email: {},
            password: {}
        },
        authorize(credentials) {
            console.log(credentials)

            if (credentials.password === "1234" ) {
                return { id: "1", name: "teste", email: "august@test.com", image: "" }
            } else {
                return null;
            }
        }
    })],
})