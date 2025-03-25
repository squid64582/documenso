'use client';

import React from 'react';

import { Layout, Palette, Type, Users } from 'lucide-react';

import { cn } from '@documenso/ui/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@documenso/ui/primitives/tooltip';

// Define agent types and their corresponding icons and colors
const AGENT_TYPES = {
  web_scraper: {
    icon: Layout,
    color: 'bg-white text-rose-600 dark:bg-rose-900 dark:text-rose-300',
    pulseColor: 'bg-rose-500',
  },
  image_analysis: {
    icon: Palette,
    color: 'bg-white text-rose-600 dark:bg-rose-900 dark:text-rose-300',
    pulseColor: 'bg-rose-500',
  },
  content_analysis: {
    icon: Type,
    color: 'bg-white text-rose-600 dark:bg-rose-900 dark:text-rose-300',
    pulseColor: 'bg-rose-500',
  },
  market_research: {
    icon: Users,
    color: 'bg-white text-rose-600 dark:bg-rose-900 dark:text-rose-300',
    pulseColor: 'bg-rose-500',
  },
} as const;

interface AgentAvatarProps {
  agentId: keyof typeof AGENT_TYPES;
  role: string;
  isActive?: boolean;
  isCompleted?: boolean;
  showPulse?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function AgentAvatar({
  agentId,
  role,
  isActive = false,
  isCompleted = false,
  showPulse = false,
  size = 'md',
}: AgentAvatarProps) {
  const agent = AGENT_TYPES[agentId];
  const Icon = agent.icon;

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5',
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <div className="relative">
            <div
              className={cn(
                'flex items-center justify-center rounded-full transition-colors',
                sizeClasses[size],
                agent.color,
                isActive && 'ring-1 ring-rose-400 dark:ring-rose-500',
                isCompleted && 'ring-1 ring-zinc-200 dark:ring-zinc-500',
              )}
            >
              <Icon className={iconSizes[size]} />
            </div>
            {(isActive || showPulse) && (
              <span className="absolute right-0 top-0 flex h-2 w-2">
                <span
                  className={cn(
                    'absolute inline-flex h-full w-full animate-ping rounded-full opacity-75',
                    agent.pulseColor,
                  )}
                />
                <span
                  className={cn('relative inline-flex h-2 w-2 rounded-full', agent.pulseColor)}
                />
              </span>
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent side="right">
          <p className="font-medium">{role}</p>
          <p className="text-muted-foreground text-xs">Agent {agentId.split('-')[1]}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
