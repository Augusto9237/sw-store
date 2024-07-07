import ProductList from "./components/product-list"

export default async function Products() {

  return (
    <div className="flex w-full max-lg:flex-col  h-full gap-8 max-sm:gap-4">
      <ProductList />
    </div>
  )
}
