import CategoryItem from "@/app/(public)/(home)/components/category-item"
import { Card, CardContent } from "@/components/ui/card"
import ProductItem from "@/components/ui/product-item"
import ProductList from "@/components/ui/product-list"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"

export default async function Products() {
  const products = await prismaClient.product.findMany({
    take: 18
  })

  const categories = await prismaClient.category.findMany()
  return (
    <div className="flex flex-1  h-full gap-8 overflow-hidden">
      <div className='flex flex-col w-full h-full p-5 bg-background rounded-lg'>
        <h2 className='text-lg font-bold'>Ultimos Pedidos</h2>
        <div className="grid grid-cols-6 gap-8 items-center justify-center w-full mt-8 overflow-y-scroll [&::-webkit-scrollbar]:bg-background [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:hover:bg-accent/70">
          {products.map(product => (
            <ProductItem key={product.id} product={computeProductTotalPrice(product)} />
          )
          )}
        </div>
      </div>

      <Card className='p-5  md:max-w-[355px] w-full h-full min-h-fit max-md:min-h-[380px] overflow-hidden'>
        <h2 className='text-lg font-bold'>Categorias</h2>

        <CardContent className='w-full p-0 gap-4 flex flex-col max-md:grid grid-cols-2 mt-8'>
          {categories.map(category => <CategoryItem key={category.id} category={category} />)}
        </CardContent>
      </Card>
    </div>
  )
}
