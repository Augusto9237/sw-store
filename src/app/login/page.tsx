'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

export default function Login() {
    async function handleLoginClick() {
        await signIn('google', { callbackUrl: '/' });
    }
    
    return (
        <div className="h-full min-h-full flex justify-center items-center">
            <Card className="flex flex-col justify-center text-center w-full max-w-[428px]  p-8 gap-6">
                <h1 className="font-semibold text-lg md:text-2xl">
                    <span className="text-primary">SW</span> Store
                </h1>
                <h1 className="font-bold">Faça o login</h1>
                <Button onClick={handleLoginClick} variant='secondary' className="flex gap-2">
                    Continuar com o
                    <FcGoogle />
                </Button>
            </Card>
        </div>
    )
}
