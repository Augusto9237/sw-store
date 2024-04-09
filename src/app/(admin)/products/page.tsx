import { Card } from "@/components/ui/card"
import ModalAddProduct from "./components/modal-add-product"
import ModalAddCategory from "./components/modal-add-category"
import { getData } from "@/actions/products"
import ProductList from "./components/product-list"
import CategoriesList from "./components/category-list"

export default async function Products() {
  const { products, categories } = await getData()

  return (
    <div className="flex flex-1 max-md:flex-col-reverse  h-full gap-8 md:overflow-hidden max-md:overflow-y-auto">

      <ProductList />


      <Card className='p-5 md:max-w-[355px] max-md:max-h-fit w-full h-full min-h-fit max-md:min-h-[300px] overflow-hidden'>
        <div className="flex w-full justify-between items-center">
          <h2 className='text-lg font-bold leading-none'>Categorias</h2>
          <ModalAddCategory />
        </div>
        <CategoriesList />
      </Card>
    </div>
  )
}
