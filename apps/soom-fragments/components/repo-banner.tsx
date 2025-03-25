import { InfoIcon } from './icons'
import { Separator } from './ui/separator'
import { cn } from '@/lib/utils'
import { RiBookFill } from '@remixicon/react'

const REPO_URL = 'https://soom.io'

export function RepoBanner({ className }: { className?: string }) {
  return (
    <a
      href={REPO_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Soom documentation`}
      className={cn(
        'bg-zinc-50 dark:bg-zinc-800 overflow-hidden px-3 py-1 rounded-t-md',
        'gap-2 flex items-center border border-b-0',
        'transform-y-1 group relative',
        'before:absolute before:inset-0 dark:before:bg-[radial-gradient(circle_at_10%_-50%,rgba(255,255,255,0.1),transparent_10%)] before:rounded-t-2xl before:pointer-events-none',
        className,
      )}
    >
      <InfoIcon className="w-4 h-4" aria-hidden="true" />
      <Separator
        orientation="vertical"
        className="h-6 bg-[hsl(var(--border))]"
        aria-hidden="true"
      />
      <p className="text-xs font-normal text-foreground tracking-wide">
        Curious? Learn more...
      </p>
      <div
        className="flex items-center gap-1 text-foreground/80"
        role="status"
        aria-live="polite"
      >
        <RiBookFill
          className="w-3 h-3 transition-transform group-hover:text-[#e11d48] duration-200 ease-in-out"
          aria-label="GitHub stars"
        />
      </div>
    </a>
  )
}
