import { CartProduct } from "@/providers/cart"
import Image from "next/image"
import { Button } from "./button";
import { ArrowLeftIcon, ArrowRightIcon, TrashIcon } from "lucide-react";

interface CartItemProps {
    product: CartProduct;
}
export default function CartItem({ product }: CartItemProps) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <div className="bg-accent flex h-[77px] w-[77px] items-center justify-center rounded-lg">
                    <Image
                        src={product.imageUrls[0]}
                        width={0}
                        height={0}
                        sizes="100vw"
                        alt={product.name}
                        className="w-auto h-auto max-w-[80%] max-h-[70%]"
                    />
                </div>
                <div className="flex flex-col">
                    <p className="text-xs">{product.name}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-bold">
                            {product.totalPrice.toFixed(2)}
                        </p>
                        {product.discountPercentage > 0 && (
                            <p className="opacity-75 line-through text-xs">R$ {Number(product.basePrice)}</p>
                        )}
                    </div>
                    <div className="flex items-center gap-1">
                        <Button size="icon" variant='outline' className="w-8 h-8">
                            <ArrowLeftIcon size={16} />
                        </Button>

                        <span className="text-xs">{product.quantity}</span>

                        <Button size="icon" variant='outline' className="w-8 h-8">
                            <ArrowRightIcon size={16} />
                        </Button>
                    </div>
                </div>
            </div>

            <Button size="icon" variant="outline">
                <TrashIcon size={16}/>
            </Button>
        </div>
    )
}
