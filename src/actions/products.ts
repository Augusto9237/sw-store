"use server";
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface ProductProps {
    id?: string;
    name: string;
    slug: string;
    description: string;
    categoryId: string;
    imageUrls: string[];
    basePrice: number;
    discountPercentage?: number;
}


export async function getData(name?: string, take?: number) {
    const products = await prismaClient.product.findMany({
        take,
        where: {
            name: {
                contains: name,
                mode: 'insensitive'
            }
        }
    })
    const categories = await prismaClient.category.findMany()

    revalidatePath('/products')

    return { products, categories }
}

export const createProduct = async (product: ProductProps) => {
    await prismaClient.product.create({
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

    return revalidatePath('/products');
};

export const updateProduct = async (product: ProductProps) => {
    await prismaClient.product.update({
        where: {
            id: product.id,
        },
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

    return revalidatePath('/products');
};

export const deleteProduct = async (id: string) => {
    await prismaClient.product.delete({
        where: {
            id: id,
        }
    });

    return revalidatePath('/products');
}