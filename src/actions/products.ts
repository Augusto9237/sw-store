"use server";
import { prismaClient } from "@/lib/prisma";

interface CategoryProps {
    id?: string;
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    imageUrls: string[];
    basePrice: number;
    discountPercentage?: number;
}

export const createProduct = async (
    product: CategoryProps
) => {
    const createdProduct = await prismaClient.product.create({
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

    return createdProduct;
};

export const deleteProduct = async (id: string) => {
    const deletedProduct = await prismaClient.product.delete({
        where: {
            id: id,
        }
    });

    return deletedProduct;
}