import { formatReal } from "@/helpers/formatReal";
import { computeProductTotalPrice } from "@/helpers/product";
import { Decimal } from "@prisma/client/runtime/library";
import Image from "next/image";

interface ProductItemProps {
    product: {
        id: string;
        name: string;
        slug: string;
        description: string;
        basePrice: Decimal;
        imageUrls: string[];
        categoryId: string;
        discountPercentage: number;
    }
}
export default function TopProductItem(product: ProductItemProps) {
    const productWithTotalPrice = computeProductTotalPrice(product.product)
    return (
        <div className="flex w-full items-center gap-3 justify-between">
            <div className="flex justify-center items-center bg-accent min-w-[50px] w-full max-w-[60px] h-[50px] overflow-hidden rounded-md">
                <Image
                    src={product.product.imageUrls[0]}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="h-auto max-w-[80%] max-h-[80%] w-auto object-contain"
                    alt={product.product.name}
                />
            </div>

            <div className="flex flex-col flex-1 w-full overflow-hidden">
                <p className="overflow-hidden whitespace-nowrap font-semibold text-sm">{product.product.name}</p>
            </div>

            <div>
            <p className="text-sm font-semibold text-primary">
                {formatReal(Number(productWithTotalPrice.totalPrice))}
            </p>
            </div>
        </div>
    )
}
