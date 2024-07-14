'use client'
import { deleteProduct, getProducts } from '@/actions/products'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { AdminContext } from '@/providers/admin'
import { Trash2 } from 'lucide-react'
import React, { useContext } from 'react'

interface ButtonDeleteProps {
    idProduct: string;
    sm?:boolean
}

export default function ButtonDelete({ idProduct, sm }: ButtonDeleteProps) {
    const { products, setProducts } = useContext(AdminContext)

    async function handleDelete(id: string) {

        try {
            await deleteProduct(id)
            toast({
                variant: "cancel",
                title: "🗑️ Produto deletado",
            })
            const { products: newProducts } = await getProducts('', products.length + 18);
            setProducts(newProducts)
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }

    return (
        <Button variant='outline' className='gap-2 w-full' onClick={() => handleDelete(idProduct)}>
            <Trash2 size={16} />
            <span className={`${sm === true ? "max-sm:hidden" : null}`}>
                Excluir
            </span>
        </Button>
    )
}
