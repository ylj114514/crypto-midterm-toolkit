import { useEffect, useState } from "react";
import { JsonViewer } from "../components/JsonViewer";
import { StatusBadge } from "../components/StatusBadge";
import { clearHistory, loadHistory, type HistoryItem } from "../utils/storage";

export function HistoryPage() {
  const [items, setItems] = useState<HistoryItem[]>([]);
  const [selected, setSelected] = useState<HistoryItem | null>(null);
  useEffect(() => setItems(loadHistory()), []);
  return (
    <div className="page-stack">
      <section className="card">
        <div className="card-head"><h2>最近 50 条 API 调用记录</h2><button onClick={() => { clearHistory(); setItems([]); setSelected(null); }}>清空历史</button></div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>时间</th><th>算法</th><th>操作</th><th>状态</th><th>消息</th><th>耗时</th><th>操作</th></tr></thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={`${item.time}-${index}`}>
                  <td>{item.time}</td><td>{item.algorithm}</td><td>{item.operation}</td><td><StatusBadge status={item.status} /></td><td>{item.message}</td><td>{String(item.elapsed_ms ?? "-")} ms</td><td><button onClick={() => setSelected(item)}>查看 JSON</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      {selected && <JsonViewer data={selected.raw} />}
    </div>
  );
}
