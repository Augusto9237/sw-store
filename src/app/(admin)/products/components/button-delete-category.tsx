'use client'
import { deleteCategory } from '@/actions/category'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { Trash2 } from 'lucide-react'
import React from 'react'

interface ButtonDeleteProps {
    id: string
}

export default function ButtonDeleteCategory({ id }: ButtonDeleteProps) {

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
        <Button variant='outline' size='icon' className="h-9 w-9" onClick={() => handleDelete(id)}>
            <Trash2 size={16} />
        </Button>
    )
}
