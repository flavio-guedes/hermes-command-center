'use client';

import dynamic from 'next/dynamic';
import { AppShell } from '@/components/layout/AppShell';
import { useMockStream } from '@/hooks/useMockStream';

const ExecutionGraph = dynamic(() => import('@/components/graph/ExecutionGraph').then(mod => ({ default: mod.ExecutionGraph })), { ssr: false });
const EventStream = dynamic(() => import('@/components/event-stream/EventStream').then(mod => ({ default: mod.EventStream })), { ssr: false });
const AgentsPanel = dynamic(() => import('@/components/agents/AgentsPanel').then(mod => ({ default: mod.AgentsPanel })), { ssr: false });
const MissionView = dynamic(() => import('@/components/mission/MissionView').then(mod => ({ default: mod.MissionView })), { ssr: false });
const SkillsPanel = dynamic(() => import('@/components/skills/SkillsPanel').then(mod => ({ default: mod.SkillsPanel })), { ssr: false });
const ToolsPanel = dynamic(() => import('@/components/tools/ToolsPanel').then(mod => ({ default: mod.ToolsPanel })), { ssr: false });
const ApprovalPanel = dynamic(() => import('@/components/approval/ApprovalPanel').then(mod => ({ default: mod.ApprovalPanel })), { ssr: false });

export default function Page() {
  const { events, currentMission, agents, skills, tools, approvals } = useMockStream();

  return (
    <AppShell
      topBar={<TopBar />}
      left={<AgentsPanel agents={agents} />}
      center={<ExecutionGraph events={events} currentMission={currentMission} />}
      right={<MissionView mission={currentMission} />}
      bottom={
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-3">
          <EventStream events={events} />
          <SkillsPanel skills={skills} />
          <ToolsPanel tools={tools} />
          <ApprovalPanel approvals={approvals} />
        </div>
      }
    />
  );
}

function TopBar() {
  return (
    <div className="flex items-center justify-between px-4">
      <div className="flex items-center gap-2">
        <span className="text-command-text font-semibold tracking-tight">⚕ HERMES</span>
        <StatusPill label="SYSTEM ONLINE" tone="success" />
      </div>
      <nav className="hidden md:flex items-center gap-4 text-xs text-command-muted">
        <button className="hover:text-command-text">AGENTS</button>
        <button className="hover:text-command-text">SKILLS</button>
        <button className="hover:text-command-text">TOOLS</button>
        <button className="hover:text-command-text">MISSION</button>
      </nav>
    </div>
  );
}

function StatusPill({ label, tone }: { label: string; tone: 'success' | 'warning' | 'danger' | 'neutral' }) {
  const tones: Record<string, string> = {
    success: 'bg-command-success/10 text-command-success border-command-success/20',
    warning: 'bg-command-warning/10 text-command-warning border-command-warning/20',
    danger: 'bg-command-danger/10 text-command-danger border-command-danger/20',
    neutral: 'bg-white/5 text-command-muted border-white/10',
  };
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-mono ${tones[tone]}`}>
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
