import { prisma } from "@/utils/prisma";

export class UserDal {
  static async getById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
      },
    });
  }

  static async getByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        image: true,
        email: true,
      },
    });
  }
}
