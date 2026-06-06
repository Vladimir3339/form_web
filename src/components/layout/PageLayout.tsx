import type { ReactNode } from "react";

type PageLayoutProps = {
  title: string;
  children: ReactNode;
};

export function PageLayout({ title, children }: PageLayoutProps) {
  return (
    <div className="app-root">
      <header className="app-header">
        <h1>{title}</h1>
        <p style={{ marginTop: "0.5rem", fontSize: "0.875rem", opacity: 0.9 }}>
          Сравнение 6 подходов к стилизации веб-форм в React
        </p>
      </header>
      <main className="app-main">{children}</main>
    </div>
  );
}