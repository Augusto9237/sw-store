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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { filterOrdersByToday } from "@/helpers/order";


export default function TableOrder() {
    const { customers, orders } = useContext(AdminContext)
    const totalOrdersDay = filterOrdersByToday(orders)

    return (
        <>
            {orders.length < 1 && (
                <div className="flex w-full justify-center gap-2 p-4">
                    <h1 className="font-semibold">Nenhum pedido até o monento</h1>
                </div>
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
                        {totalOrdersDay.map(order => {
                            const customer = customers?.find(customer => customer.id === order.userId);
                            const date = format(new Date(order.createdAt), 'dd/MM/yyyy')
                            const total = order.orderProducts.reduce((acc, orderProduct) => {
                                const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
                                return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
                            }, 0)

                            return (
                                <TableRow key={order.id} className='border-b-[1px] max-md:text-sm'>
                                    <TableCell className="flex items-center gap-4">
                                        <Avatar>
                                            <AvatarFallback>
                                                {customer?.name!.toUpperCase()}
                                            </AvatarFallback>

                                            {customer?.image && <AvatarImage src={customer.image!} />}
                                        </Avatar>
                                        {customer?.name}</TableCell>
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
