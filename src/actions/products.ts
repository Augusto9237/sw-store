"use server";
import { prismaClient } from "@/lib/prisma";

interface CategoryProps {
    id?: string;
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    imageUrls: [];
    basePrice: number;
    discountPercentage: number;
}

export const createCategory = async (
    product: CategoryProps
) => {
    const Category = await prismaClient.product.create({
        data: {
            name: product.name,
            slug: product.slug,
            description: product.description,
            categoryId: product.categoryId,
            imageUrls: product.imageUrls,
            basePrice: product.basePrice,
            discountPercentage: product.discountPercentage,
        },
    });

    return Category;
};