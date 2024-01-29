import { Button } from "@/components/ui/button";
import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client"
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ModalOrderProps } from "./modal-edit-order";
import { toast } from "@/components/ui/use-toast";


interface OrderProductItemProps {
    orderProduct: Prisma.OrderProductGetPayload<{
        include: {
            product: true;
        }
    }>
    setOrderSelected: Dispatch<SetStateAction<ModalOrderProps['order']>>;
    quantityItems: number
}
export default function OrderProductItemEdit({ orderProduct, setOrderSelected, quantityItems }: OrderProductItemProps) {
    const productWithTotalPrice = computeProductTotalPrice(orderProduct.product);


    function handleIncrementQuantity() {
        setOrderSelected(prev => {
            const orderProducts = prev.orderProducts.map(orderProduct => {
                if (orderProduct.id === orderProduct.id) {
                    return {
                        ...orderProduct,
                        quantity: orderProduct.quantity + 1
                    }
                }

                return orderProduct;
            })

            return {
                ...prev,
                orderProducts
            }
        })
    }

    function handleDecrementQuantity() {
        setOrderSelected(prev => {
            const orderProducts = prev.orderProducts.map(orderProduct => {
                if (orderProduct.id === orderProduct.id) {
                    return {
                        ...orderProduct,
                        quantity: orderProduct.quantity - 1
                    }
                }

                return orderProduct;
            })

            return {
                ...prev,
                orderProducts
            }
        })
    }

    function handleRemoveProduct() {
        if (quantityItems <= 1) {
            toast({
                variant: 'cancel',
                title: "⛔  Exite apenas este item no pedido, exlcua o pedido",
            })
            return null
        };

        setOrderSelected(prev => {
            const orderProducts = prev.orderProducts.filter(orderProduct => orderProduct.id !== orderProduct.id)

            return {
                ...prev,
                orderProducts
            }
        })
    }

    return (
        <div className="flex items-center gap-4 relative">
            <div className="bg-accent rounded-lg w-[85px] h-[77px] flex items-center justify-center">
                <Image
                    src={orderProduct.product.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto max-w-[80%] max-h-[80%] w-auto object-contain"
                    alt={orderProduct.product.name}
                />
            </div>

            <div className="flex flex-col gap-1 w-full">
                <div className="bg-accent flex w-fit rounded-md px-3">
                    <p>Vendido e entregue por SW Store</p>
                </div>
                <p className="text-xs">{orderProduct.product.name}</p>

                <div className="flex w-full items-center justify-between gap-1">
                    <div className="flex items-center gap-1">
                        <p className="text-sm font-bold">
                            {formatReal(Number(productWithTotalPrice.totalPrice))}
                        </p>

                        {productWithTotalPrice.discountPercentage > 0 && (
                            <p className="text-xs line-through opacity-75">
                                {formatReal(Number(productWithTotalPrice.basePrice))}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <Button size="icon"
                            variant='outline' className="w-8 h-8"
                            onClick={() => orderProduct.quantity <= 1 ? handleRemoveProduct() : handleDecrementQuantity()}>
                            <ArrowLeftIcon size={14} />
                        </Button>

                        <span className="text-xs">{orderProduct.quantity}</span>

                        <Button size="icon" variant='outline' className="w-8 h-8" onClick={() => handleIncrementQuantity()}>
                            <ArrowRightIcon size={16} />
                        </Button>
                    </div>

                    <div className="absolute top-0 right-0" onClick={() => handleRemoveProduct()}>
                        <Button size="icon" variant="ghost" className="w-8 h-8 text-red-500 hover:text-red-500">
                            <TrashIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
