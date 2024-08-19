'use server'
import { signIn, signOut } from "@/auth"
import { revalidatePath } from "next/cache"
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

export async function SignOutCustomer() {
    cookies().delete('role_token')
    await signOut()
}