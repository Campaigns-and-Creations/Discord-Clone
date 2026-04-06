import type { HomePageData } from "./home-types";
import HomeClient from "./home-client";
import { headers } from "next/headers";

async function getInitialHomeData(): Promise<HomePageData> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host");

  if (!host) {
    throw new Error("Missing host header.");
  }

  const protocol = requestHeaders.get("x-forwarded-proto") ?? "http";
  const cookie = requestHeaders.get("cookie") ?? "";

  const response = await fetch(`${protocol}://${host}/api/discord/home-data`, {
    headers: {
      cookie,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load home data.");
  }

  return (await response.json()) as HomePageData;
}

export default async function HomePage() {
  const data = await getInitialHomeData();

  return <HomeClient initialData={data} />;
}
