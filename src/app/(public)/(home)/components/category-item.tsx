import { CATEGORY_ICON } from "@/constants/category-icon";
import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {

    return (
        <Link href={`/category/${category.slug}`} className="flex flex-col items-center" >
            <div className="flex border border-input bg-gradient-to-tr  from-primary to-primary/20 hover:bg-gradient-to-tr hover:from-primary/80 hover:to-primary/10 hover:text-accent-foreground  justify-center items-center rounded-full w-16 sm:w-20 h-16 sm:h-20 p-1">
                <Image
                    src={category.imageUrl}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto object-contain"
                    alt={category.name}
                />
            </div>
            <span className="font-bold text-sm">
                {category.name}
            </span>
        </Link>
    );
}

