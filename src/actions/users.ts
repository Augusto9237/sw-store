"use server"
import { prismaClient } from "@/lib/prisma";

export async function getUsers() {
  const users = await prismaClient.user.findMany();

  return {users};
}