'use client';

import { useState, useEffect, useRef } from 'react';
import { ExecutionEvent, Agent, Skill, Tool, ApprovalRequest, Mission } from '@/types/events';

const initialMission: Mission = {
  id: 'mission-1',
  name: 'LinkedIn Prospecting',
  status: 'IDLE',
  progress: 0,
  governance: 'CLEAR',
};

const initialAgents: Agent[] = [
  { id: 'hermes', name: 'Hermes', role: 'Orchestrator', status: 'IDLE' },
  { id: 'agent-zero', name: 'Agent Zero', role: 'Autonomous Execution', status: 'IDLE' },
  { id: 'creative', name: 'Creative', role: 'Content & Assets', status: 'IDLE' },
  { id: 'growth', name: 'Growth', role: 'Growth Ops', status: 'IDLE' },
  { id: 'operations', name: 'Operations', role: 'Operations', status: 'IDLE' },
  { id: 'governance', name: 'Governance', role: 'Governance', status: 'IDLE' },
];

const initialSkills: Skill[] = [
  { id: 's1', name: 'LinkedIn Opportunity Hunter', category: 'GROWTH', active: true, lastUsed: '2026-08-12' },
  { id: 's2', name: 'LinkedIn Job Hunter', category: 'GROWTH', active: true, lastUsed: '2026-08-12' },
  { id: 's3', name: 'Creative Direction', category: 'CREATIVE', active: false },
  { id: 's4', name: 'Approval Gate', category: 'GOVERNANCE', active: true },
  { id: 's5', name: 'Autonomous Router', category: 'OPERATIONS', active: true },
  { id: 's6', name: 'Autonomous Continuous Improvement', category: 'OPERATIONS', active: true },
  { id: 's7', name: 'Audit Log', category: 'GOVERNANCE', active: true },
];

const initialTools: Tool[] = [
  { id: 't1', name: 'Browser Automation', category: 'Browser', status: 'idle' },
  { id: 't2', name: 'Screenshot', category: 'Vision', status: 'idle' },
  { id: 't3', name: 'Terminal', category: 'Execution', status: 'idle' },
  { id: 't4', name: 'Delegation', category: 'Agent', status: 'idle' },
  { id: 't5', name: 'Memory', category: 'State', status: 'idle' },
];

const steps: Array<{ afterMs: number; apply: (s: State) => State }> = [
  { afterMs: 200, apply: (s) => pushEvent(s, { executionId: 'exec-1', parentId: null, actor: 'Hermes', actorType: 'hermes', eventType: 'MISSION_STARTED', status: 'running', message: 'Mission received', metadata: { mission: 'LinkedIn Prospecting' } }) },
  { afterMs: 1200, apply: (s) => pushEvent(s, { executionId: 'exec-1', parentId: null, actor: 'Hermes', actorType: 'hermes', eventType: 'SKILL_SELECTED', status: 'completed', message: 'Intent classified', skill: 'LinkedIn Opportunity Hunter', agent: 'Growth' }) },
  { afterMs: 2200, apply: (s) => pushEvent(s, { executionId: 'exec-1', parentId: null, actor: 'Hermes', actorType: 'hermes', eventType: 'AGENT_DELEGATED', status: 'completed', message: 'Delegating to Agent Zero', agent: 'Agent Zero' }) },
  { afterMs: 3200, apply: (s) => pushEvent(s, { executionId: 'exec-1', parentId: null, actor: 'Agent Zero', actorType: 'agent', eventType: 'AGENT_STARTED', status: 'running', message: 'Browser initialized', tool: 'Browser Automation' }) },
  { afterMs: 4200, apply: (s) => pushEvent(s, { executionId: 'exec-1', parentId: null, actor: 'Agent Zero', actorType: 'agent', eventType: 'TOOL_STARTED', status: 'running', message: 'LinkedIn detected', tool: 'Browser Automation' }) },
  { afterMs: 5400, apply: (s) => pushEvent(s, { executionId: 'exec-1', parentId: null, actor: 'Governance', actorType: 'governance', eventType: 'APPROVAL_REQUIRED', status: 'waiting', message: 'Approval required for external interaction' }) },
];

function pushEvent(state: State, event: Omit<ExecutionEvent, 'id' | 'timestamp'>): State {
  const e: ExecutionEvent = { id: `evt-${Date.now()}-${Math.random()}`, timestamp: new Date().toISOString(), ...event };
  const agents = state.agents.map(a => {
    if (event.actor === a.name && event.eventType === 'AGENT_STARTED') return { ...a, status: 'RUNNING' as const };
    if (event.eventType === 'APPROVAL_REQUIRED' && a.name === 'Governance') return { ...a, status: 'REQUIRES_APPROVAL' as const };
    return a;
  });
  const mission = { ...state.mission, progress: Math.min(72, state.mission.progress + 14) };
  return { ...state, events: [...state.events, e], agents, mission };
}

export interface State {
  events: ExecutionEvent[];
  mission: Mission;
  agents: Agent[];
  skills: Skill[];
  tools: Tool[];
  approvals: ApprovalRequest[];
}

export function useMockStream() {
  const [state, setState] = useState<State>({
    events: [],
    mission: { ...initialMission },
    agents: initialAgents.map(a => ({ ...a })),
    skills: initialSkills.map(s => ({ ...s })),
    tools: initialTools.map(t => ({ ...t })),
    approvals: [],
  });

  useEffect(() => {
    const timeouts: number[] = [];
    steps.forEach(step => {
      const id = window.setTimeout(() => setState(prev => step.apply(prev)), step.afterMs);
      timeouts.push(id);
    });
    return () => timeouts.forEach(clearTimeout);
  }, []);

  return state;
}
