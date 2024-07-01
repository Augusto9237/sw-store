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

import { ImagePlus, Plus } from "lucide-react"
import { createCategory } from "@/actions/category"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { Progress } from "@/components/ui/progress"

export default function ModalAddImage() {
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
            name: "",
            slug: "",
            imageUrl: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            await createCategory(values);
            form.reset();

            setIsOpen(false);

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
                <Button type='button' size='icon' variant='outline'>
                    <ImagePlus size={16} />
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent className="max-w-[360px] w-full">
                    <DialogHeader>
                        <DialogTitle className="text-center">Adicionar Imagem</DialogTitle>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="w-full h-[260px]">
                                <img src="https://cdn.pixabay.com/photo/2012/04/11/11/32/box-27581_640.png" alt="" className="w-full h-full" />
                                <Progress value={33} />
                            </div>
                            <FormField
                                control={form.control}
                                name="imageUrl"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-accent-foreground">Anexar imagem do produto</FormLabel>
                                        <FormControl>
                                            <Input type="file" className="placeholder:text-accent-foreground/50" placeholder='Digite ou cole a url da imagem da categoria' {...field} />
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
