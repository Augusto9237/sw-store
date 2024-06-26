"use server"
import { prismaClient } from "@/lib/prisma";

export async function getCustomers(name?: string) {
  const customers = await prismaClient.user.findMany({
    where: {
      name: {
        contains: name,
        mode: 'insensitive'
      }
    }
  });

  return { customers };
}