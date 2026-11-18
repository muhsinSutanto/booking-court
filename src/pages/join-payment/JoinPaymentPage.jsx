import { ArrowRight, Calendar, Info, Lock } from "lucide-react";
import { FlowDock, FlowShell } from "@/components/match/FlowShell";
import { InfoNote } from "@/components/match/InfoNote";
import { MatchPreview } from "@/components/match/MatchPreview";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useJoinPayment } from "@/pages/join-payment/hooks/useJoinPayment";

export function JoinPaymentPage() {
  const { match, methods, methodId, setMethodId, paying, goBack, pay } =
    useJoinPayment();

  if (!match) {
    return (
      <FlowShell title="Pembayaran" onBack={goBack} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">
          Match tidak ditemukan.
        </p>
      </FlowShell>
    );
  }

  return (
    <FlowShell
      title="Pembayaran"
      onBack={goBack}
      back="circle"
      footer={
        <FlowDock note={`Pembayaran untuk 1 pemain • ${match.title}`}>
          <p className="mb-2 flex items-center justify-center gap-1.5 text-[12px] text-[#7d847e]">
            <Lock className="size-3.5" strokeWidth={1.75} />
            Pembayaran aman & terlindungi
          </p>
          <Button
            type="button"
            onClick={pay}
            disabled={paying || match.slotsLeft === 0}
            className="h-12 w-full rounded-full text-[14px] font-semibold"
          >
            {paying ? "Memproses..." : `Bayar ${match.totalFull}`}
            {paying ? null : <ArrowRight className="size-4" />}
          </Button>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-5 px-6 pt-4 pb-8">
        <header>
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#8b918b] uppercase">
            Langkah 2 dari 3
          </p>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            <span className="h-1 flex-1 rounded-full bg-lime" />
            <span className="h-1 flex-1 rounded-full bg-lime" />
            <span className="h-1 flex-1 rounded-full bg-[#e4e2da]" />
          </div>
          <h2 className="mt-2.5 max-w-[280px] text-[22px] leading-[1.05] font-bold tracking-[-0.045em] text-ink">
            Satu langkah ke lapangan.
          </h2>
          <p className="mt-1 text-[14px] leading-snug text-[#6e766f]">
            Selesaikan pembayaran untuk mengunci slotmu.
          </p>
        </header>

        <MatchPreview match={match} />

        <section className="flex items-center gap-2.5 rounded-[22px] bg-white px-5 py-3.5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f2ec] text-ink">
            <Calendar className="size-4" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[14px] font-semibold text-ink">
              {match.whenRange}
            </p>
            <p className="text-[13px] text-[#8a918b]">{match.duration}</p>
          </div>
        </section>

        <section className="rounded-[22px] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <h3 className="text-[14px] font-semibold text-ink">
            Metode pembayaran
          </h3>
          <div className="mt-2.5 flex flex-col gap-2">
            {methods.map((method) => {
              const selected = method.id === methodId;

              return (
                <button
                  key={method.id}
                  type="button"
                  onClick={() => setMethodId(method.id)}
                  aria-pressed={selected}
                  className={cn(
                    "flex items-center gap-2.5 rounded-2xl border px-2.5 py-2.5 text-left",
                    selected
                      ? "border-ink bg-[#fbfbf8]"
                      : "border-[#e4e2da] bg-white",
                  )}
                >
                  <span className="flex size-10 items-center justify-center rounded-xl bg-[#00aa13] text-[14px] font-bold text-white">
                    G
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[14px] font-semibold text-ink">
                      {method.name}
                    </span>
                    <span className="block text-[13px] text-[#7d847e]">
                      {method.detail}
                    </span>
                  </span>
                  <span
                    className={cn(
                      "flex size-5 items-center justify-center rounded-full border-2",
                      selected ? "border-ink bg-lime" : "border-[#c8ccc6]",
                    )}
                  >
                    {selected ? (
                      <span className="size-2 rounded-full bg-ink" />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <InfoNote icon={Info} title="Bayar praktis dengan GoPay">
          Pastikan saldo cukup sebelum membayar. Slot dikonfirmasi setelah
          pembayaran berhasil.
        </InfoNote>

        <section className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <div className="px-5 pt-4 pb-3.5">
            <h3 className="text-[14px] font-semibold text-ink">
              Ringkasan pembayaran
            </h3>
            <div className="mt-2 flex flex-col gap-1.5 text-[14px] text-[#3e4841]">
              <div className="flex justify-between gap-3">
                <span>1 slot open match</span>
                <span>{match.priceFull}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Biaya layanan</span>
                <span>{match.serviceLabel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#f6f7ee] px-5 py-3.5 text-[14px] font-bold text-ink">
            <span>Total</span>
            <span>{match.totalFull}</span>
          </div>
        </section>
      </div>
    </FlowShell>
  );
}
