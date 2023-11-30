import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import { Prisma } from "@prisma/client"
import Image from "next/image";

interface OrderProductItemProps {
    orderProduct: Prisma.OrderProductGetPayload<{
        include: {
            product: true;
        }
    }>
}
export default function OrderProductItem({ orderProduct }: OrderProductItemProps) {
    const productWithTotalPrice = computeProductTotalPrice(orderProduct.product)

    return (
        <div className="flex items-center gap-4">
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
                    <p className="text-xs opacity-60">Qtd: {orderProduct.quantity}</p>
                </div>
            </div>
        </div>
    )
}
