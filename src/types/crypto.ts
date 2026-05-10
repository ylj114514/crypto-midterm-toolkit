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
    elapsed_ms?: number;
  };
  items: Array<{
    algorithm: string;
    operation: string;
    status: number;
    message: string;
    sample_input?: string;
    sample_output?: unknown;
    elapsed_ms?: number;
    meta?: Record<string, unknown>;
    result?: unknown;
  }>;
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
