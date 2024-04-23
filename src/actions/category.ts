"use server";
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

interface CategoryProps {
    id?: string;
    name: string;
    slug: string;
    imageUrl: string;
}

export async function getCategories() {
    const categories = await prismaClient.category.findMany()

    return { categories }
}

export const createCategory = async (
    category: CategoryProps
) => {
    await prismaClient.category.create({
        data: {
            name: category.name,
            slug: category.slug,
            imageUrl: category.imageUrl
        },
    });

    return revalidatePath('/products');
};

export const updateCategory = async (
    category: CategoryProps
) => {
    await prismaClient.category.update({
        where: {
            id: category.id
        },
        data: {
            name: category.name,
            slug: category.slug,
            imageUrl: category.imageUrl
        },
    });
};

export const deleteCategory = async (id: string) => {
    await prismaClient.category.delete({
        where: {
            id: id,
        }
    });

    return revalidatePath('/products');
}