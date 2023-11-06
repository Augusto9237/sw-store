"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
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
import { createCategory } from "@/actions/category"

const formSchema = z.object({
    name: z.string().min(2, {
        message: "Por favor! Digite o nome da categoria",
    }),
    slug: z.string().min(2, {
        message: "Por favor! Digite o slug da categoria",
    }),
    imageUrl: z.string().min(2, {
        message: "Por favor! Cole uma url valida da imagem da categoria",
    }),

})

export function FormCategory() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            slug: "",
            imageUrl:"",
        },
    })

   async function onSubmit(values: z.infer<typeof formSchema>) {
        await createCategory(values)
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nome da categoria</FormLabel>
                            <FormControl>
                                <Input placeholder='Digite o nome da categoria' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>     
                    )}
                />
                <FormField
                    control={form.control}
                    name="slug"
                    render={({ field }) => (
                        <FormItem className="text-">
                            <FormLabel>Slug da categoria</FormLabel>
                            <FormControl>
                                <Input placeholder='Digite o slug da categoria' {...field} />
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
                            <FormLabel>Imagem da categoria</FormLabel>
                            <FormControl>
                                <Input placeholder='Cole a url da imagem da categoria' {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button variant="secondary" type="submit">Salvar</Button>
            </form>
        </Form>
    )
}
