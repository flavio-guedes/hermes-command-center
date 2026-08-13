'use client';

import { useMemo } from 'react';
import type { KPIs, ApprovalRequest } from '@/types/events';

function Stat({ label, value, tone }: { label: string; value: string | number; tone?: 'success' | 'warning' | 'danger' }) {
  return (
    <div className="rounded-lg border border-command-border bg-command-elevated/60 px-3 py-2">
      <div className="text-[11px] text-command-muted">{label}</div>
      <div className={`text-xl font-semibold ${tone === 'danger' ? 'text-command-danger' : tone === 'warning' ? 'text-command-warning' : 'text-command-text'}`}>{value}</div>
    </div>
  );
}

export function ExecutiveDashboard({ kpis, mission, approvals }: { kpis: KPIs; mission: { name: string; status: string; progress: number; governance: string }; approvals: ApprovalRequest[] }) {
  const pendingApprovals = approvals.filter((a) => a.status === 'PENDING').length;
  const stats = useMemo(() => [
    { label: 'MISSÕES', value: kpis.totalMissions },
    { label: 'EM EXECUÇÃO', value: kpis.running },
    { label: 'BLOQUEADAS', value: kpis.blocked, tone: 'danger' as const },
    { label: 'CONCLUÍDAS', value: kpis.completed },
    { label: 'AGENTES ATIVOS', value: kpis.activeAgents },
    { label: 'TAREFAS HOJE', value: kpis.recentExecutions },
    { label: 'ALERTAS', value: kpis.alerts, tone: 'warning' as const },
    { label: 'PENDÊNCIAS', value: pendingApprovals + kpis.waitingApproval, tone: pendingApprovals ? 'warning' as const : undefined },
  ], [kpis, pendingApprovals]);

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-2">
        {stats.map((stat) => (
          <Stat key={stat.label} label={stat.label} value={stat.value} tone={stat.tone} />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 text-[11px] text-command-muted">
        <div>
          <span className="text-command-text">Missão atual:</span> {mission.name}
        </div>
        <div>
          <span className="text-command-text">Status:</span> {mission.status}
        </div>
        <div>
          <span className="text-command-text">Progresso:</span> {mission.progress}%
        </div>
        <div>
          <span className="text-command-text">Governança:</span> {mission.governance}
        </div>
      </div>
    </div>
  );
}
