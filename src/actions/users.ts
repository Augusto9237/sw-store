"use server"
import { prismaClient } from "@/lib/prisma";

export async function getUsers(name?: string) {
  const users = await prismaClient.user.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    }
  });

  return { users };
}