import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";
import { hashPassword } from "better-auth/crypto";

const adapter = new PrismaPg(
    { connectionString: process.env.DATABASE_URL }
);
const prisma = new PrismaClient({ adapter });

async function main() {
    const email = "goethalsdiego@gmail.com";
    const password = "test123!";

    const user = await prisma.user.upsert({
        where: { email },
        update: {
            emailVerified: true,
            name: "Diego Goethals",
        },
        create: {
            email,
            emailVerified: true,
            name: "Diego Goethals",
        },
    });

    const hashedPassword = await hashPassword(password);

    await prisma.account.deleteMany({
        where: {
            providerId: "credential",
            userId: user.id,
        },
    });

    await prisma.account.create({
        data: {
            accountId: user.id,
            password: hashedPassword,
            providerId: "credential",
            userId: user.id,
        },
    });

    console.log("Seeded Better Auth user:", email);
    console.log("Seeded Better Auth password:", password);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });