"use client";

import { Image as MantineImage, type ImageProps as MantineImageProps } from "@mantine/core";
import NextImage, { type ImageProps as NextImageProps } from "next/image";

type AppImageProps = Omit<MantineImageProps, "component"> & {
  unoptimized?: boolean;
} & Pick<NextImageProps, "src" | "alt" | "sizes"> & Partial<Pick<NextImageProps, "width" | "height">>;

export function AppImage({ unoptimized = true, width, height, ...props }: AppImageProps) {
  return (
    <MantineImage
      component={NextImage}
      unoptimized={unoptimized}
      fit="contain"
      width={width ?? 1}
      height={height ?? 1}
      {...props}
    />
  );
}
