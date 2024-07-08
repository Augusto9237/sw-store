'use client'
import React, { useContext, useEffect, useRef, useState } from 'react'
import ModalEditProduct from './modal-edit-product'
import ButtonDelete from './button-delete'
import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product';
import { useInView } from 'react-intersection-observer'
import { AdminContext } from '@/providers/admin'
import ModalAddProduct from './modal-add-product'
import { getProducts } from '@/actions/products'
import Spinner from '@/components/spinner'
import { Boxes, ChevronDown, PackageX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'

export default function ProductList() {
    const { products, setProducts, setProductSelected, search, loading } = useContext(AdminContext)
    const [ref, inView] = useInView();
    const [totaLoading, setTotalLoading] = useState(false);
    const { toast } = useToast()

    async function loadMoreData(takeNumber: number) {
        const { products: newProducts } = await getProducts('', takeNumber);

        if (newProducts.length === products.length) {
            setTotalLoading(true)
            toast({
                variant: 'success',
                title: "✅  Todos os produtos já foram carregados!",
            })
            return;
        }

        if (newProducts.length > 0 && newProducts.length > products.length) {
            setProducts(newProducts)
        }
    }

    return (
        <div className='flex flex-col w-full h-full p-5 bg-background rounded-lg relative'>
            <div className="flex justify-between">
                <Badge
                    className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                    variant='outline'
                >
                    <Boxes size={16} />
                    Produtos
                </Badge>
                <ModalAddProduct />
            </div>

            {loading &&
                <div className='w-full h-full flex justify-center items-center'>
                    <Spinner />
                </div>
            }

            {!loading && (
                <>
                    {
                        products.length < 1 ?
                            <div className="flex w-full justify-center gap-2">
                                <PackageX />
                                <h1 className="font-semibold">Nenhum produto encontrado</h1>
                            </div>
                            :
                            <>
                                <div className="relative grid grid-cols-6 max-sm:grid-cols-2 max-md:grid-cols-3 max-lg:grid-cols-4 gap-2  items-center w-full mt-8 overflow-y-scroll [&::-webkit-scrollbar]:bg-background [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:hover:bg-accent/70">
                                    {products.map(product => (
                                        <div key={product.id} className="relative p-2">
                                            <div className="absolute flex flex-col gap-4 items-center justify-center rounded-lg opacity-0 hover:opacity-100 bg-accent-foreground/20 top-0 left-0 right-0 bottom-0  z-50">
                                                <Button variant='default' onClick={() => setProductSelected(product)}>
                                                    Select
                                                </Button>
                                                <ModalEditProduct setTotalLoading={setTotalLoading} product={{ ...product, basePrice: Number(product.basePrice) }} />
                                                <ButtonDelete idProduct={product.id} />
                                            </div>
                                            <ProductItem product={computeProductTotalPrice(product)} />
                                        </div>
                                    )
                                    )}

                                    <div ref={ref} />
                                </div>
                                {inView && search === '' && !totaLoading && (
                                    <div className="absolute bottom-0 left-0 right-0 flex justify-center items-center">
                                        <Button variant='outline' size='icon' onClick={() => loadMoreData(products.length + 18)} className="animate-bounce w-6 h-6 z-30">
                                            <ChevronDown />
                                        </Button>
                                    </div>
                                )}
                            </>
                    }
                </>
            )}
        </div>
    )
}
