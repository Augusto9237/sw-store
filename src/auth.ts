import { PrismaAdapter } from "@auth/prisma-adapter"
import NextAuth from "next-auth"
import { prismaClient } from "./lib/prisma"
import Credentials from "next-auth/providers/credentials"
import { compareSync } from "bcrypt-ts"
export const { auth, handlers, signIn, signOut } = NextAuth({
    providers: [Credentials({
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

            // return user object with the their profile data
            return {
                id: user.id, name: user.name, email: user.email, role: user.role
            }
        }
    })],
})