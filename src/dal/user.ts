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

  static async updateImage(userId: string, image: string | null) {
    return prisma.user.update({
      where: { id: userId },
      data: { image },
      select: {
        id: true,
        image: true,
      },
    });
  }
}
