import { postJson } from "./client";
import type { CryptoResult } from "../types/crypto";

export type SymmetricRequest = {
  algorithm: string;
  plaintext?: string;
  ciphertext?: string;
  text?: string;
  key: string;
  mode: string;
  iv?: string;
  padding: string;
  input_format: string;
  key_format: string;
  iv_format: string;
  output_format: string;
};

export const symmetricEncrypt = (body: SymmetricRequest) =>
  postJson<SymmetricRequest, CryptoResult>("/api/v1/symmetric/encrypt", body);

export const symmetricDecrypt = (body: SymmetricRequest) =>
  postJson<SymmetricRequest, CryptoResult>("/api/v1/symmetric/decrypt", body);
