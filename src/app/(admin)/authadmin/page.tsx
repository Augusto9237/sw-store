'use client'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { signIn } from "next-auth/react";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

export default function AuthAdmin() {
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
            password: ""
        },
    })

    async function onSubmit(event: React.SyntheticEvent) {
        event.preventDefault();

        await signIn("credentials", {
            email: form.getValues('email'),
            password: form.getValues('password'),
            callbackUrl: '/dashboard',
        });
    }

    return (
        <div className="h-full min-h-full flex justify-center items-center absolute inset-0 bg-background/70 backdrop-blur-md">
            <Card className="flex flex-col justify-center text-center w-full max-w-[428px]  p-8 gap-6">
                <h1 className="font-semibold text-lg md:text-2xl">
                    <span className="text-primary">SW</span> Store
                </h1>
                <h1 className="font-bold">Faça o login de membros</h1>

                <Form {...form}>
                    <form
                        onSubmit={onSubmit}
                        className="space-y-8 text-left">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-accent-foreground">E-mail</FormLabel>
                                    <FormControl>
                                        <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o seu e-mail' {...field} type="email" />
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
                                        <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o sua senha' {...field} type="password" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex w-full justify-center gap-5 ">
                            <Button variant='save' className="uppercase font-semibold" type="submit">Entrar</Button>
                            <Button variant="secondary" className="uppercase font-semibold" type="reset">Cancelar</Button>
                        </div>
                    </form>
                </Form>
            </Card>
        </div>
    )
}