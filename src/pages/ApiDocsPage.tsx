import { JsonViewer } from "../components/JsonViewer";
import { apiRoutes } from "../utils/samples";

const requestExample = {
  algorithm: "SHA256",
  data: "abc",
  input_format: "utf8",
  output_format: "hex"
};

const responseExample = {
  status: 0,
  message: "success",
  algorithm: "SHA256",
  operation: "digest",
  input_format: "utf8",
  output_format: "hex",
  result: "ba7816bf...",
  meta: { elapsed_ms: 0.12 }
};

const codes = [
  [0, "success"],
  [100, "invalid parameter"],
  [101, "unsupported algorithm"],
  [102, "unsupported operation"],
  [103, "unsupported input format"],
  [104, "unsupported output format"],
  [201, "invalid key length"],
  [203, "invalid iv length"],
  [300, "signature verify failed"],
  [400, "internal error"]
];

export function ApiDocsPage() {
  return (
    <div className="page-stack">
      <section className="card">
        <h2>API 路由表</h2>
        <div className="route-grid">{apiRoutes.map((route) => <code key={route}>{route}</code>)}</div>
      </section>
      <section className="grid-2">
        <JsonViewer data={requestExample} />
        <JsonViewer data={responseExample} />
      </section>
      <section className="card">
        <h2>状态码表</h2>
        <div className="table-wrap"><table><tbody>{codes.map(([code, message]) => <tr key={code}><td>{code}</td><td>{message}</td></tr>)}</tbody></table></div>
      </section>
      <section className="card">
        <h2>调用示例</h2>
        <pre><code>{`python -m crypto_midterm hash --algorithm SHA256 --text abc\n\nfrom crypto_midterm.facade import hash_digest\nprint(hash_digest("SHA256", "abc").to_dict())`}</code></pre>
      </section>
    </div>
  );
}
