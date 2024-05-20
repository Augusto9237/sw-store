import { signIn } from "@/auth"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export default function AuthAdmin() {
    return (
        <div className="h-full min-h-full flex justify-center items-center absolute inset-0 bg-background/70 backdrop-blur-md">
            <Card className="flex flex-col justify-center text-center w-full max-w-[428px]  p-8 gap-6">
                <h1 className="font-semibold text-lg md:text-2xl">
                    <span className="text-primary">SW</span> Store
                </h1>
                <h1 className="font-bold">Faça o login</h1>

                <form
                    action={async (formData) => {
                        "use server"
                        try {
                            await signIn("credentials", formData)
                        } catch (error) {
                            console.log(error)
                        }
                    }}
                >
                    <div className="flex-col text-start w-full gap-4">
                        <label className="text-left justify-start">
                            E-mail
                        </label>

                        <Input
                            className="w-full bg-accent shadow-none appearance-none"
                            name="email"
                            type='email'
                        />



                        <label className="text-left justify-start">
                            Senha
                        </label>

                        <Input
                            className="w-full bg-accent shadow-none appearance-none"
                            name="password"
                            type='password'
                        />
                    </div>

                    <div className="flex items-center gap-4 justify-center w-full pt-4">
                        <Button variant='secondary' className="uppercase font-semibold">
                            Entrar
                        </Button>
                        <Button variant="secondary" className="uppercase font-semibold" type="reset">
                            Cancelar
                        </Button>
                    </div>
                </form>
            </Card >
        </div>
    )
}