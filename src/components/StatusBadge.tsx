export function StatusBadge({ status }: { status: number }) {
  return <span className={`status-badge ${status === 0 ? "ok" : "error"}`}>{status === 0 ? "成功" : "错误"} {status}</span>;
}
