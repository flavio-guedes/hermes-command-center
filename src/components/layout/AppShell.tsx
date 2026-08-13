'use client';

import { ReactNode } from 'react';

export function AppShell({ topBar, left, center, right, bottom }: {
  topBar?: ReactNode;
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  bottom?: ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <header className="border-b border-command-border bg-command-surface/80 backdrop-blur">
        {topBar}
      </header>
      <div className="flex min-h-0 flex-1">
        <aside className="hidden lg:block w-64 border-r border-command-border bg-command-surface/40 p-3">
          {left}
        </aside>
        <main className="flex-1 command-grid p-3">
          <div className="grid h-full grid-cols-1 xl:grid-cols-3 gap-3">
            <div className="xl:col-span-2 min-h-0 rounded-xl border border-command-border bg-command-surface/60 backdrop-blur">
              {center}
            </div>
            <div className="min-h-0 rounded-xl border border-command-border bg-command-surface/60 backdrop-blur">
              {right}
            </div>
          </div>
        </main>
      </div>
      {bottom && (
        <section className="border-t border-command-border bg-command-surface/60 backdrop-blur p-3">
          {bottom}
        </section>
      )}
    </div>
  );
}
