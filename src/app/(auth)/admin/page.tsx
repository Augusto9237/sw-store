import { Card } from "@/components/ui/card"
import FormLogin from "./components/FormLogin"
import Link from "next/link"
import Logo from "@/components/logo"

export default function Admin() {
    return (
        <div className="h-full min-h-full flex flex-col gap-2 justify-center items-center absolute inset-0 bg-background/70 backdrop-blur-md">
            <Card className="flex flex-col justify-center text-center w-full max-w-[428px]  p-8 gap-2">
                <div className="flex flex-col justify-center items-center gap-4">
                    <Logo />
                    <h1 className="font-bold">Acesso restrito</h1>
                </div>

                <FormLogin />
            </Card >
            <span >Não possui acesso? <Link href="/" className="font-semibold text-primary">Voltar para loja</Link></span>
        </div>
    )
}