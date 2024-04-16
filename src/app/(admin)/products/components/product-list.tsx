'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ModalEditProduct from './modal-edit-product'
import ButtonDelete from './button-delete'
import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product';
import { useInView } from 'react-intersection-observer'
import { AdminContext } from '@/providers/admin'
import ModalAddProduct from './modal-add-product'
import { getData } from '@/actions/products'
import Spinner from '@/components/spinner'

export default function ProductList() {
    const { products, categories, setProducts, search } = useContext(AdminContext)
    const [ref, inView] = useInView();
    const [loading, setLoading] = useState(false)
  
    async function loadMoreData(takeNumber: number) {
        const { products: newProducts } = await getData('', takeNumber)

        if (newProducts.length > 0 && newProducts.length > products.length) {
            setProducts(newProducts)
        }
        setLoading(false)
    }

    useEffect(() => {
        const take = products.length + 18

        if (inView && search === '') {
            setLoading(true)
            loadMoreData(take)
        }
    }, [inView])


    return (
        <div className='flex flex-col w-full h-full py-5 pl-5 bg-background rounded-lg'>
            <div className="flex w-full justify-between items-center pr-5">
                <h2 className='text-lg font-bold leading-none'>Produtos</h2>
                <ModalAddProduct />
            </div>

            {products.length < 1 &&
                <div className='w-full h-full flex justify-center items-center'>
                    <Spinner />
                </div>
            }

            {products.length > 0 && (
                <>
                    <div className="grid grid-cols-6 gap-2 pr-5 items-center w-full mt-8 overflow-y-scroll [&::-webkit-scrollbar]:bg-background [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:hover:bg-accent/70">
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
                        {/* <div ref={ref} /> */}
                    </div>
                </>
            )}
        </div>
    )
}
