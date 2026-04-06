import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

type SessionResult = Awaited<ReturnType<typeof auth.api.getSession>>;

export async function getServerSession(): Promise<SessionResult> {
    return auth.api.getSession({
        headers: await headers(),
    });
}

export async function requireSession(): Promise<NonNullable<SessionResult>> {
    const session = await getServerSession();

    if (!session) {
        redirect("/auth/sign-in");
    }

    return session;
}

export async function requireUser() {
    const session = await requireSession();
    return session.user;
}

export async function getServerUser() {
    const session = await getServerSession();
    return session?.user ?? null;
}
