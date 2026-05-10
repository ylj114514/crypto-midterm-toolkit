import type { CryptoResult } from "../types/crypto";
import { nowText } from "./format";

export type HistoryItem = {
  time: string;
  algorithm: string;
  operation: string;
  status: number;
  message: string;
  elapsed_ms?: unknown;
  raw: CryptoResult;
};

const KEY = "crypto_midterm_history";

export function loadHistory(): HistoryItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]") as HistoryItem[];
  } catch {
    return [];
  }
}

export function saveResultToHistory(result: CryptoResult): void {
  const next: HistoryItem = {
    time: nowText(),
    algorithm: result.algorithm,
    operation: result.operation,
    status: result.status,
    message: result.message,
    elapsed_ms: result.meta?.elapsed_ms,
    raw: result
  };
  localStorage.setItem(KEY, JSON.stringify([next, ...loadHistory()].slice(0, 50)));
}

export function clearHistory(): void {
  localStorage.removeItem(KEY);
}
