import pino from "pino";

export const logger = pino({
    level: process.env.NODE_ENV || "development" ? "debug" : "info",
    transport: 
        process.env.NODE_ENV === "development"
            ? {
                options: {
                    colorize: true,
                },
                target: "pino-pretty",
            }
            : undefined,
});