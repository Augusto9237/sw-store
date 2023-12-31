import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { prismaClient } from "@/lib/prisma";
import { PercentIcon } from "lucide-react";

export default async function DealsPage() {
    const deals = await prismaClient.product.findMany({
        where: {
            discountPercentage: {
                gt: 0,
            },
        },
    });

    return (
        <div className="flex flex-col gap-8 p-5 xl:px-0 lg:py-8 max-w-[1248px] w-full mx-auto">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant="outline"
            >
                <PercentIcon size={16} />
                Ofertas
            </Badge>

            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 overflow-hidden">
                {deals.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={computeProductTotalPrice(product)}
                    />
                ))}
            </div>
        </div>
    );
};
