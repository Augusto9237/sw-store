import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowBigDown } from "lucide-react";

interface ProductItemProps {
    product: ProductWithTotalPrice
}

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <div className="flex h-full w-full flex-col gap-4">
            <div className="relative bg-accent rounded-lg h-[170px] w-full flex items-center justify-center">
                <Image
                    src={product.imageUrls[0]}
                    height={0}
                    width={0}
                    sizes="100vw"
                    className="h-[90px] max-h-[70%] w-auto max-w-[80%]"
                    alt={product.name}
                    style={{
                        objectFit: 'contain'
                    }}
                />
                {product.discountPercentage > 0 && (
                    <Badge className="absolute left-2 top-2 px-2 py-[2px]">
                        <ArrowBigDown size={14} /> {product.discountPercentage}%

                    </Badge>
                )}
            </div>

            <div className="flex flex-col gap-1">
                <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                    {product.name}
                </p>
                <div className="flex items-center gap-2">
                    {product.discountPercentage > 0 ? (
                        <>
                            <p className="overflow-hidden whitespace-nowrap font-semibold">R$ {Number(product.totalPrice).toFixed(2)}</p>
                            <p className="overflow-hidden text-ellipsis whitespace-nowrap line-through opacity-75 text-xs">
                                R$ {Number(product.basePrice).toFixed(2)}
                            </p>
                        </>
                    ) : (
                        <p className="overflow-hidden whitespace-nowrap font-semibold">
                            R$ {Number(product.basePrice).toFixed(2)}
                        </p>
                    )}
                </div>

            </div>

        </div>
    );
}
