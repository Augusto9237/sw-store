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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Pencil, Plus } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { useContext, useState } from "react"
import { createBanner, updateBanner } from "@/actions/banner"
import ModalAddImage from "./modal-add-image"
import { Banner } from "@prisma/client"

interface ModalFormEditBannerProps {
    banner: Banner
}

export default function ModalFormEditBanner({ banner }: ModalFormEditBannerProps) {
    const [isOpen, setIsOpen] = useState(false);
    const formSchema = z.object({
        title: z.string().min(2, {
            message: "Por favor, preencha o campo titulo",
        }),
        link: z.string().min(2, {
            message: "Por favor, preencha o campo link",
        }),
        image: z.string().min(2, {
            message: "Por favor, preencha o campo com a url da imagem",
        }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: banner.title,
            link: banner.link,
            image: banner.image,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateBanner({ id: banner.id, ...values });

            form.reset();
            setIsOpen(false)

            toast({
                variant: 'success',
                title: "✅  Banner editado com sucesso!",
            })
        } catch (error) {
            console.log(error)
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }

    }

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button variant='save' className="flex gap-2" onClick={() => setIsOpen(true)}>
                    <Pencil size={16} />
                    <span className="max-sm:hidden" >
                        Editar
                    </span>
                </Button>
            </DialogTrigger>

            {
                isOpen && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Editar Banner</DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="title"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-accent-foreground">Título</FormLabel>
                                            <FormControl>
                                                <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o título do banner' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="link"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel className="text-accent-foreground">Link</FormLabel>
                                            <FormControl>
                                                <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o link do banner' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-accent-foreground">Imagem do banner</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    <ModalAddImage setValue={form.setValue} />
                                                    <Input
                                                        type='url'
                                                        disabled={true}
                                                        className="placeholder:text-accent-foreground/50"
                                                        placeholder='Digite ou cole a url da imagem do banner'
                                                        {...field}
                                                    />
                                                </div>
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
                )
            }
        </Dialog >

    )
}
