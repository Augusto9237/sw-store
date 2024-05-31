'use server'
import { signIn } from "@/auth"
import { redirect } from "next/navigation"

export default async function AuthAdmin(formData: FormData) {
    const email = formData.get('email')
    const password = formData.get('password')

    await signIn('credentials', { email: email as string, password: password as string, redirect: true, redirectTo: '/dashboard' })
    return redirect('/dashboard')
}