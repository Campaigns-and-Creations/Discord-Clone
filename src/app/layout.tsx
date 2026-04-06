import type { Metadata } from "next";

import { ColorSchemeScript } from "@mantine/core";
import { Inter } from "next/font/google";

import { Providers } from "./providers";

import "./globals.css";
import "@mantine/core/styles.css";
import "@stream-io/video-react-sdk/dist/css/styles.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description:
    "Discord clone",
  title: "Discord Clone",
  keywords:
    "discord, clone, chat, messaging, real-time, communication, social, app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="any" />
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}