import { Permission } from "@/generated/prisma";

export const DEFAULT_SERVER_ROLES: Array<{
  name: string;
  position: number;
  permissions: Permission[];
}> = [
  {
    name: "Owner",
    position: 100,
    permissions: [Permission.ADMINISTRATOR],
  },
  {
    name: "Admin",
    position: 80,
    permissions: [
      Permission.MANAGE_SERVER,
      Permission.MANAGE_CHANNELS,
      Permission.CREATE_INVITE,
      Permission.MANAGE_MESSAGES,
      Permission.PIN_MESSAGES,
      Permission.MODERATE_MEMBERS,
      Permission.KICK_MEMBERS,
      Permission.BAN_MEMBERS,
      Permission.VIEW_CHANNEL,
      Permission.SEND_MESSAGES,
      Permission.READ_MESSAGE_HISTORY,
    ],
  },
  {
    name: "Moderator",
    position: 60,
    permissions: [
      Permission.CREATE_INVITE,
      Permission.MANAGE_MESSAGES,
      Permission.PIN_MESSAGES,
      Permission.MODERATE_MEMBERS,
      Permission.VIEW_CHANNEL,
      Permission.SEND_MESSAGES,
      Permission.READ_MESSAGE_HISTORY,
    ],
  },
  {
    name: "Member",
    position: 10,
    permissions: [
      Permission.VIEW_CHANNEL,
      Permission.SEND_MESSAGES,
      Permission.READ_MESSAGE_HISTORY,
    ],
  },
];
