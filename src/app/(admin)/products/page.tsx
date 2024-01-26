import CategoryItem from "@/app/(public)/(home)/components/category-item"
import { Card, CardContent } from "@/components/ui/card"
import ProductItem from "@/components/ui/product-item"
import { computeProductTotalPrice } from "@/helpers/product"
import { prismaClient } from "@/lib/prisma"
import ModalAddProduct from "./components/modal-add-product"
import ModalAddCategory from "./components/modal-add-category"
import ButtonDelete from "./components/button-delete"
import ModalEditProduct from "./components/modal-edit-product"
import ButtonDeleteCategory from "./components/button-delete-category"
import ModalEditCategory from "./components/modal-edit-category"
import { revalidatePath } from "next/cache"
import { CATEGORY_ICON } from "@/constants/category-icon"
import Link from "next/link"

async function getData() {
  const products = await prismaClient.product.findMany({
    take: 18
  })
  const categories = await prismaClient.category.findMany()

  revalidatePath('/products')


  return { products, categories }
}

export default async function Products() {
  const { products, categories } = await getData()
  return (
    <div className="flex flex-1 max-md:flex-col-reverse  h-full gap-8 md:overflow-hidden max-md:overflow-y-auto">
      <div className='flex flex-col w-full h-full py-5 pl-5 bg-background rounded-lg'>
        <div className="flex w-full justify-between items-center pr-5">
          <h2 className='text-lg font-bold leading-none'>Produtos</h2>
          <ModalAddProduct categories={categories} />
        </div>
        <div className="grid grid-cols-6 gap-2 pr-5 items-center w-full mt-8 overflow-y-scroll [&::-webkit-scrollbar]:bg-background [&::-webkit-scrollbar]:w-[3px] [&::-webkit-scrollbar-thumb]:hover:bg-accent/70">
          {products.map(product => (
            <div key={product.id} className="relative p-2">
              <div className="absolute flex flex-col gap-4 items-center justify-center rounded-lg opacity-0 hover:opacity-100 bg-accent-foreground/20 top-0 left-0 right-0 bottom-0  z-50">
                <ModalEditProduct categories={categories} product={{ ...product, basePrice: Number(product.basePrice) }} />
                <ButtonDelete idProduct={product.id} />
              </div>
              <ProductItem product={computeProductTotalPrice(product)} />
            </div>
          )
          )}
        </div>
      </div>

      <Card className='p-5 md:max-w-[355px] max-md:max-h-fit w-full h-full min-h-fit max-md:min-h-[300px] overflow-hidden'>
        <div className="flex w-full justify-between items-center">
          <h2 className='text-lg font-bold leading-none'>Categorias</h2>
          <ModalAddCategory />
        </div>
        <CardContent className='w-full p-0 gap-4 flex flex-col max-md:grid grid-cols-2 mt-8'>
          {categories.map(category => (
            <div key={category.id} className="flex border border-input bg-background hover:bg-accent/60 hover:text-accent-foreground w-full justify-between px-2 py-1 items-center gap-2 rounded-lg">
              
                <Link href={`/category/${category.slug}`} className="flex gap-2">
                  {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
                  <span className="font-bold text-xs">
                    {category.name}
                  </span>
                </Link>
              

              <div className="flex items-center gap-2">
                <ModalEditCategory category={category} />

                <ButtonDeleteCategory id={category.id} />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
