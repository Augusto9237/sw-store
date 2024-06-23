"use client"
import { Card } from '@/components/ui/card'
import { formatReal } from '@/helpers/formatReal';
import { computeProductTotalPrice } from '@/helpers/product';
import { AdminContext } from '@/providers/admin';
import { Prisma } from '@prisma/client';
import { CircleDollarSign, PackageSearch } from 'lucide-react'
import { useContext } from 'react';

interface CardTotalProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>[];
}

export default function CardInvoicingTotal() {
    const { orders } = useContext(AdminContext)
    
    function somarNumeroDeOrderProducts(orders: CardTotalProps['orders']) {
        let soma = 0;
        for (const obj of orders) {
            const total = obj.orderProducts.reduce((acc, orderProduct) => {
                const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
                return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
            }, 0);
            soma += total;
        }
        return soma;
    }

    const total = somarNumeroDeOrderProducts(orders)

    return (
        <Card className="flex flex-col h-32 p-5 gap-2">
            <span className='opacity-75 max-md:text-sm'>Total faturado</span>
            <div className='flex justify-between items-center'>
                <h1 className='text-4xl max-md:text-2xl max-sm:text-base font-bold'>{formatReal(total)}</h1>
                <CircleDollarSign size={46}  className='max-sm:hidden'/>
            </div>
        </Card>
    )
}
