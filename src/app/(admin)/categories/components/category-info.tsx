'use client'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import ProductList from "@/components/ui/product-list";
import { AdminContext } from "@/providers/admin";
import Image from "next/image";
import { useContext } from "react";

export default function CategoryInfo() {
    const { products, categorySelected } = useContext(AdminContext)

    const relatedProducts = categorySelected ? products.filter(product => product.categoryId === categorySelected?.id) : [];

    return (
        <Card className="w-full max-w-[340px]">
            {categorySelected ? <>
                <CardHeader>
                    <h2 className='text-lg font-bold leading-none text-center'>Categoria</h2>
                </CardHeader>

                <CardContent>
                    <div className="flex flex-col gap-4 overflow-hidden">
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
                        <div className="flex flex-col gap-1">
                            <h2 className="font-semibold">Informações da categoria</h2>
                            <p className="text-sm">Nome: {categorySelected.name}</p>
                            <p className="text-sm">Slug: {categorySelected.slug}</p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="font-semibold">Produtos relacionados</h2>
                            <ProductList products={relatedProducts} />
                        </div>

                    </div>

                    <div></div>
                </CardContent>
            </> : <>
                <CardContent>
                    <h1> Nenhuma categoria selecionada</h1>
                </CardContent>
            </>}
        </Card>
    )
}