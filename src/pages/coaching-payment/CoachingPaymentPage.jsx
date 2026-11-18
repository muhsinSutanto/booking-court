import { ArrowRight, Calendar, Info, Lock } from 'lucide-react'
import { StepMeter } from '@/components/booking/StepMeter'
import { InfoNote } from '@/components/match/InfoNote'
import { FlowDock, FlowShell } from '@/components/match/FlowShell'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { useCoachingPayment } from '@/pages/coaching-payment/hooks/useCoachingPayment'

export function CoachingPaymentPage() {
  const { session, methods, methodId, setMethodId, paying, goBack, pay } = useCoachingPayment()

  if (!session) {
    return (
      <FlowShell title="Pembayaran" onBack={goBack} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">Kelas tidak ditemukan.</p>
      </FlowShell>
    )
  }

  const priceLine = session.format === 'private' ? 'Sesi private' : 'Kelas group'

  return (
    <FlowShell
      title="Pembayaran"
      onBack={goBack}
      back="circle"
      footer={
        <FlowDock note={`${session.title} • ${session.when}`}>
          <p className="mb-2 flex items-center justify-center gap-1.5 text-[12px] text-[#7d847e]">
            <Lock className="size-3.5" strokeWidth={1.75} />
            Pembayaran aman & terlindungi
          </p>
          <Button
            type="button"
            onClick={pay}
            disabled={paying || session.enrolled || session.spotsLeft === 0}
            className="h-12 w-full rounded-full text-[14px] font-semibold"
          >
            {paying ? 'Memproses...' : `Bayar ${session.priceFull}`}
            {paying ? null : <ArrowRight className="size-4" />}
          </Button>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <header>
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#8b918b] uppercase">
            Langkah 2 dari 3
          </p>
          <StepMeter step={2} />
          <h2 className="mt-5 text-[18px] leading-tight font-bold tracking-[-0.03em] text-ink">
            Kunci tempatmu.
          </h2>
          <p className="mt-2 text-[13px] leading-relaxed text-[#6e766f]">
            Bayar sekarang supaya slot kelas ini tidak diambil.
          </p>
        </header>

        <div className="flex items-center gap-3 rounded-[22px] bg-white p-3.5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <img
            src={session.coachImage}
            alt=""
            className="size-16 shrink-0 rounded-[14px] object-cover"
          />
          <div className="min-w-0 pr-1">
            <span className="inline-flex h-5 items-center rounded-full bg-lime px-2 text-[10px] font-bold tracking-[0.06em] text-ink uppercase">
              {session.formatLabel}
            </span>
            <p className="mt-1 truncate text-[14px] leading-tight font-bold tracking-[-0.03em] text-ink">
              {session.title}
            </p>
            <p className="mt-0.5 truncate text-[12px] text-[#7d847e]">{session.coach}</p>
          </div>
        </div>

        <section className="flex items-center gap-3.5 rounded-[22px] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f2ec] text-ink">
            <Calendar className="size-4" strokeWidth={1.75} />
          </span>
          <div className="min-w-0">
            <p className="text-[14px] font-semibold text-ink">{session.whenRange}</p>
            <p className="mt-0.5 text-[13px] text-[#8a918b]">{session.duration}</p>
          </div>
        </section>

        <section className="rounded-[22px] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <h3 className="text-[14px] font-semibold text-ink">Metode pembayaran</h3>
          <div className="mt-4 flex flex-col gap-3">
            {methods.map((method) => {
              const selected = method.id === methodId
              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setMethodId(method.id)}
                  aria-pressed={selected}
                  className={cn(
                    'flex items-center gap-3.5 rounded-[20px] border px-4 py-3.5 text-left',
                    selected ? 'border-ink bg-[#fbfbf8]' : 'border-[#e4e2da] bg-white',
                  )}
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#00aa13] text-[14px] font-bold text-white">
                    G
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-ink">{method.name}</span>
                    <span className="mt-0.5 block text-[12px] leading-snug text-[#7d847e]">
                      {method.detail}
                    </span>
                  </span>
                  <span
                    className={cn(
                      'flex size-5 items-center justify-center rounded-full border-2',
                      selected ? 'border-ink bg-lime' : 'border-[#c8ccc6]',
                    )}
                  >
                    {selected ? <span className="size-2 rounded-full bg-ink" /> : null}
                  </span>
                </button>
              )
            })}
          </div>
        </section>

        <InfoNote icon={Info} title="Bayar praktis dengan GoPay" className="py-5">
          Pastikan saldo cukup. Tempatmu dikunci setelah pembayaran berhasil.
        </InfoNote>

        <section className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <div className="px-5 pt-5 pb-5">
            <h3 className="text-[14px] font-semibold text-ink">Ringkasan pembayaran</h3>
            <div className="mt-4 flex flex-col gap-3 text-[14px] text-[#3e4841]">
              <div className="flex justify-between gap-3">
                <span>{priceLine}</span>
                <span>{session.priceFull}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Biaya layanan</span>
                <span>{session.serviceLabel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#f6f7ee] px-5 py-4 text-[14px] font-bold text-ink">
            <span>Total</span>
            <span>{session.priceFull}</span>
          </div>
        </section>
      </div>
    </FlowShell>
  )
}
