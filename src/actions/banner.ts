'use server'
import { prismaClient } from "@/lib/prisma"
import { revalidatePath } from "next/cache";

interface Banner {
    id?: string;
    title: string;
    image: string;
    link: string;
}

export async function getBanners() {
    const banners = await prismaClient.banner.findMany()

    return { banners }
}

export async function createBanner(banner: Banner) {
    await prismaClient.banner.create({
        data: {
            title: banner.title,
            image: banner.image,
            link: banner.link
        },
    });

    return revalidatePath('/banners');
}