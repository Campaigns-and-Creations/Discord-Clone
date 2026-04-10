import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";

const USERNAME_WHITESPACE_REGEX = /\s/;

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
  databaseHooks: {
    user: {
      create: {
        async before(user) {
          if (typeof user.name === "string" && USERNAME_WHITESPACE_REGEX.test(user.name)) {
            throw new Error("Username cannot contain whitespace.");
          }

          return {
            data: user,
          };
        },
      },
      update: {
        async before(user) {
          if (typeof user.name === "string" && USERNAME_WHITESPACE_REGEX.test(user.name)) {
            throw new Error("Username cannot contain whitespace.");
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