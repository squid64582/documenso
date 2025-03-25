'use client';

import React from 'react';

import { formatDistanceToNow } from 'date-fns';
import { ChevronDown, ChevronUp, MessageSquare } from 'lucide-react';

import { cn } from '@documenso/ui/lib/utils';

import { AgentAvatar } from './agent-avatar';
import type { AgentId } from './task-progress';

interface AgentThought {
  id: string;
  agentId: string;
  agentRole: string;
  thought: string;
  timestamp: Date;
  isCollapsed: boolean;
}

interface AgentThoughtsProps {
  thoughts: AgentThought[];
  onToggleCollapse: (thoughtId: string) => void;
}

function isValidAgentId(id: string): id is AgentId {
  return ['web_scraper', 'image_analysis', 'content_analysis', 'market_research'].includes(id);
}

export function AgentThoughts({ thoughts, onToggleCollapse }: AgentThoughtsProps) {
  if (thoughts.length === 0) {
    return (
      <div className="text-muted-foreground flex h-32 items-center justify-center text-sm italic">
        Waiting for agents to start working...
      </div>
    );
  }

  // Group thoughts by agent
  const thoughtsByAgent = thoughts.reduce(
    (acc, thought) => {
      if (!acc[thought.agentId]) {
        acc[thought.agentId] = [];
      }
      acc[thought.agentId].push(thought);
      return acc;
    },
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    {} as Record<string, AgentThought[]>,
  );

  return (
    <div className="space-y-6">
      {Object.entries(thoughtsByAgent).map(([agentId, agentThoughts]) => (
        <div key={agentId} className="space-y-2">
          <div className="flex items-center gap-2">
            <AgentAvatar
              agentId={isValidAgentId(agentId) ? agentId : 'web_scraper'}
              role={agentThoughts[0].agentRole}
              size="sm"
              showPulse={agentThoughts[agentThoughts.length - 1].isCollapsed === false}
            />
            <h5 className="text-xs font-medium">{agentThoughts[0].agentRole}</h5>
          </div>

          <div className="space-y-2 pl-8">
            {agentThoughts.map((thought) => (
              <ThoughtBubble
                key={thought.id}
                thought={thought}
                onToggleCollapse={onToggleCollapse}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function ThoughtBubble({
  thought,
  onToggleCollapse,
}: {
  thought: AgentThought;
  onToggleCollapse: (thoughtId: string) => void;
}) {
  return (
    <div
      className={cn(
        'bg-background relative rounded-lg border p-3 text-xs transition-all',
        thought.isCollapsed ? 'max-h-10 overflow-hidden' : 'max-h-[500px]',
        'before:bg-border before:absolute before:left-0 before:top-4 before:h-[2px] before:w-4 before:-translate-x-full',
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <MessageSquare className="text-muted-foreground h-3 w-3" />
          <span className="text-muted-foreground text-xs">
            {formatDistanceToNow(thought.timestamp, { addSuffix: true })}
          </span>
        </div>
        <button
          onClick={() => onToggleCollapse(thought.id)}
          className="text-muted-foreground hover:text-foreground"
        >
          {thought.isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </button>
      </div>

      <div
        className={cn(
          'mt-2 transition-opacity',
          thought.isCollapsed ? 'opacity-60' : 'opacity-100',
        )}
      >
        {thought.thought}
      </div>
    </div>
  );
}
