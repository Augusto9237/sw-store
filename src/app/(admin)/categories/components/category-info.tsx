'use client'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ProductList from "@/components/ui/product-list";
import { AdminContext } from "@/providers/admin";
import Image from "next/image";
import { useContext } from "react";
import ModalFormCategory from "./modal-form-category";
import { deleteCategory } from "@/actions/category";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function CategoryInfo() {
    const { products, categorySelected } = useContext(AdminContext)

    const relatedProducts = categorySelected ? products.filter(product => product.categoryId === categorySelected?.id) : [];

    async function handleDelete(id: string) {

        try {
            await deleteCategory(id)
            toast({
                variant: "cancel",
                title: "🗑️ Categoria deletada",
            })
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }

    return (
        <Card className="w-full h-full overflow-hidden max-sm:min-h-[420px]">
            {categorySelected ?
                <>
                    <CardHeader>
                        <h2 className='text-lg font-bold leading-none text-center'>Categoria</h2>
                    </CardHeader>

                    <CardContent className="flex gap-8 max-sm:flex-col max-md:flex-row lg:flex-col justify-between ">
                        <div className="flex w-full h-[150px] md:min-h-[185px] items-center justify-center rounded-lg  bg-gradient-to-tr from-indigo-700 to-indigo-950">
                            <Image
                                src={categorySelected.imageUrl}
                                alt=''
                                width={0}
                                height={0}
                                sizes="100vw"
                                className="h-[90px] max-h-[70%] w-auto max-w-[80%]"
                                style={{
                                    objectFit: 'contain'
                                }}
                            />
                        </div>
                        <div className="flex flex-col w-full">
                            <h2 className="font-semibold">Informações da categoria</h2>
                            <p className="text-sm">Nome: {categorySelected.name}</p>
                            <p className="text-sm">Slug: {categorySelected.slug}</p>
                        </div>
                    </CardContent>

                    <div className="flex flex-col gap-2 mb-8 flex-1">
                        <h2 className="font-semibold pl-5">Produtos relacionados</h2>
                        <div className="lg:pl-5">
                            <ProductList products={relatedProducts} />
                        </div>
                    </div>

                    <CardFooter className="gap-4">
                        <ModalFormCategory category={categorySelected} />
                        <Button variant='outline' className="w-full flex gap-2" onClick={() => handleDelete(categorySelected.id)}>
                            <Trash2 size={16} />
                            <span>
                                Excluir
                            </span>
                        </Button>
                    </CardFooter>
                </>
                :
                <>
                    <CardContent className="flex items-center justify-center flex-1 h-full">
                        <h1>
                            Nenhuma categoria selecionada
                        </h1>
                    </CardContent>
                </>}
        </Card>
    )
}