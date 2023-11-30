'use client'
import OrderProductItem from "@/app/(public)/orders/components/order-product-item";
import { getOrderStatus } from "@/app/(public)/orders/helpers/status";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import { Order, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { GanttChartSquare } from "lucide-react";
import { useMemo, useState } from "react";

interface ModalOrderProps {
    order: Prisma.OrderGetPayload<{
        include: {
            orderProducts: {
                include: {
                    product: true;
                }
            }
        }
    }>
}

export default function ModalOrder({ order }: ModalOrderProps) {
    const [isOpen, setIsOpen] = useState(false);

    const subtotal = useMemo(() => {
        return order.orderProducts.reduce((acc, orderProduct) => {
            return acc + Number(orderProduct.product.basePrice) * orderProduct.quantity;
        }, 0)
    }, [order.orderProducts]);

    const total = useMemo(() => {
        return order.orderProducts.reduce((acc, orderProduct) => {
            const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
            return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
        }, 0);
    }, [order.orderProducts]);

    const totalDiscounts = subtotal - total

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button variant='secondary' size='icon'>
                    <GanttChartSquare size={16} />
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Detalhes do Pedido</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-8">
                        <span className="font-bold opacity-60">Cód. do pedido: {order.id}</span>
                        <div className="flex items-center justify-between">
                            <div className="font-bold">
                                <p>Status</p>
                                <p className="text-primary">{getOrderStatus(order.status)}</p>
                            </div>

                            <div>
                                <p className="font-bold">Data</p>
                                <p className="opacity-75">{format(order.createdAt, "d/MM/y")}</p>
                            </div>

                            <div>
                                <p className="font-bold">Pagamento</p>
                                <p className="opacity-75">Cartão</p>
                            </div>
                        </div>

                        <div>
                            {order.orderProducts.map(orderProduct => (
                                <OrderProductItem key={orderProduct.id} orderProduct={orderProduct} />
                            ))}
                        </div>

                        <div className="flex flex-col gap-3">
                            <Separator />

                            <div className="flex items-center justify-between text-xs">
                                <p>Subtotal</p>
                                <p>{formatReal(subtotal)}</p>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between text-xs">
                                <p>Entrega</p>
                                <p>GRÁTIS</p>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between text-xs">
                                <p>Descontos</p>
                                <p>- {formatReal(totalDiscounts)}</p>
                            </div>

                            <Separator />

                            <div className="flex items-center justify-between text-sm font-bold">
                                <p>Total</p>
                                <p>{formatReal(total)}</p>
                            </div>
                        </div>

                    </div>
                </DialogContent>
            )}
        </Dialog>
    )
}
