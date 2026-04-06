# Discord Clone

This project is a custom Discord clone built with Next.js, Prisma, and Postgres.

## Run In Dev Mode

1. Set environment variables:
	- In `.env`, set `DATABASE_URL`.
	- In `.env.local`, set the other required app variables.
	- If you do not have the values, ask Diego for the env variables.
2. Open `prisma/seed.ts` and set the seeded user email to your own email address.
3. Run:

```bash
npm i
npm run db:reset
```

4. In VS Code, press `Ctrl + Shift + B` to run the project tasks.
