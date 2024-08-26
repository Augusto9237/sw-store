"use client"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "./ui/button";
import { FcGoogle } from "react-icons/fc";
import { signIn } from "next-auth/react";
import { LogInIcon } from "lucide-react";

interface LoginCustomerProps {
    justify?: string
}
export default function LoginCustomer({justify}: LoginCustomerProps) {
    async function handleLoginClick() {
        await signIn('google', { callbackUrl: '/' });
    }
    return (
        <Dialog>
            <DialogTrigger asChild >
                <Button variant='outline' className={justify ? `w-full justify-start gap-2 ${justify}` : "w-full justify-start gap-2"}>
                    <LogInIcon size={16} />
                    Fazer Login
                </Button>
            </DialogTrigger>
            <DialogContent className="w-full overflow-hidden flex flex-col items-center gap-4 max-w-sm">
                <DialogHeader>
                    <DialogTitle className="font-semibold text-lg md:text-2xl">
                        <span className="text-primary">SW</span> Store
                    </DialogTitle>
                </DialogHeader>

                <h1 className="font-bold">Faça o login</h1>
                <Button onClick={handleLoginClick} variant='secondary' className="flex gap-2 w-full">
                    <FcGoogle />
                    Continuar com o Google
                </Button>
            </DialogContent>
        </Dialog >
    )
}
