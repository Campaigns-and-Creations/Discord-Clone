"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { signUp, useSession } from "@/utils/auth-client";

export default function SignUpPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session, isPending } = useSession();
    const nextPath = searchParams.get("next") || "/";
    const signInPath = `/auth/sign-in?next=${encodeURIComponent(nextPath)}`;

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (session?.user) {
            router.replace(nextPath);
        }
    }, [nextPath, router, session]);

    async function onSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);

        try {
            const result = await signUp.email({
                callbackURL: signInPath,
                email,
                name,
                password,
            });

            if (result?.error) {
                setError(result.error.message || "Sign up failed.");
                return;
            }

            router.push(signInPath);
        } catch (submitError) {
            setError(submitError instanceof Error ? submitError.message : "Sign up failed.");
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <main className="flex min-h-[100svh] items-center justify-center bg-zinc-50 px-6 py-10 text-zinc-900">
            <section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
                <h1 className="text-2xl font-semibold">Sign up</h1>
                <p className="mt-1 text-sm text-zinc-600">Create your Better Auth account.</p>

                <form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
                    <label className="flex flex-col gap-1 text-sm">
                        Name
                        <input
                            autoComplete="name"
                            className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
                            disabled={isPending || isSubmitting}
                            onChange={(event) => setName(event.target.value)}
                            required
                            type="text"
                            value={name}
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm">
                        Email
                        <input
                            autoComplete="email"
                            className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
                            disabled={isPending || isSubmitting}
                            onChange={(event) => setEmail(event.target.value)}
                            required
                            type="email"
                            value={email}
                        />
                    </label>

                    <label className="flex flex-col gap-1 text-sm">
                        Password
                        <input
                            autoComplete="new-password"
                            className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
                            disabled={isPending || isSubmitting}
                            minLength={8}
                            onChange={(event) => setPassword(event.target.value)}
                            required
                            type="password"
                            value={password}
                        />
                    </label>

                    {error && <p className="text-sm text-red-600">{error}</p>}

                    <button
                        className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
                        disabled={isPending || isSubmitting}
                        type="submit"
                    >
                        {isSubmitting ? "Creating account..." : "Create account"}
                    </button>
                </form>

                <p className="mt-4 text-sm text-zinc-600">
                    Already have an account?{" "}
                    <Link className="font-medium text-zinc-900 underline" href={signInPath}>
                        Sign in
                    </Link>
                </p>
            </section>
        </main>
    );
}
