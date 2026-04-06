"use client";

import * as React from "react";

import { MantineProvider } from "@mantine/core";
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
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </MantineProvider>
    );
  }

  // In development, include ClerkProvider
  return (
      <MantineProvider defaultColorScheme="dark">
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
      </MantineProvider>
  );
};