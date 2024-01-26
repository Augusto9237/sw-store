import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";
import Link from "next/link";

interface CategoryItemProps {
    category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {

    return (
        <Link href={`/category/${category.slug}`} className=" flex border border-input bg-background hover:bg-accent hover:text-accent-foreground w-full justify-center items-center py-3 gap-2 rounded-lg">

            {CATEGORY_ICON[category.slug as keyof typeof CATEGORY_ICON]}
            <span className="font-bold text-xs">
                {category.name}
            </span>

        </Link>
    );
}

