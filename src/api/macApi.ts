import { postJson } from "./client";
import type { CryptoResult } from "../types/crypto";

export const hmacDigest = (body: { algorithm: string; key: string; data: string; key_format: string; input_format: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/hmac", body);

export const pbkdf2Derive = (body: { password: string; salt: string; iterations: number; dklen: number; prf: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/pbkdf2", body);
