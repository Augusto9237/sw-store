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
import { Prisma } from "@prisma/client"
import { useEffect, useMemo, useState } from "react";
import ModalOrder from "./modal-order";
import ModalEditOrder from "./modal-edit-order";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteOrder } from "@/actions/order";
import { toast } from "@/components/ui/use-toast";
interface Users {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: Date | null;
    image: string | null;
}[]
interface OrderItemProps {
    orders: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>[];
    users: Users[]
};

export default function TableOrder({ orders, users }: OrderItemProps) {
    const [listOrders, setListOrders] = useState<OrderItemProps['orders']>([])

    useEffect(() => {
        setListOrders(orders)
    }, [orders])

    const total = useMemo(() => {
        return orders.reduce((acc, order) => {
            return acc + order.orderProducts.reduce((orderAcc, orderProduct) => {
                const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);
                return orderAcc + productWithTotalPrice.totalPrice * orderProduct.quantity;
            }, 0);
        }, 0);
    }, [orders]);

    async function handleDeleteOrder(id: string) {
        try {
            await deleteOrder(id);
            toast({
                variant: "cancel",
                title: "🗑️ Pedido excluído",
            })
        } catch (error) {
            toast({
                variant: 'cancel',
                title: "⛔  Algo deu errado, tente novamente!",
            })
        }
    }

    return (
        <Table>
            <TableHeader>
                <TableRow className='text-base text-foreground/70 max-md:text-sm border-b-2 hover:bg-transparent'>
                    <TableHead>Cliente</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Método</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Itens</TableHead>
                    <TableHead className="text-center">Total</TableHead>
                    <TableHead className="text-end">Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    listOrders.map(order => {
                        const user = users?.find(user => user.id === order.userId);
                        const date = format(new Date(order.createdAt), 'dd/MM/yyyy')

                        return (
                            <TableRow key={order.id} className='border-b-[1px] max-md:text-sm'>
                                <TableCell>{user?.name}</TableCell>
                                <TableCell>{date}</TableCell>
                                <TableCell>Cartão de credito</TableCell>
                                <TableCell>{getOrderStatus(order.status)}</TableCell>
                                <TableCell>{order.orderProducts.length} itens</TableCell>
                                <TableCell className="text-center">{formatReal(total)}</TableCell>
                                <TableCell className="flex justify-end gap-4 items-center">
                                    <ModalOrder order={order} />
                                    <ModalEditOrder order={order} />
                                    <Button variant='outline' size='icon' className="h-9 w-9" onClick={() => handleDeleteOrder(order.id)}>
                                        <Trash2 size={16} />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )
}
