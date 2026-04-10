import { createSignedPictureReadUrl, createSignedPictureUploadUrl } from "@/utils/supabase";

const MAX_UPLOAD_SIZE_BYTES = 5 * 1024 * 1024;

const ALLOWED_IMAGE_MIME_TYPES = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
]);

export function validatePictureUpload(file: File) {
  if (!ALLOWED_IMAGE_MIME_TYPES.has(file.type)) {
    throw new Error("Unsupported file type. Allowed: JPEG, PNG, WEBP, GIF.");
  }

  if (file.size <= 0) {
    throw new Error("Image file is empty.");
  }

  if (file.size > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("Image must be 5MB or smaller.");
  }
}

export function validatePictureMetadata(mimeType: string, sizeBytes: number) {
  if (!ALLOWED_IMAGE_MIME_TYPES.has(mimeType)) {
    throw new Error("Unsupported file type. Allowed: JPEG, PNG, WEBP, GIF.");
  }

  if (sizeBytes <= 0) {
    throw new Error("Image file is empty.");
  }

  if (sizeBytes > MAX_UPLOAD_SIZE_BYTES) {
    throw new Error("Image must be 5MB or smaller.");
  }
}

function getFileExtension(mimeType: string): string {
  const extension = ALLOWED_IMAGE_MIME_TYPES.get(mimeType);

  if (!extension) {
    throw new Error("Unsupported file type.");
  }

  return extension;
}

export function buildUserPicturePath(userId: string, mimeType: string): string {
  const extension = getFileExtension(mimeType);
  return `users/${userId}/${crypto.randomUUID()}.${extension}`;
}

export function buildServerPicturePath(serverId: string, mimeType: string): string {
  const extension = getFileExtension(mimeType);
  return `servers/${serverId}/${crypto.randomUUID()}.${extension}`;
}

export async function generateSignedUploadUrl(path: string) {
  return createSignedPictureUploadUrl(path, { upsert: false });
}

export async function generateSignedReadUrl(path: string) {
  return createSignedPictureReadUrl(path);
}
