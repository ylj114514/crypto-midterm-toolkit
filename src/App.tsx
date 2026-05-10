import { useState } from "react";
import { Layout } from "./components/Layout";
import { ApiDocsPage } from "./pages/ApiDocsPage";
import { DashboardPage } from "./pages/DashboardPage";
import { DemoPage } from "./pages/DemoPage";
import { EncodingPage } from "./pages/EncodingPage";
import { HashPage } from "./pages/HashPage";
import { HistoryPage } from "./pages/HistoryPage";
import { MacKdfPage } from "./pages/MacKdfPage";
import { PublicKeyPage } from "./pages/PublicKeyPage";
import { SymmetricPage } from "./pages/SymmetricPage";
import type { PageKey } from "./types/crypto";

const titles: Record<PageKey, string> = {
  dashboard: "系统首页",
  symmetric: "对称加密",
  hash: "哈希算法",
  mac: "HMAC 与 PBKDF2",
  encoding: "编码算法",
  "public-key": "公钥密码",
  demo: "一键演示",
  "api-docs": "API 文档",
  history: "执行日志"
};

function App() {
  const [page, setPage] = useState<PageKey>("dashboard");
  const content = {
    dashboard: <DashboardPage onNavigate={setPage} />,
    symmetric: <SymmetricPage />,
    hash: <HashPage />,
    mac: <MacKdfPage />,
    encoding: <EncodingPage />,
    "public-key": <PublicKeyPage />,
    demo: <DemoPage />,
    "api-docs": <ApiDocsPage />,
    history: <HistoryPage />
  }[page];
  return <Layout page={page} title={titles[page]} onPageChange={setPage}>{content}</Layout>;
}

export default App;
