export function isCryptoResult(value: unknown): value is { status: number; algorithm: string; operation: string; message: string; meta: Record<string, unknown> } {
  return Boolean(value && typeof value === "object" && "status" in value && "algorithm" in value && "operation" in value);
}
