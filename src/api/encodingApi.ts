import { postJson } from "./client";
import type { CryptoResult } from "../types/crypto";

export const base64Encode = (body: { data: string; input_format: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/base64/encode", body);

export const base64Decode = (body: { data: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/base64/decode", body);

export const utf8Encode = (body: { text: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/utf8/encode", body);

export const utf8Decode = (body: { data: string; input_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/utf8/decode", body);
