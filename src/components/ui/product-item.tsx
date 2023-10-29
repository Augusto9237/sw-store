import { ProductWithTotalPrice } from "@/helpers/product";
import Image from "next/image";
import { Badge } from "./badge";
import { ArrowBigDown } from "lucide-react";
import Link from "next/link";
import DiscountBadge from "./discount-badge";
import { formatReal } from "@/helpers/formatReal";

interface ProductItemProps {
    product: ProductWithTotalPrice
}

export default function ProductItem({ product }: ProductItemProps) {
    return (
        <Link href={`/product/${product.slug}`}>
            <div className="flex h-full w-full lg:min-w-[160px] flex-col gap-4">
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
                        <DiscountBadge className="absolute left-2 top-2">
                            {product.discountPercentage}
                        </DiscountBadge>
                    )}
                </div>

                <div className="flex flex-col gap-1">
                    <p className="overflow-hidden text-ellipsis whitespace-nowrap text-sm">
                        {product.name}
                    </p>
                    <div className="flex items-center gap-2">
                        {product.discountPercentage > 0 ? (
                            <>
                                <p className="overflow-hidden whitespace-nowrap font-semibold">{formatReal(Number(product.totalPrice))}</p>
                                <p className="overflow-hidden text-ellipsis whitespace-nowrap line-through opacity-75 text-xs">
                                    {formatReal(Number(product.basePrice))}
                                </p>
                            </>
                        ) : (
                            <p className="overflow-hidden whitespace-nowrap font-semibold">
                                {formatReal(Number(product.basePrice))}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}
