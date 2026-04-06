"use server";

import { prisma } from "@/utils/prisma";

export async function getUsers() {
  const users = await prisma.user.findMany();
  return users;
}