import type { ReactNode } from "react";
import type { PageKey } from "../types/crypto";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";

export function Layout({ page, title, onPageChange, children }: { page: PageKey; title: string; onPageChange: (page: PageKey) => void; children: ReactNode }) {
  return (
    <div className="layout">
      <Sidebar page={page} onChange={onPageChange} />
      <main className="main">
        <Header title={title} />
        {children}
      </main>
    </div>
  );
}
