import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./category-item";

const Categories = async () => {
    const categories = await prismaClient.category.findMany({})
    return (
        <div className="grid grid-cols-2 md:grid-cols-none md:flex w-full md:justify-between  gap-y-2 gap-x-4 md:gap-x-3">
            {categories.map(category => <CategoryItem key={category.id} category={category} />)}
        </div>
    );
}

export default Categories;