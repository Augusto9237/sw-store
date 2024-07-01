"use client"
import { Card } from '@/components/ui/card'
import { formatReal } from '@/helpers/formatReal';
import { TotalSumOrders } from '@/helpers/order';
import { AdminContext } from '@/providers/admin';
import { CircleDollarSign } from 'lucide-react'
import { useContext } from 'react';


export default function CardInvoicingTotal() {
    const { orders } = useContext(AdminContext)
    
    const total = TotalSumOrders(orders)

    return (
        <Card className="flex flex-col max-sm:justify-between p-5 max-sm:p-2 gap-2 h-32 max-sm:h-24">
            <span className='opacity-75 max-md:text-sm'>Total faturado</span>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl max-md:text-2xl max-sm:text-base font-bold'>{formatReal(total)}</h1>
                <CircleDollarSign size={46}  className='max-sm:hidden'/>
            </div>
        </Card>
    )
}
