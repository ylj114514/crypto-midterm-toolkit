import { postJson } from "./client";
import type { DemoResponse } from "../types/crypto";

export const runDemoAll = () => postJson<Record<string, never>, DemoResponse>("/api/v1/demo/all", {});
