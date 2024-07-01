import ProductList from "./components/product-list"
import CategoriesList from "./components/category-list"

export default async function Products() {

  return (
    <div className="flex w-full max-lg:flex-col  h-full gap-8 max-sm:gap-4">
      <ProductList />

      <div className="max-md:pb-4 lg:max-w-[355px] w-full">
        <CategoriesList />
      </div>
    </div>
  )
}
