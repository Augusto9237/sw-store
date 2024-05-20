"use server"
import { prismaClient } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { hashSync } from 'bcrypt-ts'

interface UserTeamProps {
    id?: string;
    name: string;
    email: string;
    password: string;
    role: string
}

export async function getUsersTeam() {
    const userTeam = await prismaClient.userTeam.findMany()

    return { userTeam }
}

export const createUserTeam = async (
    user: UserTeamProps
) => {
    await prismaClient.userTeam.create({
        data: {
            name: user.name,
            email: user.email,
            password: hashSync(user.password),
            role: user.role
        },
    });

    return revalidatePath('/team');
};