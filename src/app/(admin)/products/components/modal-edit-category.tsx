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
import { getCategories, updateCategory } from "@/actions/category"
import { toast } from "@/components/ui/use-toast"
import { Category } from "@prisma/client"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "@/providers/admin"

interface ModalEditCategoryProps {
    category: Category
}

export default function ModalEditCategory({ category }: ModalEditCategoryProps) {
    const { setCategories } = useContext(AdminContext)
    const [formData, setFormData] = useState<Category>()
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        setFormData(category)
    }, [category])


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
        values: {
            name: formData?.name!,
            slug: formData?.slug!,
            imageUrl: formData?.imageUrl!,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await updateCategory({ id: category.id, ...values });
            const { categories } = await getCategories()

            form.reset();
            setCategories(categories)
            setIsOpen(false)

            toast({
                variant: 'success',
                title: "✅  Categoria atualizada com sucesso!",
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
            <DialogTrigger asChild>
                <Button variant='save' size='icon' className="h-8 w-8" onClick={() => setIsOpen(true)}>
                    <Pencil size={16} />
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Editar Categoria</DialogTitle>
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
                                            <Input type='url' className="placeholder:text-accent-foreground/50" placeholder='Cole a url da imagem da categoria' {...field} />
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
