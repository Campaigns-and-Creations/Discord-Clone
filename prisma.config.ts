import path from 'path'
import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

const baseUrl = (() => {
    const fromProcess = process.env.DATABASE_URL?.trim();
    if (fromProcess && fromProcess.length > 0) {
        return fromProcess;
    }
    return env("DATABASE_URL");
})();

const datasourceUrl = baseUrl;

export default defineConfig({
    datasource: {
        url: datasourceUrl,
    },
    migrations: {
        path: path.join("prisma", 'migrations'),
        seed: "npm run db:seed",
    },
    schema: path.join("prisma", 'schema'),
})