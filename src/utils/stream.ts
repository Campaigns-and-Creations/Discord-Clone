import { StreamClient } from "@stream-io/node-sdk";

let streamClient: StreamClient | null = null;

function readRequiredEnv(name: "STREAM_API_KEY" | "STREAM_SECRET"): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getStreamConfig() {
  return {
    apiKey: readRequiredEnv("STREAM_API_KEY"),
    secret: readRequiredEnv("STREAM_SECRET"),
  };
}

export function getStreamServerClient(): StreamClient {
  if (streamClient) {
    return streamClient;
  }

  const { apiKey, secret } = getStreamConfig();
  streamClient = new StreamClient(apiKey, secret);
  return streamClient;
}

export function createStreamUserToken(userId: string): string {
  const client = getStreamServerClient();
  return client.generateUserToken({
    user_id: userId,
    validity_in_seconds: 60 * 60,
  });
}
