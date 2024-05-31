'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useState } from "react"
import { signIn } from "next-auth/react"
import { toast } from "@/components/ui/use-toast"
import Spinner from "@/components/spinner"
import { useRouter } from "next/navigation"


export default function FormLogin() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const router = useRouter();

    const formSchema = z.object({
        email: z.string().min(2, {
            message: "Por favor, preencha o campo e-mail",
        }),
        password: z.string().min(2, {
            message: "Por favor, preencha o campo senha",
        }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true);
        try {
            await signIn<"credentials">("credentials", {
                email: values.email,
                password: values.password,
                redirect: true,
                callbackUrl: '/dashboard'
            });
            setIsLoading(false);
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 text-left">
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="text-accent-foreground">E-mail</FormLabel>
                            <FormControl>
                                <Input type="email" className="placeholder:text-accent-foreground/50" placeholder='Digite o seu e-mail' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem >
                            <FormLabel className="text-accent-foreground">Senha</FormLabel>
                            <FormControl>
                                <Input type="password" className="placeholder:text-accent-foreground/50" placeholder='Digite a sua senha' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="flex flex-col w-full justify-center gap-4 ">
                    <Button variant='save' className="uppercase font-semibold" type="submit">
                        {isLoading ? <Spinner /> : 'Entrar'}
                    </Button>
                    <Button variant="secondary" onClick={() => router.push('/')} className="uppercase font-semibold" type="reset">Cancelar</Button>
                </div>
            </form>
        </Form>
    )
}
