export function resolveDisplayName(nickname: string | null | undefined, username: string): string {
  const normalizedNickname = nickname?.trim();
  if (normalizedNickname) {
    return normalizedNickname;
  }

  return username;
}
