'use client';

import { motion } from 'framer-motion';
import { Skill } from '@/types/events';
import { useState } from 'react';

const CATEGORIES = ['ALL', 'CREATIVE', 'GROWTH', 'OPERATIONS', 'GOVERNANCE', 'OTHER'] as const;

export function SkillsPanel({ skills }: { skills: Skill[] }) {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>('ALL');
  const filtered = category === 'ALL' ? skills : skills.filter(s => s.category === category);
  const active = skills.filter(s => s.active).length;

  return (
    <div className="h-full">
      <div className="mb-2 flex items-center justify-between px-1">
        <div>
          <div className="text-xs font-semibold text-command-text">SKILLS</div>
          <div className="text-[11px] text-command-muted">{active}/{skills.length} active</div>
        </div>
      </div>
      <div className="flex flex-wrap gap-1 px-1">
        {CATEGORIES.map(c => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={`rounded-full border px-2 py-0.5 text-[10px] ${
              category === c ? 'border-command-accent/40 bg-command-accent/10 text-command-text' : 'border-command-border text-command-muted'
            }`}
          >
            {c}
          </button>
        ))}
      </div>
      <div className="mt-2 space-y-1 overflow-y-auto pr-1">
        {filtered.map(s => (
          <motion.div layout key={s.id} className="flex items-center justify-between rounded-lg border border-command-border bg-command-elevated/60 px-3 py-2">
            <div>
              <div className="text-[11px] text-command-text">{s.name}</div>
              <div className="text-[10px] text-command-muted">{s.category}</div>
            </div>
            <span className={`text-[10px] font-mono ${s.active ? 'text-command-success' : 'text-command-muted'}`}>
              {s.active ? 'ACTIVE' : 'IDLE'}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
