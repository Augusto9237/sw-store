'use client'
import { getOrderStatus } from "@/app/(public)/orders/helpers/status";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator";
import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import { Order, Prisma } from "@prisma/client";
import { format } from "date-fns";
import { GanttChartSquare, Pencil } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import OrderProductItemEdit from "./order-product-item-edit";

export interface ModalOrderProps {
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

export default function ModalEditOrder({ order }: ModalOrderProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [orderSelected, setOrderSelected] = useState<ModalOrderProps['order']>(null!);

    useEffect(() => {
        setOrderSelected(order)
    }, [order, isOpen])


    const subtotal = useMemo(() => {
        if (!orderSelected?.orderProducts) return 0;

        return orderSelected.orderProducts.reduce((acc, orderProduct) => {
            return acc + Number(orderProduct.product.basePrice) * orderProduct.quantity;
        }, 0)
    }, [orderSelected?.orderProducts]);

    const total = useMemo(() => {
        if (!orderSelected?.orderProducts) return 0;
        return orderSelected.orderProducts.reduce((acc, orderProduct) => {
            const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)
            return acc + productWithTotalPrice.totalPrice * orderProduct.quantity;
        }, 0);
    }, [orderSelected?.orderProducts]);

    const totalDiscounts = subtotal - total

    return (
        <Dialog modal={isOpen}>
            <DialogTrigger asChild onClick={() => setIsOpen(true)}>
                <Button variant='save' size='icon' className="h-8 w-8">
                    <Pencil size={16} />
                </Button>
            </DialogTrigger>

            {isOpen && (
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle className="text-center">Editar Pedido</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-8">
                        <span className="font-bold opacity-60">Cód. do pedido: {orderSelected.id}</span>
                        <div className="flex items-center justify-between">
                            <div className="font-bold">
                                <p>Status</p>
                                <p className="text-primary">{getOrderStatus(orderSelected.status)}</p>
                            </div>

                            <div>
                                <p className="font-bold">Data</p>
                                <p className="opacity-75">{format(orderSelected.createdAt, "d/MM/y")}</p>
                            </div>

                            <div>
                                <p className="font-bold">Pagamento</p>
                                <p className="opacity-75">Cartão</p>
                            </div>
                        </div>

                        <div>
                            {orderSelected.orderProducts.map((orderProduct) => (
                                <OrderProductItemEdit
                                    key={orderProduct.id}
                                    orderProduct={orderProduct}
                                    setOrderSelected={setOrderSelected}
                                    quantityItems={orderSelected.orderProducts.length}
                                />
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
                    <div className="flex w-full justify-center gap-5 ">
                        <Button variant='save' className="uppercase font-semibold" type="button">Salvar</Button>


                        <DialogClose asChild>
                            <Button variant="secondary" className="uppercase font-semibold" type="reset">Cancelar</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            )}
        </Dialog>
    )
}
