import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    category: Category
}

export default function CategoryItem({ category }: CategoryItemProps) {
    return (
        <Link href={`/category/${category.slug}`}>
            <div className="flex flex-col">
                <div className="flex w-full h-[150px] md:min-h-[185px] items-center justify-center rounded-tl-lg rounded-tr-lg  bg-gradient-to-tr from-primary to-primary/20">
                    <Image
                        src={category.imageUrl}
                        alt={category.name}
                        width={0}
                        height={0}
                        sizes="100vw"
                        className="h-[90px] max-h-[70%] w-auto max-w-[80%]"
                        style={{
                            objectFit: 'contain'
                        }}
                    />
                </div>
                <div className="bg-accent py-2 rounded-bl-lg rounded-br-lg">
                    <p className="text-center text-sm font-semibold">{category.name}</p>
                </div>
            </div>
        </Link>
    );
}