"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

import { signIn, useSession } from "@/utils/auth-client";

export default function SignInPage() {
	const router = useRouter();
	const { data: session, isPending } = useSession();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);

	useEffect(() => {
		if (session?.user) {
			router.replace("/welcome");
		}
	}, [router, session]);

	async function onSubmit(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setError(null);
		setIsSubmitting(true);

		try {
			const result = await signIn.email({
				callbackURL: "/welcome",
				email,
				password,
				rememberMe: true,
			});

			if (result?.error) {
				setError(result.error.message || "Invalid email or password.");
				return;
			}

			router.push("/welcome");
		} catch (submitError) {
			setError(submitError instanceof Error ? submitError.message : "Sign in failed.");
		} finally {
			setIsSubmitting(false);
		}
	}

	return (
		<main className="flex min-h-[100svh] items-center justify-center bg-zinc-50 px-6 py-10 text-zinc-900">
			<section className="w-full max-w-md rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
				<h1 className="text-2xl font-semibold">Sign in</h1>
				<p className="mt-1 text-sm text-zinc-600">Use your Better Auth email and password.</p>

				<form className="mt-6 flex flex-col gap-4" onSubmit={onSubmit}>
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
							autoComplete="current-password"
							className="rounded-md border border-zinc-300 px-3 py-2 outline-none focus:border-zinc-500"
							disabled={isPending || isSubmitting}
							onChange={(event) => setPassword(event.target.value)}
							required
							type="password"
							value={password}
						/>
					</label>

					{error ? <p className="text-sm text-red-600">{error}</p> : null}

					<button
						className="rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-60"
						disabled={isPending || isSubmitting}
						type="submit"
					>
						{isSubmitting ? "Signing in..." : "Sign in"}
					</button>
				</form>

				<p className="mt-4 text-sm text-zinc-600">
					No account yet?{" "}
					<Link className="font-medium text-zinc-900 underline" href="/auth/sign-up">
						Create one
					</Link>
				</p>
			</section>
		</main>
	);
}