import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const PICTURES_BUCKET = "pictures";
const SIGNED_URL_TTL_SECONDS = 60 * 60;

let supabaseClient: SupabaseClient | null = null;

function readRequiredEnv(name: "NEXT_PUBLIC_SUPABASE_URL" | "SUPABASE_SERVICE_ROLE_KEY"): string {
  const value = process.env[name];

  if (!value || value.trim().length === 0) {
    throw new Error(`Missing required environment variable: ${name}`);
  }

  return value;
}

export function getSupabaseConfig() {
  return {
    url: readRequiredEnv("NEXT_PUBLIC_SUPABASE_URL"),
    serviceRoleKey: readRequiredEnv("SUPABASE_SERVICE_ROLE_KEY"),
    bucket: PICTURES_BUCKET,
    signedUrlTtlSeconds: SIGNED_URL_TTL_SECONDS,
  };
}

export function getSupabaseServerClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  const { url, serviceRoleKey } = getSupabaseConfig();
  supabaseClient = createClient(url, serviceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabaseClient;
}

export function isStoredPicturePath(value: string | null | undefined): value is string {
  if (!value || value.trim().length === 0) {
    return false;
  }

  return !/^https?:\/\//i.test(value);
}

export async function uploadPictureObject(path: string, bytes: Uint8Array, contentType: string) {
  const client = getSupabaseServerClient();
  const { bucket } = getSupabaseConfig();
  const { error } = await client.storage.from(bucket).upload(path, bytes, {
    contentType,
    upsert: false,
  });

  if (error) {
    throw new Error(`Failed to upload image: ${error.message}`);
  }

  return path;
}

export async function createSignedPictureUploadUrl(path: string, options?: { upsert?: boolean }) {
  const client = getSupabaseServerClient();
  const { bucket } = getSupabaseConfig();
  const { data, error } = await client.storage.from(bucket).createSignedUploadUrl(path, {
    upsert: options?.upsert ?? false,
  });

  if (error || !data?.signedUrl || !data?.token || !data?.path) {
    throw new Error(`Failed to create signed upload URL: ${error?.message ?? "Unknown error"}`);
  }

  return {
    path: data.path,
    signedUrl: data.signedUrl,
    token: data.token,
  };
}

export async function createSignedPictureReadUrl(path: string) {
  const client = getSupabaseServerClient();
  const { bucket, signedUrlTtlSeconds } = getSupabaseConfig();
  const { data, error } = await client.storage.from(bucket).createSignedUrl(path, signedUrlTtlSeconds);

  if (error || !data?.signedUrl) {
    throw new Error(`Failed to create signed read URL: ${error?.message ?? "Unknown error"}`);
  }

  return data.signedUrl;
}

export async function deletePictureObject(path: string) {
  const client = getSupabaseServerClient();
  const { bucket } = getSupabaseConfig();
  const { error } = await client.storage.from(bucket).remove([path]);

  if (error) {
    throw new Error(`Failed to delete image: ${error.message}`);
  }
}

export async function createSignedPictureUrls(paths: string[]) {
  if (paths.length === 0) {
    return new Map<string, string>();
  }

  const client = getSupabaseServerClient();
  const { bucket, signedUrlTtlSeconds } = getSupabaseConfig();
  const { data, error } = await client.storage
    .from(bucket)
    .createSignedUrls(paths, signedUrlTtlSeconds);

  if (error) {
    throw new Error(`Failed to create signed URLs: ${error.message}`);
  }

  const result = new Map<string, string>();

  for (const item of data) {
    if (item.path && item.signedUrl) {
      result.set(item.path, item.signedUrl);
    }
  }

  return result;
}

export function resolvePictureUrl(
  value: string | null | undefined,
  signedUrlByPath: Map<string, string>,
): string | null {
  if (!value) {
    return null;
  }

  if (!isStoredPicturePath(value)) {
    return value;
  }

  return signedUrlByPath.get(value) ?? null;
}
