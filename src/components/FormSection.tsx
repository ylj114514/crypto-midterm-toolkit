import type { ReactNode } from "react";

export function FormSection({ title, children, actions }: { title: string; children: ReactNode; actions?: ReactNode }) {
  return (
    <section className="card">
      <div className="card-head">
        <h2>{title}</h2>
        <div className="actions">{actions}</div>
      </div>
      <div className="form-grid">{children}</div>
    </section>
  );
}
