import { CopyButton } from "./CopyButton";

export function JsonViewer({ data }: { data: unknown }) {
  const text = JSON.stringify(data, null, 2);
  return (
    <div className="json-viewer">
      <div className="panel-title">
        <span>原始 JSON</span>
        <CopyButton value={text} />
      </div>
      <pre><code>{text}</code></pre>
    </div>
  );
}
