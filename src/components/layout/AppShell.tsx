'use client';

import { ReactNode } from 'react';

export function AppShell({ nav, topBar, dashboard, main, bottom }: {
  nav?: ReactNode;
  topBar?: ReactNode;
  dashboard?: ReactNode;
  main?: ReactNode;
  bottom?: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-command-border bg-command-surface/80 backdrop-blur">
        {topBar}
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden md:block w-16 border-r border-command-border bg-command-surface/40 p-2">
          {nav}
        </aside>
        <main className="flex min-h-0 flex-1 flex-col">
          {dashboard && (
            <section className="border-b border-command-border bg-command-surface/60 px-4 py-3">
              {dashboard}
            </section>
          )}
          <section className="flex-1 command-grid p-3">
            <div className="h-full overflow-x-auto">
              {main}
            </div>
          </section>
          {bottom && (
            <section className="border-t border-command-border bg-command-surface/60 px-4 py-3">
              {bottom}
            </section>
          )}
        </main>
      </div>
    </div>
  );
}
