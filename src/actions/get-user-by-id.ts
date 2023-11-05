'use server'

import { prismaClient } from "@/lib/prisma";

export async function GetUserById(id: string) {
    const user = await prismaClient.user.findUnique({
        where: {
            id: id
        }
    });

    return user;
}