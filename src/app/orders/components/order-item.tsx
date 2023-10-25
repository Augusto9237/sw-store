import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card } from "@/components/ui/card"
import { Prisma } from "@prisma/client";
import { format } from 'date-fns'
import OrderProductItem from "./order-product-item";
import { Separator } from "@/components/ui/separator";
import { useMemo } from "react";
import { computeProductTotalPrice } from "@/helpers/product";
import { getOrderStatus } from "../helpers/status";

interface OrderItemProps {
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

export default function OrderItem({ order }: OrderItemProps) {
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
        <Card className="px-5">
            <Accordion type="single" className="w-full" collapsible>
                <AccordionItem value={order.id}>
                    <AccordionTrigger className="hover:no-underline">
                        <div className="flex flex-col gap-1 text-left">
                            <p>Pedido com {order.orderProducts.length} produto(s)</p>
                            <p className="text-xs opacity-75">Feito em {format(order.createdAt, "d/MM/y 'às' HH:mm")}</p>
                        </div>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex items-center justify-between">
                                <div className="font-bold">
                                    <p>Status</p>
                                    <p className="text-primary">{getOrderStatus(order.status)}</p>
                                </div>

                                <div>
                                    <p className="font-bold">Status</p>
                                    <p className="opacity-75">{format(order.createdAt, "d/MM/y")}</p>
                                </div>

                                <div>
                                    <p className="font-bold">Status</p>
                                    <p className="opacity-75">Cartão</p>
                                </div>
                            </div>
                            {order.orderProducts.map(orderProduct => (
                                <OrderProductItem key={orderProduct.id} orderProduct={orderProduct} />
                            ))}
                            <div className="flex flex-col gap-3">
                                <Separator />

                                <div className="flex items-center justify-between text-xs">
                                    <p>Subtotal</p>
                                    <p>R$ {subtotal.toFixed(2)}</p>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between text-xs">
                                    <p>Entrega</p>
                                    <p>GRÁTIS</p>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between text-xs">
                                    <p>Descontos</p>
                                    <p>- R$ {totalDiscounts.toFixed(2)}</p>
                                </div>

                                <Separator />

                                <div className="flex items-center justify-between text-sm font-bold">
                                    <p>Total</p>
                                    <p>R$ {total.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </Card>
    )
}
