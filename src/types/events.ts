export type ActorType = 'hermes' | 'agent' | 'skill' | 'tool' | 'system' | 'governance';

export type EventType =
  | 'MISSION_STARTED'
  | 'MISSION_COMPLETED'
  | 'AGENT_STARTED'
  | 'AGENT_COMPLETED'
  | 'AGENT_DELEGATED'
  | 'SKILL_SELECTED'
  | 'SKILL_STARTED'
  | 'SKILL_COMPLETED'
  | 'TOOL_SELECTED'
  | 'TOOL_STARTED'
  | 'TOOL_COMPLETED'
  | 'APPROVAL_REQUIRED'
  | 'ACTION_BLOCKED'
  | 'ERROR'
  | 'SUCCESS';

export type AgentStatus = 'IDLE' | 'RUNNING' | 'THINKING' | 'DELEGATING' | 'WAITING' | 'BLOCKED' | 'REQUIRES_APPROVAL' | 'SUCCESS' | 'ERROR';
export type MissionStatus = 'IDLE' | 'RUNNING' | 'PAUSED' | 'COMPLETED' | 'ERROR';

export interface ExecutionEvent {
  id: string;
  timestamp: string;
  executionId: string;
  parentId: string | null;
  actor: string;
  actorType: ActorType;
  eventType: EventType;
  status: 'queued' | 'running' | 'completed' | 'failed' | 'waiting';
  message: string;
  agent?: string;
  skill?: string;
  tool?: string;
  metadata?: Record<string, unknown>;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  status: AgentStatus;
  mission?: string;
  skills?: string[];
  tools?: string[];
}

export interface Skill {
  id: string;
  name: string;
  category: 'CREATIVE' | 'GROWTH' | 'OPERATIONS' | 'GOVERNANCE' | 'OTHER';
  active: boolean;
  lastUsed?: string;
}

export interface Tool {
  id: string;
  name: string;
  category: string;
  agent?: string;
  status: 'idle' | 'active' | 'error';
  lastRun?: string;
}

export interface ApprovalRequest {
  id: string;
  actor: string;
  action: string;
  risk: 'low' | 'medium' | 'high';
  reason: string;
  status: 'PENDING' | 'APPROVED' | 'DENIED';
}

export interface Mission {
  id: string;
  name: string;
  status: MissionStatus;
  startedAt?: string;
  elapsed?: number;
  progress: number;
  currentAgent?: string;
  currentSkill?: string;
  currentTool?: string;
  governance: 'CLEAR' | 'PENDING' | 'BLOCKED';
}
