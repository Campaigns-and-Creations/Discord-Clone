const MAX_ATTACHMENT_COUNT_PER_MESSAGE = 10;
const MAX_ATTACHMENT_SIZE_BYTES = 25 * 1024 * 1024;
const MAX_ATTACHMENTS_TOTAL_SIZE_BYTES = 100 * 1024 * 1024;

const BLOCKED_ATTACHMENT_EXTENSIONS = new Set([
  "exe",
  "bat",
  "cmd",
  "com",
  "msi",
  "ps1",
  "psm1",
  "vbs",
  "vbe",
  "js",
  "jse",
  "jar",
  "scr",
  "pif",
  "reg",
  "sh",
]);

const BLOCKED_ATTACHMENT_MIME_TYPES = new Set([
  "application/x-msdownload",
  "application/x-msdos-program",
  "application/x-dosexec",
  "application/x-ms-installer",
  "application/x-sh",
  "application/x-bat",
  "application/java-archive",
]);

const MIME_TO_EXTENSION = new Map<string, string>([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
  ["image/gif", "gif"],
  ["image/svg+xml", "svg"],
  ["application/pdf", "pdf"],
  ["text/plain", "txt"],
]);

export type MessageAttachmentMetadata = {
  storagePath: string;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

export type MessageAttachmentUploadRequest = {
  fileName: string;
  mimeType: string;
  sizeBytes: number;
};

function normalizeMimeType(mimeType: string): string {
  return mimeType.trim().toLowerCase();
}

function getFileExtension(fileName: string): string | null {
  const normalized = fileName.trim();
  const dotIndex = normalized.lastIndexOf(".");
  if (dotIndex <= 0 || dotIndex === normalized.length - 1) {
    return null;
  }

  return normalized.slice(dotIndex + 1).toLowerCase();
}

function sanitizeFileName(fileName: string): string {
  const trimmed = fileName.trim();
  const safe = trimmed.replace(/[\\/:*?"<>|]+/g, "_");
  if (safe.length === 0) {
    return "attachment";
  }

  return safe.slice(0, 120);
}

function resolveExtension(fileName: string, mimeType: string): string {
  const fromName = getFileExtension(fileName);
  if (fromName) {
    return fromName;
  }

  const fromMime = MIME_TO_EXTENSION.get(mimeType);
  if (fromMime) {
    return fromMime;
  }

  return "bin";
}

export function validateMessageAttachmentMetadata(payload: MessageAttachmentUploadRequest) {
  const fileName = sanitizeFileName(payload.fileName);
  if (fileName.length === 0) {
    throw new Error("Attachment filename is required.");
  }

  const mimeType = normalizeMimeType(payload.mimeType);
  if (!mimeType) {
    throw new Error("Attachment MIME type is required.");
  }

  if (BLOCKED_ATTACHMENT_MIME_TYPES.has(mimeType)) {
    throw new Error("This file type is blocked for security reasons.");
  }

  const extension = resolveExtension(fileName, mimeType);
  if (BLOCKED_ATTACHMENT_EXTENSIONS.has(extension)) {
    throw new Error("This file type is blocked for security reasons.");
  }

  if (!Number.isFinite(payload.sizeBytes) || payload.sizeBytes <= 0) {
    throw new Error("Attachment file is empty.");
  }

  if (payload.sizeBytes > MAX_ATTACHMENT_SIZE_BYTES) {
    throw new Error("Each attachment must be 25MB or smaller.");
  }

  return {
    fileName,
    mimeType,
    sizeBytes: Math.floor(payload.sizeBytes),
    extension,
  };
}

export function validateMessageAttachmentBatch(attachments: MessageAttachmentMetadata[]) {
  if (attachments.length > MAX_ATTACHMENT_COUNT_PER_MESSAGE) {
    throw new Error("You can attach up to 10 files per message.");
  }

  let totalSize = 0;
  for (const attachment of attachments) {
    const validated = validateMessageAttachmentMetadata({
      fileName: attachment.fileName,
      mimeType: attachment.mimeType,
      sizeBytes: attachment.sizeBytes,
    });

    totalSize += validated.sizeBytes;
    if (totalSize > MAX_ATTACHMENTS_TOTAL_SIZE_BYTES) {
      throw new Error("Attachments in one message must be 100MB or smaller in total.");
    }
  }
}

export function buildMessageAttachmentPath(
  serverId: string,
  channelId: string,
  userId: string,
  fileName: string,
  mimeType: string,
): string {
  const normalizedMimeType = normalizeMimeType(mimeType);
  const safeName = sanitizeFileName(fileName);
  const extension = resolveExtension(safeName, normalizedMimeType);

  return `messages/${serverId}/${channelId}/${userId}/${crypto.randomUUID()}.${extension}`;
}

export function assertMessageAttachmentPathOwnership(
  storagePath: string,
  serverId: string,
  channelId: string,
  userId: string,
) {
  const normalizedPath = storagePath.trim();
  if (!normalizedPath) {
    throw new Error("Attachment storage path is required.");
  }

  const expectedPrefix = `messages/${serverId}/${channelId}/${userId}/`;
  if (!normalizedPath.startsWith(expectedPrefix)) {
    throw new Error("Attachment storage path is invalid.");
  }

  return normalizedPath;
}

export function getMessageAttachmentLimits() {
  return {
    maxCountPerMessage: MAX_ATTACHMENT_COUNT_PER_MESSAGE,
    maxAttachmentSizeBytes: MAX_ATTACHMENT_SIZE_BYTES,
    maxTotalSizeBytes: MAX_ATTACHMENTS_TOTAL_SIZE_BYTES,
  };
}
