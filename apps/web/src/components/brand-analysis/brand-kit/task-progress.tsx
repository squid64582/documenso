'use client';

import React from 'react';

import { CheckCircle, Clock, Loader2 } from 'lucide-react';

import { cn } from '@documenso/ui/lib/utils';

import { AgentAvatar } from './agent-avatar';

export type AgentId = 'web_scraper' | 'image_analysis' | 'content_analysis' | 'market_research';

export interface Task {
  id: number;
  name: string;
  duration: number;
  agentId: AgentId;
  agentRole: string;
}

interface TaskProgressProps {
  tasks: Task[];
  completedTaskIds: number[];
}

export function TaskProgress({ tasks, completedTaskIds }: TaskProgressProps) {
  if (tasks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <div className="flex justify-between text-sm">
          <span>Progress</span>
          <span>
            {completedTaskIds.length}/{tasks.length} tasks
          </span>
        </div>
        <div className="bg-secondary h-2 overflow-hidden rounded-full">
          <div
            className="bg-primary h-full transition-all duration-500 ease-in-out"
            style={{
              width: `${tasks.length > 0 ? (completedTaskIds.length / tasks.length) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-2">
        {tasks.map((task) => {
          const isCompleted = completedTaskIds.includes(task.id);
          const isActive = !isCompleted && tasks.indexOf(task) === completedTaskIds.length;

          return (
            <div
              key={task.id}
              className={cn(
                'relative flex items-center rounded-md border p-3 transition-colors',
                isCompleted
                  ? 'border-zinc-200 bg-white dark:border-zinc-900 dark:bg-zinc-950/30'
                  : isActive
                    ? 'border-rose-200 bg-rose-50 dark:border-rose-900 dark:bg-rose-950/30'
                    : 'border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/30',
              )}
            >
              <div className="mr-3">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-rose-500" />
                ) : isActive ? (
                  <Loader2 className="h-5 w-5 animate-spin text-rose-500" />
                ) : (
                  <Clock className="h-5 w-5 text-zinc-400" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'truncate text-sm font-medium',
                    isCompleted
                      ? 'text-zinc-700 dark:text-zinc-300'
                      : isActive
                        ? 'text-rose-700 dark:text-rose-300'
                        : 'text-zinc-700 dark:text-zinc-300',
                  )}
                >
                  {task.name}
                </p>
              </div>
              <div className="ml-2">
                <AgentAvatar
                  agentId={task.agentId}
                  role={task.agentRole}
                  isActive={isActive}
                  isCompleted={isCompleted}
                />
              </div>
              {isActive && (
                <div className="absolute -right-3 top-1/2 h-[2px] w-6 -translate-y-1/2 bg-rose-200 dark:bg-rose-800" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
