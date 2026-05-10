import { useEffect, useState } from "react";
import { getJson } from "../api/client";
import type { PageKey } from "../types/crypto";

type HealthState = {
  ok: boolean;
  text: string;
};

export function DashboardPage({ onNavigate }: { onNavigate: (page: PageKey) => void }) {
  const [health, setHealth] = useState<HealthState>({ ok: false, text: "检测中" });

  useEffect(() => {
    getJson<{ status: number; message: string }>("/api/v1/health")
      .then((data) => {
        setHealth(data.status === 0 ? { ok: true, text: "后端连接正常" } : { ok: false, text: "后端返回错误" });
      })
      .catch(() => setHealth({ ok: false, text: "后端未连接" }));
  }, []);

  const cards: Array<[string, string, PageKey]> = [
    ["对称加密", "AES、SM4、RC6", "symmetric"],
    ["哈希与认证", "SHA1、SHA256、SHA3、RIPEMD160、HMAC、PBKDF2", "hash"],
    ["编码算法", "Base64、UTF-8", "encoding"],
    ["公钥密码", "RSA、ECC、RSA-SHA1、ECDSA", "public-key"]
  ];

  return (
    <div className="page-stack">
      <section className="card">
        <h2>网络信息安全密码算法编程系统</h2>
        <p>本系统用于课程期中作业展示，提供后端算法实现、统一接口、CLI 和前端可视化调用界面。</p>
        <div className={health.ok ? "health ok" : "health error"}>{health.text}</div>
      </section>
      <section className="grid-4">
        {cards.map(([title, text, page]) => (
          <article className="card compact" key={title}>
            <h3>{title}</h3>
            <p>{text}</p>
            <button type="button" onClick={() => onNavigate(page)}>进入</button>
          </article>
        ))}
      </section>
    </div>
  );
}
