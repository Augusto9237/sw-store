'use server'
import { signIn } from "@/auth"
import { AuthError } from "next-auth";

export default async function Auth(email: string, password: string) {
    try {
        await signIn('credentials', { email: email!, password: password! })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { msg: "Invalid credentials", status: "error" };
                case "CredentialsSignin":
                    throw error;
                default:
                    return { msg: "Something went wrong", status: "error" };
            }
        }
    }

}