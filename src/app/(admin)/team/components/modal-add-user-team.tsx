'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createUserTeam } from "@/actions/team"

export default function ModalAddUserTeam() {
    const [isOpen, setIsOpen] = useState(false);
    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Por favor, preencha o campo nome",
        }),
        email: z.string().min(2, {
            message: "Por favor, preencha o campo e-mail",
        }),
        password: z.string().min(2, {
            message: "Por favor, preencha o campo senha",
        }),
        role: z.string().min(2, {
            message: "Por favor, preencha o campo cargo",
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            role: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createUserTeam(values);
            form.reset();

            setIsOpen(false);

            toast({
                variant: 'success',
                title: "✅  Usuário criado com sucesso!",
            })
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }

    }

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button className="uppercase font-bold flex items-center gap-2">
                    <Plus size={16} />
                    <span className="max-sm:hidden">
                        Usuário
                    </span>
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Adicionar usuário</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8">
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Cargo</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Selecione o cargo do usuário" />
                                                </SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="admin">
                                                    <div className="flex items-center gap-2">
                                                        Administrador
                                                    </div>
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-accent-foreground">Nome</FormLabel>
                                        <FormControl>
                                            <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o nome do usuário' type="text" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem >
                                        <FormLabel className="text-accent-foreground">E-mail</FormLabel>
                                        <FormControl>
                                            <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o e-mail do usuário' type="email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-accent-foreground">Senha</FormLabel>
                                        <FormControl>
                                            <Input className="placeholder:text-accent-foreground/50" placeholder='Digite a senha' type="password" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div className="flex w-full justify-center gap-5 ">
                                <Button variant='save' className="uppercase font-semibold" type="submit">Salvar</Button>

                                <DialogClose asChild>
                                    <Button variant="secondary" className="uppercase font-semibold" type="reset">Cancelar</Button>
                                </DialogClose>
                            </div>
                        </form>
                    </Form>

                </DialogContent>
            )}
        </Dialog>

    )
}
