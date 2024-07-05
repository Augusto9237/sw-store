import CategoryInfo from "./components/category-info";
import CategoriesList from "./components/category-list";

export default function Categories() {

    return (
        <div className="flex w-full max-xl:flex-col  h-full gap-8 max-sm:gap-4">
            <CategoriesList />
            <CategoryInfo />
        </div>
    )
}