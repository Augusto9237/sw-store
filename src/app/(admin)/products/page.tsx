import { Card, CardContent } from "@/components/ui/card"
import ProductItem from "@/components/ui/product-item"
import { computeProductTotalPrice } from "@/helpers/product"
import ModalAddProduct from "./components/modal-add-product"
import ModalAddCategory from "./components/modal-add-category"
import ButtonDelete from "./components/button-delete"
import ModalEditProduct from "./components/modal-edit-product"
import ButtonDeleteCategory from "./components/button-delete-category"
import ModalEditCategory from "./components/modal-edit-category"
import { CATEGORY_ICON } from "@/constants/category-icon"
import Link from "next/link"
import { getData } from "@/actions/products"
import ProductList from "./components/product-list"
import CategoriesList from "./components/category-list"

export default async function Products() {
  const { products, categories } = await getData()

  return (
    <div className="flex flex-1 max-md:flex-col-reverse  h-full gap-8 md:overflow-hidden max-md:overflow-y-auto">
      <div className='flex flex-col w-full h-full py-5 pl-5 bg-background rounded-lg'>
        <div className="flex w-full justify-between items-center pr-5">
          <h2 className='text-lg font-bold leading-none'>Produtos</h2>
          <ModalAddProduct categories={categories} />
        </div>

        <ProductList />
      </div>

      <Card className='p-5 md:max-w-[355px] max-md:max-h-fit w-full h-full min-h-fit max-md:min-h-[300px] overflow-hidden'>
        <div className="flex w-full justify-between items-center">
          <h2 className='text-lg font-bold leading-none'>Categorias</h2>
          <ModalAddCategory />
        </div>
        <CategoriesList/>
      </Card>
    </div>
  )
}
