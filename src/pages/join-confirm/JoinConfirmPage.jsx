import { ArrowRight, Calendar, Check, Info, User } from "lucide-react";
import { FlowDock, FlowShell } from "@/components/match/FlowShell";
import { InfoNote } from "@/components/match/InfoNote";
import { MatchPreview } from "@/components/match/MatchPreview";
import { Button } from "@/components/ui/button";
import { useJoinConfirm } from "@/pages/join-confirm/hooks/useJoinConfirm";

export function JoinConfirmPage() {
  const { match, player, goBack, continueToPayment, levelNote } =
    useJoinConfirm();

  if (!match) {
    return (
      <FlowShell title="Konfirmasi gabung" onBack={goBack} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">
          Match tidak ditemukan.
        </p>
      </FlowShell>
    );
  }

  return (
    <FlowShell
      title="Konfirmasi gabung"
      onBack={goBack}
      back="circle"
      footer={
        <FlowDock note="Dengan melanjutkan, kamu menyetujui aturan open match dan kebijakan venue.">
          <Button
            type="button"
            onClick={continueToPayment}
            disabled={match.slotsLeft === 0}
            className="h-12 w-full rounded-full text-[14px] font-semibold"
          >
            Lanjut ke pembayaran
            <ArrowRight className="size-4" />
          </Button>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-5 px-6 pt-4 pb-8">
        <header>
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#8b918b] uppercase">
            Langkah 1 dari 3
          </p>
          <StepMeter step={1} />
          <h2 className="mt-2.5 max-w-[280px] text-[22px] leading-[1.05] font-bold tracking-[-0.045em] text-ink">
            Siap main bareng?
          </h2>
          <p className="mt-1 text-[14px] leading-snug text-[#6e766f]">
            Cek detailmu sebelum mengamankan slot.
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
          <h3 className="text-[14px] font-semibold text-ink">Data pemain</h3>
          <div className="mt-2.5 flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-[#e7e6e0] text-[12px] font-semibold text-ink">
                <User className="size-5" strokeWidth={1.75} />
              </span>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold text-ink">
                  {player.name}
                </p>
                <p className="text-[13px] text-[#7d847e]">
                  1 pemain • {player.level}
                </p>
              </div>
            </div>
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
              <Check className="size-3.5" strokeWidth={2.5} />
            </span>
          </div>
        </section>

        <section className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <div className="px-5 pt-4 pb-3.5">
            <h3 className="text-[14px] font-semibold text-ink">
              Rincian biaya
            </h3>
            <div className="mt-2 flex flex-col gap-1.5 text-[14px] text-[#3e4841]">
              <div className="flex justify-between gap-3">
                <span>Open match • 1 pemain</span>
                <span>{match.priceFull}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Biaya layanan</span>
                <span>{match.serviceLabel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#f6f7ee] px-5 py-3.5 text-[14px] font-bold text-ink">
            <span>Total pembayaran</span>
            <span>{match.totalFull}</span>
          </div>
        </section>

        <InfoNote icon={Info} title="Level bermain sudah sesuai?">
          {levelNote}
        </InfoNote>
      </div>
    </FlowShell>
  );
}

function StepMeter({ step }) {
  return (
    <div className="mt-2 flex gap-1.5" aria-hidden="true">
      {Array.from({ length: 3 }, (_, index) => (
        <span
          key={index}
          className={
            index < step
              ? "h-1 flex-1 rounded-full bg-lime"
              : "h-1 flex-1 rounded-full bg-[#e4e2da]"
          }
        />
      ))}
    </div>
  );
}
