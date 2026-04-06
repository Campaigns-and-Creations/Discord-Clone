import 'dotenv/config';
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@/generated/prisma";
import { hashPassword } from "better-auth/crypto";

const adapter = new PrismaPg(
    { connectionString: process.env.DATABASE_URL }
);
const prisma = new PrismaClient({ adapter });

const SERVERS_TO_SEED = [
    {
        name: "Pixel Guild",
        channels: [
            {
                name: "general-chat",
                hasMessages: true,
                messages: [
                    "Welcome to Pixel Guild. This is where we share design snapshots.",
                    "Daily check-in: what are you building today?",
                    "Remember to post your progress screenshots in the thread.",
                ],
            },
            {
                name: "quiet-lobby",
                hasMessages: false,
                messages: [],
            },
        ],
    },
    {
        name: "Code Harbor",
        channels: [
            {
                name: "dev-log",
                hasMessages: true,
                messages: [
                    "Ship log #1: auth flow has been integrated successfully.",
                    "Ship log #2: Prisma migrations are stable on local Docker.",
                    "Ship log #3: next up is polishing the channel overview UI.",
                ],
            },
            {
                name: "ideas-dock",
                hasMessages: false,
                messages: [],
            },
        ],
    },
] as const;

function getMessageTimestamp(base: Date, offsetMinutes: number): Date {
    return new Date(base.getTime() + offsetMinutes * 60_000);
}

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

    const existingServers = await prisma.server.findMany({
        where: {
            name: {
                in: SERVERS_TO_SEED.map((server) => server.name),
            },
        },
        select: {
            id: true,
        },
    });

    if (existingServers.length > 0) {
        const existingServerIds = existingServers.map((server) => server.id);

        const existingChannels = await prisma.channel.findMany({
            where: {
                serverId: {
                    in: existingServerIds,
                },
            },
            select: {
                id: true,
            },
        });

        await prisma.messages.deleteMany({
            where: {
                channelId: {
                    in: existingChannels.map((channel) => channel.id),
                },
            },
        });

        await prisma.serverMember.deleteMany({
            where: {
                serverId: {
                    in: existingServerIds,
                },
            },
        });

        await prisma.serverRoles.deleteMany({
            where: {
                serverId: {
                    in: existingServerIds,
                },
            },
        });

        await prisma.channel.deleteMany({
            where: {
                serverId: {
                    in: existingServerIds,
                },
            },
        });

        await prisma.server.deleteMany({
            where: {
                id: {
                    in: existingServerIds,
                },
            },
        });
    }

    for (const [serverIndex, serverSeed] of SERVERS_TO_SEED.entries()) {
        const server = await prisma.server.create({
            data: {
                name: serverSeed.name,
                picture: null,
            },
        });

        const member = await prisma.serverMember.create({
            data: {
                userId: user.id,
                serverId: server.id,
            },
        });

        const adminRole = await prisma.serverRoles.create({
            data: {
                name: "Admin",
                serverId: server.id,
            },
        });

        await prisma.serverMember.update({
            where: {
                id: member.id,
            },
            data: {
                serverRoles: {
                    connect: {
                        id: adminRole.id,
                    },
                },
            },
        });

        for (const [channelIndex, channelSeed] of serverSeed.channels.entries()) {
            const channel = await prisma.channel.create({
                data: {
                    name: channelSeed.name,
                    serverId: server.id,
                    type: "TEXT",
                },
            });

            if (!channelSeed.hasMessages) {
                continue;
            }

            const baseTime = new Date(Date.UTC(2026, 0, serverIndex + 1, 12, channelIndex * 10));

            await prisma.messages.createMany({
                data: channelSeed.messages.map((content, messageIndex) => ({
                    content,
                    channelId: channel.id,
                    authorId: user.id,
                    createdAt: getMessageTimestamp(baseTime, messageIndex * 3),
                    pinned: false,
                })),
            });
        }
    }

    console.log("Seeded Better Auth user:", email);
    console.log("Seeded Better Auth password:", password);
    console.log("Seeded servers:", SERVERS_TO_SEED.map((server) => server.name).join(", "));
    console.log("Each server has 2 text channels; one channel is intentionally empty.");
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });