import { ArrowRight, Calendar, Check, MapPin } from "lucide-react";
import { FlowDock, FlowShell } from "@/components/match/FlowShell";
import { PlayerLineup } from "@/components/match/PlayerLineup";
import { Button } from "@/components/ui/button";
import { useMatchDetail } from "@/pages/match/hooks/useMatchDetail";

export function MatchDetailPage() {
  const { match, lineup, goBack, continueJoin, viewTicket } = useMatchDetail();

  if (!match) {
    return (
      <FlowShell title="Detail open match" onBack={goBack}>
        <p className="px-6 pt-12 text-sm text-muted-foreground">
          Match tidak ditemukan.
        </p>
      </FlowShell>
    );
  }

  const closed = match.joined || match.slotsLeft === 0;
  const actionLabel = match.joined
    ? "Lihat tiket"
    : match.slotsLeft === 0
      ? "Penuh"
      : "Gabung match";

  return (
    <FlowShell
      title="Detail open match"
      onBack={goBack}
      back="circle"
      footer={
        <FlowDock
          align="left"
          note={
            match.slotsLeft === 0
              ? "Slot sudah penuh • biaya lapangan sudah termasuk."
              : `${match.slotsLeft} slot tersisa • biaya lapangan sudah termasuk.`
          }
        >
          <div className="flex items-center justify-between gap-4">
            <div className="shrink-0">
              <p className="text-[12px] text-[#8b918b]">Per pemain</p>
              <p className="text-[18px] leading-none font-bold tracking-[-0.04em] text-ink">
                {match.priceFull}
              </p>
            </div>
            <Button
              type="button"
              disabled={!match.joined && match.slotsLeft === 0}
              onClick={match.joined ? viewTicket : continueJoin}
              className="h-11 shrink-0 rounded-full px-4 text-[14px] font-semibold"
            >
              {actionLabel}
              {closed && !match.joined ? null : (
                <ArrowRight className="size-4" />
              )}
            </Button>
          </div>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-5 px-6 pt-4 pb-8">
        <article className="overflow-hidden rounded-[24px] bg-[#123026] text-white shadow-[0_14px_32px_rgba(18,48,38,0.16)]">
          <div className="relative">
            <img
              src={match.image}
              alt=""
              style={{ objectPosition: match.imagePosition }}
              className="h-[168px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#123026] via-[#123026]/10 to-black/10" />
            <div className="absolute top-3 left-3">
              <span className="inline-flex h-7 items-center rounded-full bg-lime px-3 text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
                {match.status}
              </span>
            </div>
            <span className="absolute top-3 right-3 inline-flex h-7 items-center rounded-full bg-white/92 px-3 text-[12px] font-semibold text-ink">
              {match.slotLabel}
            </span>
          </div>
          <div className="px-5 pt-4 pb-4">
            <h2 className="max-w-[280px] text-[22px] leading-[1.02] font-bold tracking-[-0.045em]">
              {match.title}
            </h2>
            <p className="mt-1.5 text-[14px] leading-snug text-white/72">
              {match.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex h-7 items-center rounded-full bg-lime px-3 text-[12px] font-semibold text-ink">
                {match.level}
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-white/12 px-3 text-[12px] font-medium text-white">
                {match.format}
              </span>
            </div>
          </div>
        </article>

        <section className="rounded-[22px] bg-white px-5 py-2 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <Fact
            icon={Calendar}
            title={match.whenRange}
            detail={match.duration}
          />
          <div className="ml-[46px] h-px bg-[#eceae4]" />
          <Fact icon={MapPin} title={match.place} detail={match.venue} />
        </section>

        <section className="rounded-[22px] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <div className="flex items-center justify-between">
            <h3 className="text-[14px] font-semibold text-ink">Pemain</h3>
            <p className="text-[13px] text-[#8a918b]">
              {lineup.length} dari {match.slotsTotal} pemain
            </p>
          </div>
          <div className="mt-2.5 flex gap-1.5" aria-hidden="true">
            {Array.from({ length: match.slotsTotal }, (_, index) => (
              <span
                key={index}
                className={
                  index < lineup.length
                    ? "h-1.5 flex-1 rounded-full bg-lime"
                    : "h-1.5 flex-1 rounded-full bg-[#eceae4]"
                }
              />
            ))}
          </div>
          <div className="mt-3">
            <PlayerLineup
              players={lineup}
              slotsTotal={match.slotsTotal}
              tone="soft"
            />
          </div>
        </section>

        <section className="rounded-[22px] bg-lime px-5 py-4 text-ink">
          <h3 className="text-[14px] font-semibold">Sebelum kamu gabung</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {match.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-2.5 text-[14px] leading-snug"
              >
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-ink text-lime">
                  <Check className="size-3" strokeWidth={2.5} />
                </span>
                {note}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </FlowShell>
  );
}

function Fact({ icon: Icon, title, detail }) {
  return (
    <div className="flex items-center gap-3 py-3.5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#f3f2ec] text-ink">
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-ink">{title}</p>
        <p className="truncate text-[13px] text-[#8a918b]">{detail}</p>
      </div>
    </div>
  );
}
