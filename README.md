# Discord Clone

This project is a custom Discord clone built with Next.js, Prisma, and Postgres.

## Run In Dev Mode

1. Set environment variables:
	- In `.env`, set `DATABASE_URL`.
	- In `.env.local`, set the other required app variables:
		- `BETTER_AUTH_SECRET`
		- `BETTER_AUTH_URL`
		- `STREAM_API_KEY`
		- `STREAM_SECRET`
		- `NEXT_PUBLIC_SUPABASE_URL`
		- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
		- `SUPABASE_SERVICE_ROLE_KEY`
	- If you do not have the values, ask Diego for the env variables.
	- Ensure Supabase Storage has a private bucket named `pictures`.
2. Open `prisma/seed.ts` and set the seeded user email to your own email address.
3. Run:

```bash
npm i
npm run db:reset
```

4. In VS Code, press `Ctrl + Shift + B` to run the project tasks.
