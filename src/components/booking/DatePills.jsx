import { cn } from '@/lib/utils'

export function DatePills({ days, value, onChange }) {
  return (
    <div className="flex gap-2 overflow-x-auto no-scrollbar">
      {days.map((day) => {
        const active = day.id === value
        return (
          <button
            key={day.id}
            type="button"
            onClick={() => onChange(day.id)}
            className={cn(
              'flex h-[92px] w-[54px] shrink-0 flex-col items-center justify-center rounded-full',
              active ? 'bg-ink text-white' : 'bg-[#f4f3ee] text-ink',
            )}
          >
            <span
              className={cn(
                'text-[11px] font-medium',
                active ? 'text-white/75' : 'text-[#8b918b]',
              )}
            >
              {day.weekday}
            </span>
            <span className="mt-1 text-[18px] leading-none font-bold">{day.dayNumber}</span>
            <span
              className={cn(
                'mt-1.5 text-[10px] font-semibold',
                active ? 'text-lime' : 'text-[#8b918b]',
              )}
            >
              {day.caption}
            </span>
          </button>
        )
      })}
    </div>
  )
}
