import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { DatePills } from '@/components/booking/DatePills'
import { cn } from '@/lib/utils'

export function BookingFilterSheet({
  open,
  onOpenChange,
  days,
  durations,
  dayId,
  minutes,
  onDayChange,
  onMinutesChange,
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
          <SheetDescription>Pilih tanggal dan durasi sewa.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-6">
          <section>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[13px] font-semibold text-ink">Tanggal</h3>
              <span className="text-[13px] font-medium text-[#8b908a]">November 2026</span>
            </div>
            <div className="mt-4">
              <DatePills days={days} value={dayId} onChange={onDayChange} />
            </div>
          </section>
          <section>
            <h3 className="text-[13px] font-semibold text-ink">Durasi</h3>
            <div className="mt-4 flex gap-2">
              {durations.map((item) => {
                const active = item.id === minutes
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onMinutesChange(item.id)}
                    className={cn(
                      'h-10 flex-1 rounded-full text-[14px] font-semibold',
                      active ? 'bg-ink text-white' : 'bg-[#f3f2ec] text-ink',
                    )}
                  >
                    {item.label}
                  </button>
                )
              })}
            </div>
          </section>
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
