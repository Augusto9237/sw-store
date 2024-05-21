import { getProducts } from "@/actions/products";
import { Badge } from "@/components/ui/badge";
import ProductItem from "@/components/ui/product-item";
import { computeProductTotalPrice } from "@/helpers/product";
import { PackageX } from "lucide-react";

export default async function SearchProducts({ params }: any) {
    const { products } = await getProducts(params.name);

    return (
        <div className="flex flex-col gap-8 p-5 xl:px-0 lg:py-8 max-w-[1248px] w-full mx-auto">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant='outline'
            >
                Resultado
            </Badge>
            {
                products.length === 0 ?
                    <div className="flex w-full justify-center gap-2">
                        <PackageX/>
                        <h1 className="font-semibold">Nenhum produto encontrado</h1>
                    </div>
                    :
                    <div className="grid grid-cols-2 md:grid-cols-6  gap-8 overflow-hidden">
                        {products.map(product => <ProductItem key={product.id} product={computeProductTotalPrice(product)} />)}
                    </div>
            }

        </div>
    )
}