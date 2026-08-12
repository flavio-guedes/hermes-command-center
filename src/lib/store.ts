import { Agent, ApprovalRequest, ExecutionEvent, Mission, Skill, Tool } from '@/types/events';

export type State = {
  events: ExecutionEvent[];
  mission: Mission;
  agents: Agent[];
  skills: Skill[];
  tools: Tool[];
  approvals: ApprovalRequest[];
  addEvent: (e: ExecutionEvent) => void;
  setMission: (m: Mission) => void;
};

export const initialState: State = {
  events: [],
  mission: {
    id: 'mission-1',
    name: 'LinkedIn Prospecting',
    status: 'IDLE',
    progress: 0,
    governance: 'CLEAR',
  },
  agents: [
    { id: 'hermes', name: 'Hermes', role: 'Orchestrator', status: 'IDLE' },
    { id: 'agent-zero', name: 'Agent Zero', role: 'Autonomous Execution', status: 'IDLE' },
    { id: 'creative', name: 'Creative', role: 'Content & Assets', status: 'IDLE' },
    { id: 'growth', name: 'Growth', role: 'Growth Ops', status: 'IDLE' },
    { id: 'operations', name: 'Operations', role: 'Operations', status: 'IDLE' },
    { id: 'governance', name: 'Governance', role: 'Governance', status: 'IDLE' },
  ],
  skills: [
    { id: 's1', name: 'LinkedIn Opportunity Hunter', category: 'GROWTH', active: true, lastUsed: '2026-08-12' },
    { id: 's2', name: 'LinkedIn Job Hunter', category: 'GROWTH', active: true, lastUsed: '2026-08-12' },
    { id: 's3', name: 'Creative Direction', category: 'CREATIVE', active: false },
    { id: 's4', name: 'Approval Gate', category: 'GOVERNANCE', active: true },
    { id: 's5', name: 'Autonomous Router', category: 'OPERATIONS', active: true },
    { id: 's6', name: 'Autonomous Continuous Improvement', category: 'OPERATIONS', active: true },
    { id: 's7', name: 'Audit Log', category: 'GOVERNANCE', active: true },
  ],
  tools: [
    { id: 't1', name: 'Browser Automation', category: 'Browser', status: 'idle' },
    { id: 't2', name: 'Screenshot', category: 'Vision', status: 'idle' },
    { id: 't3', name: 'Terminal', category: 'Execution', status: 'idle' },
    { id: 't4', name: 'Delegation', category: 'Agent', status: 'idle' },
    { id: 't5', name: 'Memory', category: 'State', status: 'idle' },
  ],
  approvals: [],
  addEvent: () => {},
  setMission: () => {},
};

export function createStore() {
  let state = initialState;
  const listeners = new Set<() => void>();

  const setState = (partial: Partial<State>) => {
    state = { ...state, ...partial };
    listeners.forEach(fn => fn());
  };

  const addEvent = (event: ExecutionEvent) => {
    state = { ...state, events: [...state.events, event] };
    listeners.forEach(fn => fn());
  };

  const setMission = (mission: Mission) => {
    state = { ...state, mission };
    listeners.forEach(fn => fn());
  };

  return {
    getState: () => state,
    setState,
    addEvent,
    setMission,
    subscribe: (fn: () => void) => {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
  };
}
