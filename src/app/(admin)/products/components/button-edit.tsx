'use client'
import { deleteProduct } from '@/actions/products'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Pencil } from 'lucide-react'
import React from 'react'

interface ButtonDeleteProps {
    idProduct: string
}

export default function ButtonEdit({ idProduct }: ButtonDeleteProps) {

    async function handleDelete(id: string) {

        try {
            await deleteProduct(id)
            toast({
                variant: "cancel",
                title: "🗑️ Produto deletado",
            })
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }
    return (
        <Button variant='save' className='gap-2' onClick={() => handleDelete(idProduct)}>
            <Pencil size={16}/>
            Editar
        </Button>
    )
}
