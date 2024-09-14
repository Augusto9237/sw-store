'use client'
import React, { useContext, useState } from 'react'
import ModalEditProduct from './modal-edit-product'
import ProductItem from '@/components/ui/product-item'
import { computeProductTotalPrice } from '@/helpers/product';
import { useInView } from 'react-intersection-observer'
import { AdminContext } from '@/providers/admin'
import ModalAddProduct from './modal-add-product'
import { getProducts } from '@/actions/products'
import Spinner from '@/components/spinner'
import { ChevronDown, ExternalLink, List, PackageX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import ButtonDelete from './button-delete';
import SearchInput from '@/components/search-input';

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import Image from 'next/image';
import { formatReal } from '@/helpers/formatReal';

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
            <div className="flex justify-between gap-4">
                <SearchInput />
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
                            <div className="flex w-full h-full justify-center gap-2">
                                <PackageX />
                                <h1 className="font-semibold">Nenhum produto encontrado</h1>
                            </div>
                            :
                            <>
                                <Table>
                                    <TableHeader>
                                        <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                                            <TableHead className="w-28">Imagem</TableHead>
                                            <TableHead>Nome</TableHead>
                                            <TableHead className="max-w-[50px]">slug</TableHead>
                                            <TableHead>Estoque</TableHead>
                                            <TableHead>Preço base</TableHead>
                                            <TableHead>Desconto</TableHead>
                                            <TableHead>Preço final</TableHead>
                                            <TableHead className="text-center">•••</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.map(product => {

                                            return (
                                                <TableRow key={product.id} className='border-b-[1px] border-input' >
                                                    <TableCell className="flex items-center  w-28 overflow-hidden">
                                                        <Image src={product.imageUrls[0]} alt={product.name} width={0} height={0} className="w-full h-10 object-contain" sizes="100vw" />

                                                    </TableCell>
                                                    <TableCell className="truncate max-w-[140px]">{product.name}</TableCell>
                                                    <TableCell>{product.slug}</TableCell>
                                                    <TableCell>{product.stock}</TableCell>
                                                    <TableCell>{formatReal(Number(product.basePrice))}</TableCell>
                                                    <TableCell>{product.discountPercentage}%</TableCell>
                                                    <TableCell >{formatReal(Number(product.basePrice) - Number(product.discountPercentage / 100) * Number(product.basePrice))}</TableCell>
                                                    <TableCell >
                                                        <div className="flex justify-center gap-2">
                                                            <Button variant="outline" className='gap-2' onClick={() => setProductSelected(product)}>
                                                                <ExternalLink size={18} />
                                                                <span className='max-sm:hidden'>
                                                                    Detalhes
                                                                </span>
                                                            </Button>
                                                            <ModalEditProduct setTotalLoading={setTotalLoading} product={{ ...product, basePrice: Number(product.basePrice) }} sm={true} />

                                                            <ButtonDelete idProduct={product.id} sm={true} />
                                                        </div>
                                                    </TableCell>
                                                </TableRow>
                                            )
                                        })}
                                    </TableBody>
                                </Table>
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
