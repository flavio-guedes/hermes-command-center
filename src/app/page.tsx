'use client';

import dynamic from 'next/dynamic';
import { AppShell } from '@/components/layout/AppShell';
import { useMockStream } from '@/hooks/useMockStream';

const ExecutiveDashboard = dynamic(() => import('@/components/dashboard/ExecutiveDashboard').then(mod => ({ default: mod.ExecutiveDashboard })), { ssr: false });
const TaskBoard = dynamic(() => import('@/components/tasks/TaskBoard').then(mod => ({ default: mod.TaskBoard })), { ssr: false });
const EventStream = dynamic(() => import('@/components/event-stream/EventStream').then(mod => ({ default: mod.EventStream })), { ssr: false });
const SideNav = dynamic(() => import('@/components/navigation/SideNav').then(mod => ({ default: mod.SideNav })), { ssr: false });

export default function Page() {
  const { kpis, mission, approvals, tasks, categories, events } = useMockStream();

  return (
    <AppShell
      nav={<SideNav />}
      topBar={<TopBar />}
      dashboard={<ExecutiveDashboard kpis={kpis} mission={mission} approvals={approvals} />}
      main={<TaskBoard tasks={tasks} categories={categories} />}
      bottom={<EventStream events={events} />}
    />
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <span className="text-command-text font-semibold tracking-tight">⚕ HERMES</span>
        <span className="inline-flex items-center gap-1 rounded-full border border-command-success/20 bg-command-success/10 px-2 py-1 text-[10px] font-mono text-command-success">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
          SYSTEM ONLINE
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-4 text-xs text-command-muted">
        <button className="hover:text-command-text">MISSIONS</button>
        <button className="hover:text-command-text">TASKS</button>
        <button className="hover:text-command-text">PROJECTS</button>
        <button className="hover:text-command-text">AGENTS</button>
      </nav>
    </div>
  );
}
