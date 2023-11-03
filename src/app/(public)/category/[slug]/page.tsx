import { Badge } from "@/components/ui/badge"
import ProductItem from "@/components/ui/product-item"
import { CATEGORY_ICON } from "@/constants/category-icon"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"


export default async function CategoryProducts({ params }: any) {
    const category = await prismaClient.category.findFirst({
        where: { slug: params?.slug },
        include: {
            products: true,
        }
    })

    if(!category){
        return null
    }

    return (
        <div className="flex flex-col gap-8 p-5 xl:px-0 lg:py-8 max-w-[1248px] w-full mx-auto">
            <Badge
                className="w-fit gap-1 border-2 border-primary px-3 py-[0.375rem] text-base uppercase"
                variant='outline'
            >
                {CATEGORY_ICON[params.slug as keyof typeof CATEGORY_ICON]}
                {category?.name}
            </Badge>
            <div className="grid grid-cols-2 md:grid-cols-6  gap-8 overflow-hidden">
                {category?.products.map(product => <ProductItem key={product.id} product={computeProductTotalPrice(product)} />)}
            </div>
        </div>
    )
}
