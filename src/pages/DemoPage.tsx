import { useState } from "react";
import { runDemoAll } from "../api/demoApi";
import { ExecutionTable } from "../components/ExecutionTable";
import { JsonViewer } from "../components/JsonViewer";
import type { DemoResponse } from "../types/crypto";

export function DemoPage() {
  const [demo, setDemo] = useState<DemoResponse | null>(null);
  function download() {
    if (!demo) return;
    const blob = new Blob([JSON.stringify(demo, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "demo_results.json";
    link.click();
    URL.revokeObjectURL(url);
  }
  return (
    <div className="page-stack">
      <section className="card">
        <h2>一键运行全部算法</h2>
        <div className="actions-row"><button onClick={async () => setDemo(await runDemoAll())}>运行 demo all</button><button onClick={download} disabled={!demo}>下载 demo_results.json</button></div>
      </section>
      {demo && <><section className="card"><h2>执行汇总</h2><p>总数：{demo.summary.total}，成功：{demo.summary.success}，失败：{demo.summary.failed}，耗时：{demo.summary.elapsed_ms} ms</p></section><ExecutionTable items={demo.items} /><JsonViewer data={demo} /></>}
    </div>
  );
}
