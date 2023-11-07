"use server";
import { prismaClient } from "@/lib/prisma";

interface CategoryProps {
    id?: string;
    name: string;
    slug: string;
    imageUrl: string;
}

export const createCategory = async (
    category: CategoryProps
) => {
    const Category = await prismaClient.category.create({
        data: {
            name: category.name,
            slug: category.slug,
            imageUrl: category.imageUrl
        },
    });

    return Category;
};