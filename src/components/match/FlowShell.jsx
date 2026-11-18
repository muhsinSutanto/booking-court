import { ArrowLeft } from 'lucide-react'
import { PhoneFrame } from '@/components/layout/PhoneFrame'
import { cn } from '@/lib/utils'

export function FlowShell({ title, onBack, children, footer, back = 'plain' }) {
  return (
    <PhoneFrame>
      <header className="grid grid-cols-[2.75rem_1fr_2.75rem] items-center bg-background px-6 pt-[max(0.85rem,env(safe-area-inset-top))] pb-3">
        <button
          type="button"
          onClick={onBack}
          aria-label="Kembali"
          className={cn(
            'flex size-10 items-center justify-center rounded-full text-ink',
            back === 'circle' &&
              'size-9 border border-black/8 bg-white shadow-[0_1px_2px_rgba(23,48,38,0.08)]',
          )}
        >
          <ArrowLeft className="size-[18px]" strokeWidth={1.75} />
        </button>
        <h1 className="truncate text-center text-[14px] font-medium tracking-[-0.02em] text-ink">
          {title}
        </h1>
        <span />
      </header>
      <main className="flex-1 overflow-y-auto">{children}</main>
      {footer}
    </PhoneFrame>
  )
}

export function FlowDock({ children, note, align = 'center' }) {
  return (
    <div className="border-t border-[#eceae4] bg-background px-6 pt-4 pb-[max(0.9rem,env(safe-area-inset-bottom))]">
      {children}
      {note ? (
        <p
          className={cn(
            'mt-1.5 text-[11px] leading-snug text-[#8b918b]',
            align === 'left' ? 'text-left' : 'text-center',
          )}
        >
          {note}
        </p>
      ) : null}
    </div>
  )
}
