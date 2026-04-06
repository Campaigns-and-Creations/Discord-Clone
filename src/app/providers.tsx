"use client";

import * as React from "react";

import { MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export interface ProvidersProps {
  children: React.ReactNode;
}

export const Providers = ({ children }: ProvidersProps) => {
  const isProduction = process.env.NEXT_PUBLIC_VERCEL_ENV === "production";

  // In production, don't wrap with ClerkProvider
  if (isProduction) {
    return (
      <MantineProvider defaultColorScheme="dark">
        <ModalsProvider>
          <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </ModalsProvider>
      </MantineProvider>
    );
  }

  // In development, include ClerkProvider
  return (
    <MantineProvider defaultColorScheme="dark">
      <ModalsProvider>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </ModalsProvider>
    </MantineProvider>
  );
};