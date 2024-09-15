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
import { useContext, useEffect, useMemo, useState } from "react";
import ModalOrder from "./modal-order";
import ModalEditOrder from "./modal-edit-order";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteOrder, getOrders } from "@/actions/order";
import { toast } from "@/components/ui/use-toast";
import { AdminContext } from "@/providers/admin";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function TableOrder() {
    const { orders, customers, setOrders } = useContext(AdminContext)


    async function handleDeleteOrder(id: string) {
        try {
            await deleteOrder(id);
            toast({
                variant: "cancel",
                title: "🗑️ Pedido excluído",
            })
            const { orders: newOrders } = await getOrders()
            setOrders(newOrders)

        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }

    return (
        <Table className="mt-5">
            <TableHeader>
                <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-center">•••</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    orders.map(order => {
                        const customer = customers?.find(customer => customer.id === order.userId);
                        const date = format(new Date(order.createdAt), 'dd/MM/yyyy');

                        const total = order.orderProducts.reduce((acc, orderProduct) => {
                            const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
                            return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
                        }, 0)

                        return (
                            <TableRow key={order.id} className='border-b-[1px] border-input max-md:text-sm'>
                                <TableCell className="flex items-center gap-4">
                                    <Avatar>
                                        <AvatarFallback>
                                            {customer?.name!.toUpperCase()}
                                        </AvatarFallback>

                                        {customer?.image && <AvatarImage src={customer.image!} />}
                                    </Avatar>
                                    {customer?.name}
                                </TableCell>
                                <TableCell>{date}</TableCell>
                                <TableCell>Cartão de credito</TableCell>
                                <TableCell>{getOrderStatus(order.status)}</TableCell>
                                <TableCell>{order.orderProducts.length} itens</TableCell>
                                <TableCell className="text-center max-w-12">{formatReal(total)}</TableCell>
                                <TableCell className="max-w-48">
                                    <div className="flex items-center w-full gap-4 justify-end">
                                        <ModalOrder order={order} />
                                        <ModalEditOrder order={order} />
                                        <Button variant='outline' className='gap-2' onClick={() => handleDeleteOrder(order.id)}>
                                            <Trash2 size={16} />
                                            <span className="max-lg:hidden">
                                                Excluir
                                            </span>
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}
