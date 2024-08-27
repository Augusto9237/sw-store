import AuthAdmin from "@/actions/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import FormLogin from "./components/FormLogin"

export default function Admin() {
    return (
        <div className="h-full min-h-full flex justify-center items-center absolute inset-0 bg-background/70 backdrop-blur-md">
            <Card className="flex flex-col justify-center text-center w-full max-w-[428px]  p-8 gap-2">
                <h1 className="font-semibold text-lg md:text-2xl">
                    <span className="text-primary">Auto</span> Tech
                </h1>
                <h1 className="font-bold">Acesso restrito</h1>

                <FormLogin/>
            </Card >
        </div>
    )
}