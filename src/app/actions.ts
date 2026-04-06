"use server";

import { ServerDal } from "@/dal/server";
import { requireUser } from "@/utils/session";
import type { HomeServer } from "@/app/home-types";

function toIsoString(value: Date): string {
  return value.toISOString();
}

export async function createServer(serverName: string): Promise<HomeServer> {
  const sessionUser = await requireUser();
  const normalizedName = serverName.trim();

  if (!normalizedName) {
    throw new Error("Server name is required.");
  }

  if (normalizedName.length > 60) {
    throw new Error("Server name must be at most 60 characters.");
  }

  const result = await ServerDal.createForOwner(sessionUser.id, normalizedName);

  return {
    id: result.server.id,
    name: result.server.name,
    picture: result.server.picture,
    createdAt: toIsoString(result.server.createdAt),
    membershipId: result.membershipId,
    roleNames: [result.ownerRole.name],
    channels: [
      {
        id: result.generalChannel.id,
        name: result.generalChannel.name,
        type: result.generalChannel.type,
        createdAt: toIsoString(result.generalChannel.createdAt),
        serverId: result.generalChannel.serverId,
        messages: [],
      },
    ],
  };
}