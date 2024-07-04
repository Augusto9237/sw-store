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

import { Pencil, User, UserCog } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { use, useContext, useEffect, useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getUsersTeam, updateUserTeam } from "@/actions/team"
import { AdminContext } from "@/providers/admin"
import { useSession } from "next-auth/react"
import { UserTeam } from "@prisma/client"

const defaultValues = {
    id: "",
    name: '',
    email: '',
    password: '',
    role: '',
}

export default function ModalMyAccount() {
    const { setUsersTeam, usersTeam } = useContext(AdminContext);
    const { status, data } = useSession();
    const [myUser, setMyuser] = useState<UserTeam>(defaultValues)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (data?.user) {
            const user = usersTeam.filter(item => item.email === data.user.email)
            setMyuser({
                id: user[0].id,
                name: user[0].name,
                email: user[0].email,
                password: user[0].password,
                role: user[0].role
            })
        }
    }, [isOpen])

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
        newPassword: z.optional(z.string().min(4, "Por favor, preencha o campo nova senha"))
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: myUser.name,
            email: myUser.email,
            password: myUser.password,
            role: myUser.role,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        // try {
        //     await updateUserTeam({ id: myUser.id, ...values, newPassword: values.newPassword });
        //     const { userTeam } = await getUsersTeam()
        //     setUsersTeam(userTeam)
        //     form.reset();

        //     setIsOpen(false);

        //     toast({
        //         variant: 'success',
        //         title: "✅  Usuário editado com sucesso!",
        //     })
        // } catch (error) {
        //     toast({
        //         variant: 'cancel',
        //         title: "⛔  Algo deu errado, tente novamente!",
        //     })
        // }

    }

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button variant='outline' className="w-full justify-start gap-2">
                    <UserCog size={16} />
                    Minha conta
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Editar Minha Conta</DialogTitle>
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
                                        <Select onValueChange={field.onChange} defaultValue={myUser.role}>
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
                                            <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o nome do usuário' type="text" defaultValue={myUser.name} />
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
                                            <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o e-mail do usuário' type="email" defaultValue={myUser.email} />
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
                                            <Input disabled className="placeholder:text-accent-foreground/50" placeholder='Digite a senha' type="password" value={myUser.password} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-accent-foreground">Nova senha</FormLabel>
                                        <FormControl>
                                            <Input className="placeholder:text-accent-foreground/50 opacity-30 focus:opacity-100" placeholder='Digite a nova senha' type="password" {...field} />
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
