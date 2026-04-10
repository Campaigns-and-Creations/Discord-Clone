"use client";

import { AppImage } from "@/app/components/app-image";
import { Box, Text } from "@mantine/core";

const SIZE_BY_TOKEN: Record<string, number> = {
  xs: 20,
  sm: 28,
  md: 36,
  lg: 44,
  xl: 56,
};

const RADIUS_BY_TOKEN: Record<string, string> = {
  xs: "4px",
  sm: "6px",
  md: "8px",
  lg: "10px",
  xl: "9999px",
};

type ProfileAvatarProps = {
  src: string | null;
  name: string;
  size?: number | "xs" | "sm" | "md" | "lg" | "xl";
  radius?: "xs" | "sm" | "md" | "lg" | "xl";
};

function resolveSize(size: ProfileAvatarProps["size"]): number {
  if (typeof size === "number") {
    return size;
  }

  if (!size) {
    return SIZE_BY_TOKEN.md;
  }

  return SIZE_BY_TOKEN[size] ?? SIZE_BY_TOKEN.md;
}

function resolveRadius(radius: ProfileAvatarProps["radius"]): string {
  if (!radius) {
    return RADIUS_BY_TOKEN.xl;
  }

  return RADIUS_BY_TOKEN[radius] ?? RADIUS_BY_TOKEN.xl;
}

function getInitials(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) {
    return "?";
  }

  return trimmed
    .split(" ")
    .filter((part) => part.length > 0)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}

export function ProfileAvatar({ src, name, size = "md", radius = "xl" }: ProfileAvatarProps) {
  const pixelSize = resolveSize(size);
  const borderRadius = resolveRadius(radius);
  const initials = getInitials(name);

  return (
    <Box
      style={{
        width: pixelSize,
        height: pixelSize,
        minWidth: pixelSize,
        minHeight: pixelSize,
        borderRadius,
        overflow: "hidden",
        backgroundColor: "#364fc7",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {src ? (
        <AppImage
          src={src}
          alt={name}
          width={pixelSize}
          height={pixelSize}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      ) : (
        <Text size="xs" fw={700} c="white" style={{ lineHeight: 1 }}>
          {initials}
        </Text>
      )}
    </Box>
  );
}
