export type CryptoResult = {
  status: number;
  message: string;
  algorithm: string;
  operation: string;
  input_format?: string | null;
  output_format?: string | null;
  result: string | boolean | Record<string, unknown> | null;
  meta: Record<string, unknown>;
};

export type DemoResponse = {
  status?: number;
  message?: string;
  summary: {
    total: number;
    success: number;
    failed: number;
    elapsed_ms: number;
  };
  items: Array<CryptoResult & { name?: string; sample_input?: string; sample_output?: string }>;
};

export type PageKey =
  | "dashboard"
  | "symmetric"
  | "hash"
  | "mac"
  | "encoding"
  | "public-key"
  | "demo"
  | "api-docs"
  | "history";
