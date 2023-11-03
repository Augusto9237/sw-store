import { getOrderStatus } from "@/app/(public)/orders/helpers/status";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client"
import { useMemo } from "react";

interface OrderItemProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>[]
};
export default function TableOrder({ orders }: OrderItemProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow className='text-base text-foreground/70 border-b-2 hover:bg-transparent'>
                    <TableHead >Codigo</TableHead>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Total</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const total = useMemo(() => {
                        return order.orderProducts.reduce((acc, orderProduct) => {
                            const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
                            return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
                        }, 0);
                    }, [order.orderProducts]);
                    
                    return (
                        <TableRow key={order.id} className='border-b-[1px]'>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{order.userId}</TableCell>
                            <TableCell>Cartão credito</TableCell>
                            <TableCell>{getOrderStatus(order.status)}</TableCell>
                            <TableCell className="text-right">{formatReal(total)}</TableCell>
                        </TableRow>
                    )
                })}
            </TableBody>
        </Table>
    )
}
