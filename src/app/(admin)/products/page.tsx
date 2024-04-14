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
      <CategoriesList />
    </div>
  )
}
