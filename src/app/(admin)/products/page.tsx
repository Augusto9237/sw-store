import CategoryItem from "@/app/(public)/(home)/components/category-item"
import { Card, CardContent } from "@/components/ui/card"
import ProductItem from "@/components/ui/product-item"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"
import ModalAddProduct from "./components/modal-add-product"
import ModalAddCategory from "./components/modal-add-category"
import ButtonDelete from "./components/button-delete"
import ModalEditProduct from "./components/modal-edit-product"

export default async function Products() {
  const products = await prismaClient.product.findMany({
    take: 18
  })

  const categories = await prismaClient.category.findMany()
  return (
    <div className="flex flex-1  h-full gap-8 overflow-hidden">
      <div className='flex flex-col w-full h-full py-5 pl-5 bg-background rounded-lg'>
        <div className="flex w-full justify-between items-center pr-5">
          <h2 className='text-lg font-bold leading-none'>Produtos</h2>
          <ModalAddProduct categories={categories} />
        </div>
        <div className="grid grid-cols-6 gap-2 pr-5 items-center w-full mt-8 overflow-y-scroll [&::-webkit-scrollbar]:bg-background [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:hover:bg-accent/70">
          {products.map(product => (
            <div key={product.id} className="relative p-2">
              <div className="absolute flex flex-col gap-4 items-center justify-center rounded-lg opacity-0 hover:opacity-100 bg-accent-foreground/20 top-0 left-0 right-0 bottom-0  z-50">
                <ModalEditProduct categories={categories} product={product}/>
                <ButtonDelete idProduct={product.id} />

              </div>
              <ProductItem product={computeProductTotalPrice(product)} />
            </div>
          )
          )}
        </div>
      </div>

      <Card className='p-5  md:max-w-[355px] w-full h-full min-h-fit max-md:min-h-[380px] overflow-hidden'>
        <div className="flex w-full justify-between items-center">
          <h2 className='text-lg font-bold leading-none'>Categorias</h2>
          <ModalAddCategory />
        </div>
        <CardContent className='w-full p-0 gap-4 flex flex-col max-md:grid grid-cols-2 mt-8'>
          {categories.map(category => <CategoryItem key={category.id} category={category} />)}
        </CardContent>
      </Card>
    </div>
  )
}
