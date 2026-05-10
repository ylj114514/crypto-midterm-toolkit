import type { PageKey } from "../types/crypto";

const items: Array<[PageKey, string]> = [
  ["dashboard", "首页"],
  ["symmetric", "对称加密"],
  ["hash", "哈希算法"],
  ["mac", "HMAC/PBKDF2"],
  ["encoding", "编码算法"],
  ["public-key", "公钥密码"],
  ["demo", "一键演示"],
  ["api-docs", "API 文档"],
  ["history", "执行日志"]
];

export function Sidebar({ page, onChange }: { page: PageKey; onChange: (page: PageKey) => void }) {
  return (
    <aside className="sidebar">
      <div className="brand">Crypto Toolkit</div>
      <nav>
        {items.map(([key, label]) => (
          <button key={key} className={page === key ? "active" : ""} type="button" onClick={() => onChange(key)}>
            {label}
          </button>
        ))}
      </nav>
    </aside>
  );
}
