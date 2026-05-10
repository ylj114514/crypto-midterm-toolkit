import { postJson } from "./client";
import type { CryptoResult } from "../types/crypto";

export const hashDigest = (body: { algorithm: string; data: string; input_format: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/hash", body);
