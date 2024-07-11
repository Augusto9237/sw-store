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
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CATEGORY_ICON } from "@/constants/category-icon";
import { Pencil, Plus, Trash2 } from "lucide-react"
import { toast } from "@/components/ui/use-toast"
import { getProducts, updateProduct } from "@/actions/products"
import { useContext, useEffect, useState } from "react"
import { AdminContext } from "@/providers/admin"
import { Textarea } from "@/components/ui/textarea"
import ModalAddImage from "./modal-add-image"

interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    stock: number;
    basePrice: number;
    imageUrls: string[];
    categoryId: string;
    discountPercentage: number;
}

interface ModalProductProps {
    product: Product;
    setTotalLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const defaultValues = {
    id: "",
    categoryId: "",
    name: "",
    slug: "",
    description: "",
    stock: 0,
    basePrice: 0,
    discountPercentage: 0,
    imageUrls: [],
}

export default function ModalEditProduct({ product, setTotalLoading }: ModalProductProps) {
    const { categories, setProducts, } = useContext(AdminContext)
    const [formData, setFormData] = useState<Product>(defaultValues)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        setFormData(product)
    }, [product])

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
        stock: z.coerce.number().min(0, {
            message: "Por favor, preencha o campo estoque corretamente",
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
        values: {
            categoryId: formData?.categoryId!,
            name: formData?.name!,
            slug: formData?.slug!,
            description: formData?.description!,
            stock: Number(formData?.stock),
            basePrice: Number(formData?.basePrice),
            discountPercentage: Number(formData?.discountPercentage),
            imageUrls: formData?.imageUrls.map(img => ({ url: img })),
        },
    })

    const control = form.control;
    const { fields, append, remove } = useFieldArray({ control, name: 'imageUrls' })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const imagesStrings: string[] = values.imageUrls.map(img => img.url);
        try {
            await updateProduct({ id: product.id, ...values, imageUrls: imagesStrings });
            const { products } = await getProducts('', 18);

            form.reset();
            setProducts(products);
            setIsOpen(false);
            setTotalLoading(false)

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
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button variant='save' className='gap-2 w-full' >
                    <Pencil size={16} />
                    Editar
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Editar produto</DialogTitle>
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
                                            <Textarea className="placeholder:text-accent-foreground/50" placeholder='Digite a descrição do produto' {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="stock"
                                render={({ field }) => (
                                    <FormItem className="w-full">
                                        <FormLabel className="text-accent-foreground">Estoque</FormLabel>
                                        <FormControl>
                                            <Input type="number" className="placeholder:text-accent-foreground/50" placeholder='Digite a quantidade em estoque do produto' {...field} />
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
                                <FormLabel className="text-accent-foreground w-full">
                                    Imagem do produto
                                </FormLabel>


                                <div className="grid grid-cols-2 gap-4">
                                    {fields.map((field, index) => {
                                        const currentValues = form.getValues('imageUrls');
                                        const updatedValues = [...currentValues];

                                        return (
                                            <div key={field.id} className="flex items-center justify-between w-full gap-1">
                                                <ModalAddImage index={index} updatedValues={updatedValues} setValueImageProducts={form.setValue} />
                                                <Input
                                                    type='url'
                                                    disabled
                                                    className="placeholder:text-accent-foreground/50"
                                                    placeholder='Adicione uma imagem do produto para carregar a URL'
                                                    {...form.register(`imageUrls.${index}.url`)}
                                                    {...field}
                                                />
                                                <Button type="button" size='icon' variant='outline' className="w-12" onClick={() => remove(index)}>
                                                    <Trash2 size={16} />
                                                </Button>
                                            </div>
                                        )
                                    })}
                                    {fields.length < 4 && (
                                        <Button type='button' variant='outline' className="flex items-center gap-2" onClick={() => append({ url: '' })}>
                                            <Plus size={14} />
                                            Imagem {fields.length + 1}
                                        </Button>
                                    )}
                                </div>
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
            )}
        </Dialog>

    )
}
