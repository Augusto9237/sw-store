'use client'
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import ProductList from "@/components/ui/product-list";
import { AdminContext } from "@/providers/admin";
import Image from "next/image";
import { useContext, useState } from "react";
import { deleteCategory } from "@/actions/category";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import ModalEditProduct from "./modal-edit-product";
import ProductImages from "@/app/(public)/product/[slug]/components/product-images";

export default function ProductInfo() {
    const { productSelected, products } = useContext(AdminContext)

    const product = products.find(product => product.id === productSelected?.id);

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
            {product ?
                <>
                    <CardHeader>
                        <h2 className='text-lg font-bold leading-none text-center'>Produto</h2>
                    </CardHeader>

                    <CardContent className="flex gap-8 max-sm:flex-col max-md:flex-row lg:flex-col justify-between ">
                       
                            <ProductImages imagesUrls={product?.imageUrls!} name={product?.name!} />
                  
                        {/* <div className="flex flex-col w-full">
                            <h2 className="font-semibold">Informações da categoria</h2>
                            <p className="text-sm">Nome: {category?.name}</p>
                            <p className="text-sm">Slug: {category?.slug}</p>
                        </div> */}
                    </CardContent>

                    <div className="flex flex-col gap-2 mb-8 flex-1">
                        <h2 className="font-semibold pl-5">Produtos relacionados</h2>
                        <div className="lg:pl-5">
                       
                        </div>
                    </div>

                    <CardFooter className="gap-4">
                        {/* <ModalEditProduct/> */}
                        {/* <Button variant='outline' className="w-full flex gap-2" onClick={() => handleDelete(categorySelected.id)}>
                            <Trash2 size={16} />
                            <span>
                                Excluir
                            </span>
                        </Button> */}
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