import { postJson } from "./client";
import type { CryptoResult } from "../types/crypto";

export const rsaKeypair = (body: { bits: number; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/rsa/keypair", body);
export const rsaEncrypt = (body: { plaintext: string; public_key: string; input_format: string; key_format: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/rsa/encrypt", body);
export const rsaDecrypt = (body: { ciphertext: string; private_key: string; input_format: string; key_format: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/rsa/decrypt", body);
export const rsaSignSha1 = (body: { data: string; private_key: string; input_format: string; key_format: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/rsa/sign-sha1", body);
export const rsaVerifySha1 = (body: { data: string; signature: string; public_key: string; input_format: string; signature_format: string; key_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/rsa/verify-sha1", body);
export const eccKeypair = (body: { curve: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/ecc/keypair", body);
export const ecdsaSign = (body: { data: string; private_key: string; curve: string; input_format: string; key_format: string; output_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/ecdsa/sign", body);
export const ecdsaVerify = (body: { data: string; signature: string; public_key: string; curve: string; input_format: string; signature_format: string; key_format: string }) =>
  postJson<typeof body, CryptoResult>("/api/v1/ecdsa/verify", body);
