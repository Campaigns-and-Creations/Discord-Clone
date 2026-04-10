import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          if (typeof user.name === "string") {
            const normalizedName = user.name.replace(/\s+/gu, "").trim();

            if (!normalizedName) {
              throw new Error("Username is required.");
            }

            return {
              data: {
                ...user,
                name: normalizedName,
              },
            };
          }

          return {
            data: user,
          };
        },
      },
      update: {
        async before(user) {
          if (typeof user.name === "string") {
            const normalizedName = user.name.replace(/\s+/gu, "").trim();

            if (!normalizedName) {
              throw new Error("Username is required.");
            }

            return {
              data: {
                ...user,
                name: normalizedName,
              },
            };
          }

          return {
            data: user,
          };
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});