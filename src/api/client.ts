import type { CryptoResult } from "../types/crypto";
import { saveResultToHistory } from "../utils/storage";
import { isCryptoResult } from "../utils/validators";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8000";

function recordHistory(response: unknown): void {
  if (isCryptoResult(response)) {
    saveResultToHistory(response as CryptoResult);
  }
}

export async function getJson<TResponse>(path: string): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`);
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = (await response.json()) as TResponse;
  recordHistory(data);
  return data;
}

export async function postJson<TRequest, TResponse>(path: string, body: TRequest): Promise<TResponse> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
  const data = (await response.json()) as TResponse;
  recordHistory(data);
  return data;
}
