'use client'
import { getOrderStatus } from "@/app/(public)/orders/helpers/status";
import { format } from 'date-fns'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import { useContext, useMemo } from "react";
import { AdminContext } from "@/providers/admin";


export default function TableOrder() {
    const { users, orders } = useContext(AdminContext)

    const total = useMemo(() => {
        return orders.reduce((acc, order) => {
            return acc + order.orderProducts.reduce((orderAcc, orderProduct) => {
                const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);
                return orderAcc + productWithTotalPrice.totalPrice * orderProduct.quantity;
            }, 0);
        }, 0);
    }, [orders]);

    return (
        <>
            {orders.length < 1 && (
                <div className="w-full">Nenhum pedido até o momento</div>
            )}
            {orders.length > 0 && (
                <Table className="max-sm:overflow-x-auto">
                    <TableHeader>
                        <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                            <TableHead>Cliente</TableHead>
                            <TableHead>Data</TableHead>
                            <TableHead>Método</TableHead>
                            <TableHead>Itens</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {orders.map(order => {
                            const user = users?.find(user => user.id === order.userId);

                            const date = format(new Date(order.createdAt), 'dd/MM/yyyy')

                            return (
                                <TableRow key={order.id} className='border-b-[1px] max-md:text-sm'>
                                    <TableCell>{user?.name}</TableCell>
                                    <TableCell>{date}</TableCell>
                                    <TableCell>Cartão de credito</TableCell>
                                    <TableCell>{order.orderProducts.length}</TableCell>
                                    <TableCell>{getOrderStatus(order.status)}</TableCell>
                                    <TableCell className="text-right font-bold">{formatReal(total)}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            )}
        </>
    )
}
