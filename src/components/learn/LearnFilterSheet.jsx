import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

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

export function LearnFilterSheet({
  open,
  onOpenChange,
  formats,
  coaches,
  format,
  coach,
  onFormatChange,
  onCoachChange,
  onReset,
  onApply,
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-[28px] data-[side=bottom]:inset-x-auto data-[side=bottom]:right-auto data-[side=bottom]:left-1/2 data-[side=bottom]:w-full data-[side=bottom]:max-w-[430px] data-[side=bottom]:-translate-x-1/2"
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-base font-bold tracking-tight text-ink">Filter</SheetTitle>
          <SheetDescription>Pilih tipe kelas dan coach.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-6 px-6">
          <OptionGroup title="Tipe" options={formats} value={format} onChange={onFormatChange} />
          <OptionGroup title="Coach" options={coaches} value={coach} onChange={onCoachChange} />
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
