export function resultToText(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value ? "true" : "false";
  return JSON.stringify(value, null, 2);
}

export function shortText(value: unknown, max = 80): string {
  const text = resultToText(value).replace(/\s+/g, " ");
  return text.length > max ? `${text.slice(0, max)}...` : text;
}

export function nowText(): string {
  return new Date().toLocaleString("zh-CN");
}
