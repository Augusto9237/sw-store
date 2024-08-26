import { prismaClient } from "@/lib/prisma";
import CategoryItem from "./category-item";

const Categories = async () => {
    const categories = await prismaClient.category.findMany({})
    return (
        <div className="flex overflow-x-auto sm:overflow-hidden gap-4">
            {categories.map(category => <CategoryItem key={category.id} category={category} />)}
        </div>
    );
}

export default Categories;