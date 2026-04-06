import { Permission } from "@/generated/prisma/client";
import { ChannelDal } from "@/dal/channel";
import { ServerRolesDal } from "@/dal/serverRoles";

type MembershipPermissions = {
  memberId: string;
  roleNames: string[];
  permissions: Permission[];
  highestRolePosition: number;
  isOwner: boolean;
};

export async function getMembershipPermissions(
  userId: string,
  serverId: string,
): Promise<MembershipPermissions | null> {
  const membership = await ServerRolesDal.listForUserInServer(userId, serverId);

  if (!membership) {
    return null;
  }

  const isOwner = membership.serverRoles.some((role) => role.name === "Owner");
  const permissionsSet = new Set<Permission>();

  for (const role of membership.serverRoles) {
    for (const item of role.permissions) {
      permissionsSet.add(item.permission);
    }
  }

  if (isOwner) {
    permissionsSet.add(Permission.ADMINISTRATOR);
  }

  const permissions = Array.from(permissionsSet);
  const highestRolePosition = membership.serverRoles[0]?.position ?? 0;

  return {
    memberId: membership.id,
    roleNames: membership.serverRoles.map((role) => role.name),
    permissions,
    highestRolePosition,
    isOwner,
  };
}

export async function hasServerPermission(
  userId: string,
  serverId: string,
  permission: Permission,
): Promise<boolean> {
  const membership = await getMembershipPermissions(userId, serverId);

  if (!membership) {
    return false;
  }

  return (
    membership.isOwner ||
    membership.permissions.includes(Permission.ADMINISTRATOR) ||
    membership.permissions.includes(permission)
  );
}

export async function canAccessChannel(
  userId: string,
  serverId: string,
  channelId: string,
): Promise<boolean> {
  const [membership, channel] = await Promise.all([
    ServerRolesDal.listForUserInServer(userId, serverId),
    ChannelDal.findById(channelId),
  ]);

  if (!membership || !channel || channel.serverId !== serverId) {
    return false;
  }

  if (membership.serverRoles.some((role) => role.name === "Owner")) {
    return true;
  }

  const memberPermissions = new Set<Permission>();
  for (const role of membership.serverRoles) {
    for (const item of role.permissions) {
      memberPermissions.add(item.permission);
    }
  }

  if (memberPermissions.has(Permission.ADMINISTRATOR)) {
    return true;
  }

  if (channel.isPublic) {
    return true;
  }

  if (memberPermissions.has(Permission.VIEW_CHANNEL)) {
    const roleIds = new Set(membership.serverRoles.map((role) => role.id));
    return channel.allowedRoles.some((access) => roleIds.has(access.roleId));
  }

  return false;
}

export async function canModerateTarget(
  actorUserId: string,
  targetUserId: string,
  serverId: string,
): Promise<boolean> {
  if (actorUserId === targetUserId) {
    return false;
  }

  const [actorMembership, targetMembership] = await Promise.all([
    getMembershipPermissions(actorUserId, serverId),
    getMembershipPermissions(targetUserId, serverId),
  ]);

  if (!actorMembership || !targetMembership) {
    return false;
  }

  if (actorMembership.isOwner) {
    return true;
  }

  if (targetMembership.isOwner) {
    return false;
  }

  return actorMembership.highestRolePosition > targetMembership.highestRolePosition;
}
