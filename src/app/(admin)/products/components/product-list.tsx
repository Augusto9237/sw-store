'use client'
import React, { useContext, useEffect, useState } from 'react'
import ModalEditProduct from './modal-edit-product'
import ButtonDelete from './button-delete'
import ProductItem from '@/components/ui/product-item'
import { Category, Product } from '@prisma/client';
import { computeProductTotalPrice } from '@/helpers/product';
import { useInView } from 'react-intersection-observer'
import { getData } from '@/actions/products'
import { AdminContext } from '@/providers/admin'



export default function ProductList() {
    const {products, categories} = useContext(AdminContext)
    // const [productsList, setProductsList] = useState<Product[]>([])
    // const [categoriesList, setCategoriesList] = useState<Category[]>([])
    // const [ref, inView] = useInView()

    // async function loadMoreData() {
    //     const take = 18
    //     const {categories, products} = await getData()

    //     if (products.length){
    //         getData()
    //         setProductsList(products)
    //         setCategoriesList(categories)
    //     }
    // }

    // useEffect(() => { 
    //     if (inView) {
    //         loadMoreData()
    //     }
    // }, [inView])

    return (
        <div  className="grid grid-cols-6 gap-2 pr-5 items-center w-full mt-8 overflow-y-scroll [&::-webkit-scrollbar]:bg-background [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:hover:bg-accent/70">
            {products.map(product => (
                <div key={product.id} className="relative p-2">
                    <div className="absolute flex flex-col gap-4 items-center justify-center rounded-lg opacity-0 hover:opacity-100 bg-accent-foreground/20 top-0 left-0 right-0 bottom-0  z-50">
                        <ModalEditProduct categories={categories} product={{ ...product, basePrice: Number(product.basePrice) }} />
                        <ButtonDelete idProduct={product.id} />
                    </div>
                    <ProductItem product={computeProductTotalPrice(product)} />
                </div>
            )
            )}
        </div>
    )
}
