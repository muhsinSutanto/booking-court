import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { presentShare } from '@/lib/court'

export function PayChoiceSheet({ open, onOpenChange, booking, onChoose }) {
  const choices = ['all', 'player'].map((share) => presentShare(booking, share))

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="rounded-t-[28px] data-[side=bottom]:inset-x-auto data-[side=bottom]:right-auto data-[side=bottom]:left-1/2 data-[side=bottom]:w-full data-[side=bottom]:max-w-[430px] data-[side=bottom]:-translate-x-1/2"
      >
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-base font-bold tracking-tight text-ink">
            Pesan lapangan
          </SheetTitle>
          <SheetDescription>Pilih bagian yang ingin dibayar.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-3 px-6 pb-6">
          {choices.map((choice) => (
            <button
              key={choice.share}
              type="button"
              onClick={() => onChoose(choice.share)}
              className="flex items-center justify-between gap-4 rounded-[20px] bg-[#f6f5f1] px-4 py-4 text-left"
            >
              <span>
                <span className="block text-[14px] font-semibold text-ink">{choice.label}</span>
                <span className="mt-1 block text-[12px] text-[#7d847e]">{choice.detail}</span>
              </span>
              <span className="shrink-0 text-[14px] font-bold text-ink">
                {choice.amountFull}
              </span>
            </button>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  )
}
