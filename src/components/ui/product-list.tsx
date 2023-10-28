import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { Product } from "@prisma/client";

interface ProductListProps {
    products: Product[]
}
export default function ProductList({ products }: ProductListProps) {
    return (
        <div className="flex w-full gap-4 md:gap-8 overflow-x-auto px-5 md:px-0 [&::-webkit-scrollbar]:md:hidden">
            {products.map(product => (
                <div key={product.id} className="w-[170px] max-w-[170px]">
                    <ProductItem product={computeProductTotalPrice(product)} />
                </div>
            )
            )}
        </div>
    );
}
