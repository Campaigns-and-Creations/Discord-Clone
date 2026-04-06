import Link from "next/link";
import { redirect } from "next/navigation";

import { InviteDal } from "@/dal/invite";
import { getServerUser } from "@/utils/session";

type InvitePageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function InvitePage({ params }: InvitePageProps) {
  const { code } = await params;
  const inviteCode = code.trim();
  const invitePath = `/invite/${encodeURIComponent(inviteCode)}`;
  const invite = await InviteDal.getByCode(inviteCode);
  const sessionUser = await getServerUser();

  if (!invite) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-zinc-50 px-6 py-10 text-zinc-900">
        <section className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Invite not found</h1>
          <p className="mt-2 text-sm text-zinc-600">
            This invite link is invalid or no longer exists.
          </p>
          <div className="mt-6">
            <Link className="font-medium text-zinc-900 underline" href="/">
              Go to home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const now = new Date();
  const isExpired = Boolean(invite.expiresAt && invite.expiresAt <= now);
  const isExhausted = invite.maxUses !== null && invite.currentUses >= invite.maxUses;
  const inviteActive = !isExpired && !isExhausted;
  const inactiveReason = isExpired
    ? "Invite has expired."
    : isExhausted
      ? "Invite has reached the usage limit."
      : "This invite cannot be used.";

  if (!inviteActive) {
    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-zinc-50 px-6 py-10 text-zinc-900">
        <section className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">This invite is no longer active</h1>
          <p className="mt-2 text-sm text-zinc-600">{inactiveReason}</p>
          <p className="mt-4 text-sm text-zinc-700">
            Server: <span className="font-semibold">{invite.server.name}</span>
          </p>
          <div className="mt-6">
            <Link className="font-medium text-zinc-900 underline" href="/">
              Go to home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  if (!sessionUser) {
    const nextParam = encodeURIComponent(invitePath);

    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-zinc-50 px-6 py-10 text-zinc-900">
        <section className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">You are invited to join {invite.server.name}</h1>
          <p className="mt-2 text-sm text-zinc-600">
            Sign in or create an account to accept this invite.
          </p>

          <div className="mt-6 flex gap-3">
            <Link
              className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white"
              href={`/auth/sign-in?next=${nextParam}`}
            >
              Sign in
            </Link>
            <Link
              className="rounded-md border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-900"
              href={`/auth/sign-up?next=${nextParam}`}
            >
              Create account
            </Link>
          </div>
        </section>
      </main>
    );
  }

  try {
    await InviteDal.redeemInvite(inviteCode, sessionUser.id);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Could not join this server.";

    return (
      <main className="flex min-h-[100svh] items-center justify-center bg-zinc-50 px-6 py-10 text-zinc-900">
        <section className="w-full max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-semibold">Could not join server</h1>
          <p className="mt-2 text-sm text-zinc-600">{errorMessage}</p>
          <div className="mt-6">
            <Link className="font-medium text-zinc-900 underline" href="/">
              Go to home
            </Link>
          </div>
        </section>
      </main>
    );
  }

  redirect("/");
}
