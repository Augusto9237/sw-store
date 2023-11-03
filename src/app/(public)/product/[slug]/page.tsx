import { prismaClient } from "@/lib/prisma"
import ProductImages from "./components/product-images";
import ProductInfo from "./components/product-info";
import { computeProductTotalPrice } from "@/helpers/product";
import ProductList from "@/components/ui/product-list";
import SectionTitle from "@/components/ui/section-title";

interface ProductDetailsProps {
    params: {
        slug: string
    }
}
export default async function ProductDetailsPage({ params: { slug } }: ProductDetailsProps) {
    const product = await prismaClient.product.findFirst({
        where: {
            slug: slug
        },
        include: {
            category: {
                include: {
                    products: {
                        where: {
                            slug: {
                                not: slug
                            }
                        }
                    }
                }
            }
        }
    })

    if (!product) return null;

    return (
        <div className="flex flex-col gap-8 pb-8 lg:py-8 max-w-[1248px] w-full mx-auto">
            <div className="flex max-lg:flex-col gap-8 ">
                <ProductImages imagesUrls={product.imageUrls} name={product.name} />
                <ProductInfo product={computeProductTotalPrice(product)} />
            </div>
            <div className="">
                <SectionTitle>Produtos recomendados</SectionTitle>
                <ProductList products={product.category.products} />
            </div>
        </div>
    )
}
