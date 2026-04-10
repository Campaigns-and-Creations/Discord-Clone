"use client";

import { Image as MantineImage, type ImageProps as MantineImageProps } from "@mantine/core";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

type AppImageProps = Omit<MantineImageProps, "component"> & {
  unoptimized?: boolean;
} & Pick<NextImageProps, "src" | "alt" | "width" | "height" | "sizes">;

export function AppImage({ unoptimized = true, ...props }: AppImageProps) {
  return <MantineImage component={NextImage} unoptimized={unoptimized} {...props} />;
}
