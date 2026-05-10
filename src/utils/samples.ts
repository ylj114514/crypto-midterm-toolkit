export const DEFAULT_KEY = "00112233445566778899aabbccddeeff";
export const DEFAULT_IV = "0102030405060708090a0b0c0d0e0f10";

export const apiRoutes = [
  "GET /api/v1/health",
  "POST /api/v1/symmetric/encrypt",
  "POST /api/v1/symmetric/decrypt",
  "POST /api/v1/hash",
  "POST /api/v1/hmac",
  "POST /api/v1/pbkdf2",
  "POST /api/v1/base64/encode",
  "POST /api/v1/base64/decode",
  "POST /api/v1/utf8/encode",
  "POST /api/v1/utf8/decode",
  "POST /api/v1/rsa/keypair",
  "POST /api/v1/rsa/encrypt",
  "POST /api/v1/rsa/decrypt",
  "POST /api/v1/rsa/sign-sha1",
  "POST /api/v1/rsa/verify-sha1",
  "POST /api/v1/ecc/keypair",
  "POST /api/v1/ecdsa/sign",
  "POST /api/v1/ecdsa/verify",
  "POST /api/v1/demo/all"
];
