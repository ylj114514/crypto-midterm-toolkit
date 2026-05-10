import type { CryptoResult } from "../types/crypto";
import { resultToText } from "../utils/format";
import { CopyButton } from "./CopyButton";
import { JsonViewer } from "./JsonViewer";
import { StatusBadge } from "./StatusBadge";

export function ResultPanel({ result }: { result: CryptoResult | null }) {
  if (!result) {
    return <section className="result-panel empty">等待调用后显示结果。</section>;
  }
  const resultText = resultToText(result.result);
  return (
    <section className="result-panel">
      <div className="result-head">
        <StatusBadge status={result.status} />
        <span>{result.algorithm} / {result.operation}</span>
        <span>耗时：{String(result.meta?.elapsed_ms ?? "-")} ms</span>
      </div>
      <div className="kv-grid">
        <div><strong>message</strong><span>{result.message}</span></div>
        <div><strong>input_format</strong><span>{result.input_format ?? "-"}</span></div>
        <div><strong>output_format</strong><span>{result.output_format ?? "-"}</span></div>
      </div>
      <div className="result-box">
        <div className="panel-title">
          <span>result</span>
          <CopyButton value={resultText} />
        </div>
        <pre>{resultText}</pre>
      </div>
      <JsonViewer data={result} />
    </section>
  );
}
