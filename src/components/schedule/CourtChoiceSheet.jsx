import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { formatRupiahFull } from '@/lib/format'

export function CourtChoiceSheet({ open, onOpenChange, courts, onChoose }) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-[28px] data-[side=bottom]:inset-x-auto data-[side=bottom]:right-auto data-[side=bottom]:left-1/2 data-[side=bottom]:w-full data-[side=bottom]:max-w-[430px] data-[side=bottom]:-translate-x-1/2"
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-base font-bold tracking-tight text-ink">
            Buat match
          </SheetTitle>
          <SheetDescription>Pilih lapangan untuk match ini.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-6 pb-6">
          {courts.map((court) => (
            <button
              key={court.id}
              type="button"
              onClick={() => onChoose(court.id)}
              className="flex items-center gap-3 rounded-[20px] bg-[#f6f5f1] px-3 py-3 text-left"
            >
              <img
                src={court.image}
                alt=""
                style={{ objectPosition: court.imagePosition }}
                className="size-14 shrink-0 rounded-[14px] object-cover"
              />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[14px] font-semibold text-ink">
                  {court.name}
                </span>
                <span className="mt-0.5 block truncate text-[12px] text-[#7d847e]">
                  {court.type}
                </span>
              </span>
              <span className="shrink-0 text-[13px] font-bold text-ink">
                {formatRupiahFull(court.price)}
              </span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
