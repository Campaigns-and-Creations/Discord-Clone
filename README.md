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
		- `REDIS_URL` (optional in local dev; defaults to `redis://127.0.0.1:6379`)
	- If you do not have the values, ask Diego for the env variables.
	- Ensure Supabase Storage has a private bucket named `pictures`.
2. Open `prisma/seed.ts` and set the seeded user email to your own email address.
3. Run:

```bash
npm i
npm run db:reset
```

4. In VS Code, press `Ctrl + Shift + B` to run the project tasks.

## Redis Setup (Step By Step)

### Local Docker Redis

1. Start local services:

```bash
docker compose up -d
```

2. Add this to `.env.local` (recommended even in local so the value is explicit):

```bash
REDIS_URL="redis://127.0.0.1:6379"
```

3. Start the app and trigger a voice/screenshare action.

4. Optional quick Redis check:

```bash
docker compose exec redis redis-cli KEYS "stream:room:*"
```

If stream state is active, you should see keys matching the `stream:room:*` pattern.

### Hosted Redis (Production)

1. Create a Redis database in your provider (Upstash, Redis Cloud, or equivalent).

2. Copy the provider connection URL.

3. Set `REDIS_URL` in your deployment environment (for example Vercel project env vars).

4. Redeploy the app.

### Validate That It Works

1. Open two browser sessions with different users in the same voice channel.
2. Start screenshare from one user.
3. Watch/unwatch from the other user.
4. Confirm watcher list updates immediately without periodic polling.
5. Confirm both users stay in sync even if requests hit different app instances.
