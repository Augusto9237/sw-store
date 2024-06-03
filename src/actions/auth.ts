'use server'
import { signIn, signOut } from "@/auth"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

export default async function AuthAdmin(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    await signIn('credentials', { email: email as string, password: password as string, redirect: true, redirectTo: '/dashboard' })
    return redirect('/dashboard')
}

export async function SignOutAdmin() {
    cookies().delete('role_token')
    await signOut()
}