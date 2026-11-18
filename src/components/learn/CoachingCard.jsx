import { Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

export function CoachingCard({ session, onOpen }) {
  return (
    <article
      onClick={() => onOpen(session.id)}
      className="cursor-pointer rounded-[24px] bg-white px-5 py-5 shadow-[0_8px_24px_rgba(23,48,38,0.05)]"
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <img
            src={session.coachImage}
            alt=""
            className="size-10 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-[14px] font-semibold text-ink">{session.coach}</p>
            <p className="truncate text-[12px] text-[#8b918b]">{session.formatLabel}</p>
          </div>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[15px] leading-none font-bold tracking-[-0.03em] text-ink">
            {session.priceFull}
          </p>
          <p className="mt-1 text-[11px] text-[#9aa098]">{session.unit}</p>
        </div>
      </div>

      <h2 className="mt-2 text-[15px] leading-tight font-bold tracking-[-0.03em] text-ink">
        {session.title}
      </h2>
      <p className="mt-1.5 flex items-center gap-1.5 text-[13px] text-[#7d847e]">
        <Clock className="size-3.5 shrink-0" strokeWidth={1.75} />
        {session.whenRange}
      </p>

      <div className="my-4 h-px bg-[#eceae4]" />

      <div className="flex items-center justify-between gap-3">
        <p className="min-w-0 truncate text-[13px] text-[#8b918b]">
          {session.level} • {session.slotLabel}
        </p>
        <button
          type="button"
          disabled={session.enrolled || session.spotsLeft === 0}
          onClick={(event) => {
            event.stopPropagation()
            onOpen(session.id)
          }}
          className={cn(
            'h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold',
            session.enrolled || session.spotsLeft === 0
              ? 'bg-[#eceae4] text-[#8b918b]'
              : 'bg-ink text-white',
          )}
        >
          {session.enrolled ? 'Terdaftar' : session.spotsLeft === 0 ? 'Penuh' : 'Ikuti'}
        </button>
      </div>
    </article>
  )
}
