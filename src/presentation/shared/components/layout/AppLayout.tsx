import type { ReactNode } from "react";

interface AppLayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  header?: ReactNode;
}

export function AppLayout({ children, sidebar, header }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen">
      {sidebar && (
        <aside className="w-64 flex-shrink-0 border-r border-border bg-surface">{sidebar}</aside>
      )}
      <div className="flex flex-1 flex-col">
        {header && (
          <header className="sticky top-0 z-10 border-b border-border bg-background px-6 py-3">
            {header}
          </header>
        )}
        <main className="flex-1 px-6 py-4">{children}</main>
      </div>
    </div>
  );
}
