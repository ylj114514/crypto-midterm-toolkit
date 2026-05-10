import type { DemoResponse } from "../types/crypto";
import { shortText } from "../utils/format";
import { StatusBadge } from "./StatusBadge";

export function ExecutionTable({ items }: { items: DemoResponse["items"] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>算法</th>
            <th>操作</th>
            <th>状态</th>
            <th>消息</th>
            <th>sample_input</th>
            <th>sample_output</th>
            <th>耗时</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={`${item.algorithm}-${item.operation}-${index}`}>
              <td>{item.algorithm}</td>
              <td>{item.operation}</td>
              <td><StatusBadge status={item.status} /></td>
              <td>{item.message}</td>
              <td>{shortText(item.sample_input ?? item.input_format ?? "-")}</td>
              <td>{shortText(item.sample_output ?? item.result)}</td>
              <td>{String(item.meta?.elapsed_ms ?? "-")} ms</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
