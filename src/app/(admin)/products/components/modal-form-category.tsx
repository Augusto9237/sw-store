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
import { createCategory, getCategories, updateCategory } from "@/actions/category"
import { toast } from "@/components/ui/use-toast"
import { useContext, useState } from "react"
import ModalAddImage from "./modal-add-image"
import { Category } from "@prisma/client"
import { AdminContext } from "@/providers/admin"

interface ModalEditCategoryProps {
    category?: Category
}

export default function ModalFormCategory({ category }: ModalEditCategoryProps) {
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
            name: category ? category.name : "",
            slug: category ? category.slug : "",
            imageUrl: category ? category.imageUrl : "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            if (category) {
                await updateCategory({ id: category.id, ...values });
                const { categories } = await getCategories()

                form.reset();
                setCategories(categories)
                setIsOpen(false)

                toast({
                    variant: 'success',
                    title: "✅  Categoria atualizada com sucesso!",
                })
            }

            await createCategory(values);
            const { categories } = await getCategories()

            form.reset();
            setCategories(categories)
            setIsOpen(false)

            toast({
                variant: 'success',
                title: "✅  Categoria criada com sucesso!",
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
                {category ?
                    (
                        <Button variant='save' size='icon' className="h-8 w-8" onClick={() => setIsOpen(true)}>
                            <Pencil size={16} />
                        </Button>
                    )
                    :
                    (
                        <Button className="uppercase font-bold flex items-center gap-2">
                            <Plus size={16} />
                            <span className="max-md:hidden">
                                Categoria
                            </span>
                        </Button>
                    )}
            </DialogTrigger>

            {
                isOpen && (
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="text-center">{category ? "Editar" : "Adicionar"} categoria</DialogTitle>
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
