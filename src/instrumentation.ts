import { logger } from "./utils/logger";

const REQUIRED_ENV_VARIABLES = [
    "BETTER_AUTH_SECRET",
    "BETTER_AUTH_URL",
    "STREAM_API_KEY",
    "STREAM_SECRET",
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "SUPABASE_SERVICE_ROLE_KEY",
    "REDIS_URL",
];

export async function register() {
    if (process.env.NEXT_RUNTIME !== "nodejs") {
        return;
    }

    const missing = getMissingVariables(REQUIRED_ENV_VARIABLES);

    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(", ")}`);
    }

    logger.info({
        checkedVariableCount: REQUIRED_ENV_VARIABLES.length,
        context: "instrumentation.env_validation.succeeded",
        message: "Environment variable validation succeeded at startup",
    });
}

function getMissingVariables(variables: readonly string[]): string[] {
    return variables.filter((name) => {
        const value = process.env[name];
        return typeof value !== "string" || value.trim().length === 0;
    });
}