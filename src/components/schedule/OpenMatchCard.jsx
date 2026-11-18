import { Clock, Plus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'

export function OpenMatchCard({ match, onOpen }) {
  const label = match.joined ? 'Tergabung' : 'Gabung'

  return (
    <article
      onClick={() => onOpen(match.id)}
      className="cursor-pointer rounded-[24px] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(23,48,38,0.05)]"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="pt-0.5 text-[11px] font-medium tracking-[0.08em] text-[#9aa098] uppercase">
          {match.courtLabel}
        </p>
        <div className="shrink-0 text-right">
          <p className="text-[15px] leading-none font-bold tracking-[-0.03em] text-ink">
            {match.priceFull}
          </p>
          <p className="mt-1 text-[11px] text-[#9aa098]">/orang</p>
        </div>
      </div>

      <h2 className="mt-1 text-[15px] leading-tight font-bold tracking-[-0.03em] text-ink">
        {match.title}
      </h2>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#7d847e]">
        <Clock className="size-3.5" strokeWidth={1.75} />
        {match.whenLabel}
      </p>

      <div className="my-4 h-px bg-[#eceae4]" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="shrink-0 text-[13px] text-[#8b918b]">Slot ({match.slotCount})</span>
          <div className="flex items-center">
            {match.roster.map((player) => (
              <Avatar key={player.id} className="-ml-1.5 size-7 after:border-white first:ml-0">
                <AvatarFallback
                  className="text-[10px] font-semibold"
                  style={{ backgroundColor: player.color, color: player.text }}
                >
                  {player.initials}
                </AvatarFallback>
              </Avatar>
            ))}
            {Array.from({ length: match.slotsLeft }, (_, index) => (
              <span
                key={index}
                className="-ml-1.5 flex size-7 items-center justify-center rounded-full bg-[#f3f2ec] text-[#8b918b]"
              >
                <Plus className="size-3.5" strokeWidth={1.75} />
              </span>
            ))}
          </div>
        </div>
        <button
          type="button"
          disabled={!match.canJoin && !match.joined}
          onClick={(event) => {
            event.stopPropagation()
            onOpen(match.id)
          }}
          className={cn(
            'h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold',
            match.canJoin
              ? 'bg-ink text-white'
              : 'bg-[#eceae4] text-[#a3a8a2] disabled:opacity-100',
          )}
        >
          {label}
        </button>
      </div>
    </article>
  )
}
