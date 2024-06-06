import CategoriesList from "../products/components/category-list";


export default async function Categories() {

  return (
    <div className="flex flex-1 max-md:flex-col-reverse  h-full gap-8 md:overflow-hidden max-md:overflow-y-auto">
      <CategoriesList />
    </div>
  )
}
