'use client'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, useFieldArray } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

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
import { CATEGORY_ICON } from "@/constants/category-icon";
import { Pencil, Plus, X } from "lucide-react"
import { createCategory } from "@/actions/category"
import { toast } from "@/components/ui/use-toast"
import { createProduct, updateProduct } from "@/actions/products"
import { Decimal } from "@prisma/client/runtime/library"
import { Category, Product } from "@prisma/client"

interface ModalProductProps {
    categories: Category[];
    product: Product
}

export default function ModalEditProduct({ categories, product }: ModalProductProps) {

    const formSchema = z.object({
        categoryId: z.string().min(2, {
            message: "Por favor, selecione uma categoria"
        }),
        name: z.string().min(2, {
            message: "Por favor, preencha o campo nome",
        }),
        slug: z.string().min(2, {
            message: "Por favor, preencha o campo slug",
        }),
        description: z.string().min(2, {
            message: "Por favor, preencha o campo descrição",
        }),
        basePrice: z.coerce.number().min(0),
        discountPercentage: z.coerce.number().min(0),
        imageUrls: z.array(z.object({
            url: z.string().min(2, {
                message: "Por favor, preencha o campo URL",
            })
        })).min(2, {
            message: "Por favor, insira pelo menos uma URL",
        }).max(4)

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            categoryId: product.categoryId ? product.categoryId : '',
            name: product.name ? product.name : '',
            slug: product.slug ? product.slug : '',
            description: product.description ? product.description : '',
            basePrice: product.basePrice ? Number(product.basePrice) : 0,
            discountPercentage: product.discountPercentage ? Number(product.discountPercentage) : 0,
            imageUrls: product.imageUrls ? product.imageUrls.map(img => ({ url: img })) : [],
        },
    })

    const control = form.control;
    const { fields, append, remove } = useFieldArray({ control, name: 'imageUrls' })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const imagesStrings: string[] = values.imageUrls.map(img => img.url);
        try {
            await updateProduct({id: product.id, ...values, imageUrls: imagesStrings});
            form.reset();
            toast({
                variant: 'success',
                title: "✅  Produto editado com sucesso!",
            })
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }

    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='save' className='gap-2'>
                    <Pencil size={16} />
                    Editar
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-center">Editar Produto</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="categoryId"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Categoria</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecione uma categoria para o produto" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {categories.map(category => (
                                                <SelectItem key={category.id} value={category.id}>
                                                    <div className="flex items-center gap-2">
                                                        {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                                                        {category.name}
                                                    </div>
                                                </SelectItem>
                                            ))}
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
                                        <Input className="placeholder:text-accent-foreground/50" placeholder='Digite o slug do produto' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-accent-foreground">Descrição</FormLabel>
                                    <FormControl>
                                        <Input className="placeholder:text-accent-foreground/50" placeholder='Digite a descrição do produto' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex w-full gap-4">
                            <FormField
                                control={form.control}
                                name="basePrice"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-accent-foreground">Preço base</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="placeholder:text-accent-foreground/50" placeholder='Digite o preço do produto' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="discountPercentage"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-accent-foreground">Desconto %</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="placeholder:text-accent-foreground/50" placeholder='Digite o preço do produto' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <FormItem >
                            <div className="w-full flex items-center justify-between">
                                <FormLabel className="text-accent-foreground w-full">
                                    Imagem do produto
                                </FormLabel>

                                {fields.length < 4 && (
                                    <Button type='button' size='icon' variant='outline' onClick={() => append({ url: '' })}><Plus size={14} /></Button>
                                )}
                            </div>

                            {fields.map((field, index) => {

                                return (
                                    <div key={field.id} className="flex items-center justify-between w-full gap-2">
                                        <Input
                                            type='url'
                                            className="placeholder:text-accent-foreground/50"
                                            placeholder='Cole a url da imagem da categoria'
                                            {...form.register(`imageUrls.${index}.url`)}
                                            {...field}
                                        />
                                        <Button type="button" size='icon' variant='outline' onClick={() => remove(index)}>
                                            <X size={14} />
                                        </Button>
                                    </div>
                                )
                            })}
                        </FormItem>

                        <div className="flex w-full justify-center gap-5 ">
                            <Button variant='save' className="uppercase font-semibold" type="submit">Salvar</Button>


                            <DialogClose asChild>
                                <Button variant="secondary" className="uppercase font-semibold" type="reset">Cancelar</Button>
                            </DialogClose>
                        </div>
                    </form>
                </Form>

            </DialogContent>
        </Dialog>

    )
}
