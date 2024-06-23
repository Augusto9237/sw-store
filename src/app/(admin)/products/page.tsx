import ProductList from "./components/product-list"
import CategoriesList from "./components/category-list"

export default async function Products() {

  return (
    <div className="flex w-full max-lg:flex-col  h-full gap-8 max-lg:overflow-y-auto">
      <ProductList />
      <CategoriesList />
    </div>
  )
}
