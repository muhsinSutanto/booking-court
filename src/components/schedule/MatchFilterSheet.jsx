import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

function DatePicker({ dates, monthLabel, value, onChange }) {
  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">Tanggal</h3>
        <span className="text-[13px] font-medium text-[#8b908a]">{monthLabel}</span>
      </div>
      <div className="mt-4 flex gap-2.5 overflow-x-auto no-scrollbar">
        {dates.map((day) => {
          const active = day.id === value
          return (
            <button
              key={day.id}
              type="button"
              onClick={() => onChange(active ? 'all' : day.id)}
              className={cn(
                'flex h-[76px] w-[58px] shrink-0 flex-col items-center justify-center rounded-full',
                active ? 'bg-ink text-white' : 'bg-[#f3f2ec] text-ink',
              )}
            >
              <span className={cn('text-[11px] font-medium', active ? 'text-white/75' : 'text-[#8b918b]')}>
                {day.weekday}
              </span>
              <span className="mt-0.5 text-[16px] leading-none font-bold">{day.dayNumber}</span>
              <span className={cn('mt-1 text-[10px]', active ? 'text-white/75' : 'text-[#8b918b]')}>
                {day.caption}
              </span>
            </button>
          )
        })}
      </div>
    </section>
  )
}

function OptionGroup({ title, options, value, onChange }) {
  return (
    <section>
      <h3 className="text-[13px] font-semibold tracking-[-0.01em] text-ink">{title}</h3>
      <div className="mt-4 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = option.id === value
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => onChange(option.id)}
              className={cn(
                'h-9 rounded-full px-4 text-[13px] font-semibold',
                active ? 'bg-ink text-white' : 'bg-[#f3f2ec] text-ink',
              )}
            >
              {option.label}
            </button>
          )
        })}
      </div>
    </section>
  )
}

export function MatchFilterSheet({
  open,
  onOpenChange,
  dates,
  monthLabel,
  levels,
  date,
  level,
  onDateChange,
  onLevelChange,
  onReset,
  onApply,
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="max-h-[85svh] overflow-y-auto rounded-t-[28px] data-[side=bottom]:inset-x-auto data-[side=bottom]:right-auto data-[side=bottom]:left-1/2 data-[side=bottom]:w-full data-[side=bottom]:max-w-[430px] data-[side=bottom]:-translate-x-1/2"
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-base font-bold tracking-tight text-ink">Filter</SheetTitle>
          <SheetDescription>Pilih tanggal dan level match.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-6">
          <DatePicker dates={dates} monthLabel={monthLabel} value={date} onChange={onDateChange} />
          <OptionGroup title="Level" options={levels} value={level} onChange={onLevelChange} />
        </div>
        <div className="flex gap-2 px-6 pt-2 pb-6">
          <Button
            type="button"
            variant="outline"
            onClick={onReset}
            className="h-11 flex-1 rounded-full bg-white text-[14px] font-semibold"
          >
            Atur ulang
          </Button>
          <Button
            type="button"
            onClick={onApply}
            className="h-11 flex-1 rounded-full text-[14px] font-semibold"
          >
            Terapkan
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
