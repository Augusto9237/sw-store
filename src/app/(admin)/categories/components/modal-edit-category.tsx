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

import { Pencil } from "lucide-react"
import { getCategories, updateCategory } from "@/actions/category"
import { toast } from "@/components/ui/use-toast"
import { useContext, useEffect, useState } from "react"
import { Category } from "@prisma/client"
import { AdminContext } from "@/providers/admin"
import ModalAddImage from "./modal-add-image"
import { deleteImage } from "@/actions/images"

interface ModalEditProps {
    category: Category
}


export default function ModalFormEditCategory({ category }: ModalEditProps) {
    const { setCategories } = useContext(AdminContext)
    const [isOpen, setIsOpen] = useState(false);

    const formSchema = z.object({
        name: z.string().min(2, {
            message: "Por favor, preencha o campo nome",
        }),
        slug: z.string().min(2, {
            message: "Por favor, preencha o campo slug",
        }),
        imageUrl: z.string().min(2, {
            message: "Por favor, preencha o campo com a url da imagem",
        }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: category?.name!,
            slug: category?.slug!,
            imageUrl: category?.imageUrl!
        },
    })

    useEffect(() => {
        if (category) {
            form.setValue("name", category.name)
            form.setValue("slug", category.slug)
            form.setValue("imageUrl", category.imageUrl)
        }
    }, [category, isOpen])

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (values.name !== category?.name || values.slug !== category.slug || values.imageUrl !== category.imageUrl) {
                await updateCategory({ id: category?.id, ...values });
                const { categories } = await getCategories()

                form.reset();
                setCategories(categories)
                setIsOpen(false)

                toast({
                    variant: 'success',
                    title: "✅  Categoria atualizada com sucesso!",
                })
            }
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }

    }


    async function handleCancel() {
        const url = form.getValues('imageUrl');

        if (url !== category.imageUrl) {
            await deleteImage(url);
        }

        form.reset();
    }

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button variant='save' className="flex gap-2 w-full" onClick={() => setIsOpen(true)}>
                    <Pencil size={16} />
                    <span >
                        Editar
                    </span>
                </Button>
            </DialogTrigger>

            {
                isOpen && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">Editar categoria</DialogTitle>
                        </DialogHeader>

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-accent-foreground">Nome</FormLabel>
                                            <FormControl>
                                                <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o nome da categoria' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="slug"
                                    render={({ field }) => (
                                        <FormItem >
                                            <FormLabel className="text-accent-foreground">Slug</FormLabel>
                                            <FormControl>
                                                <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o slug da categoria' {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="imageUrl"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel className="text-accent-foreground">Imagem da categoria</FormLabel>
                                            <FormControl>
                                                <div className="flex gap-2">
                                                    <ModalAddImage setValueImageCategories={form.setValue} />
                                                    <Input
                                                        type='url'
                                                        disabled={true}
                                                        className="placeholder:text-accent-foreground/50"
                                                        placeholder='Digite ou cole a url da imagem da categoria'
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
                                        <Button onClick={handleCancel} variant="secondary" className="uppercase font-semibold" type="reset">Cancelar</Button>
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
