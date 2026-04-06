"use client";

import { useQuery } from "@tanstack/react-query";
import { getUsers } from "./actions";
import { User } from "@/generated/prisma/client";

export default function Home() {
  const { data: users, isLoading: isLoadingUsers } = useQuery({
    queryFn: async () => (await getUsers()) as User[],
    queryKey: ["users"],
  });

  return (
    <div className="flex min-h-[100svh] min-w-[100svw] flex-col items-center justify-center bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-100">
      <main className="flex min-h-[100svh] min-w-[100svw] flex-col items-center justify-center bg-white px-16 py-32 dark:bg-black sm:items-start">
        {isLoadingUsers ? (
          <p>Loading users...</p>
        ) : (
          <ul>
            {users?.map((user) => (
              <li key={user.id}>{user.name}</li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
