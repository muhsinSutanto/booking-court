import { ArrowRight, Calendar, Check, Clock, MapPin } from "lucide-react";
import { FlowDock, FlowShell } from "@/components/match/FlowShell";
import { Button } from "@/components/ui/button";
import { useJoinSuccess } from "@/pages/join-success/hooks/useJoinSuccess";

export function JoinSuccessPage() {
  const { match, method, seatNote, goHome } = useJoinSuccess();

  if (!match) {
    return (
      <FlowShell title="Open match" onBack={goHome} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">
          Match tidak ditemukan.
        </p>
      </FlowShell>
    );
  }

  return (
    <FlowShell
      title="Open match"
      onBack={goHome}
      back="circle"
      footer={
        <FlowDock note="Tiketmu juga bisa dibuka dari menu Booking.">
          <Button
            type="button"
            onClick={goHome}
            className="h-12 w-full rounded-full text-[14px] font-semibold"
          >
            Kembali ke Home
            <ArrowRight className="size-4" />
          </Button>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-5 px-6 pt-4 pb-8">
        <header className="text-center">
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#8b918b] uppercase">
            Langkah 3 dari 3
          </p>
          <div className="mt-2 flex gap-1.5" aria-hidden="true">
            <span className="h-1 flex-1 rounded-full bg-lime" />
            <span className="h-1 flex-1 rounded-full bg-lime" />
            <span className="h-1 flex-1 rounded-full bg-lime" />
          </div>
          <div className="mx-auto mt-4 flex size-14 items-center justify-center rounded-full bg-lime text-ink shadow-[0_8px_18px_rgba(214,242,92,0.4)]">
            <Check className="size-6" strokeWidth={2.25} />
          </div>
          <h2 className="mt-3 text-[22px] leading-[1.05] font-bold tracking-[-0.045em] text-ink">
            Kamu masuk line-up!
          </h2>
          <p className="mt-1 text-[14px] leading-snug text-[#6e766f]">
            Slotmu sudah aman. Sampai ketemu di lapangan!
          </p>
        </header>

        <article className="overflow-hidden rounded-[24px] bg-[#123026] text-white shadow-[0_14px_32px_rgba(18,48,38,0.16)]">
          <div className="relative">
            <img
              src={match.image}
              alt=""
              style={{ objectPosition: match.imagePosition }}
              className="h-[112px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#123026] via-[#123026]/20 to-black/10" />
            <span className="absolute top-3 left-3 inline-flex h-7 items-center rounded-full bg-lime px-3 text-[11px] font-bold tracking-[0.08em] text-ink">
              LUNAS
            </span>
            <span className="absolute top-3 right-3 inline-flex h-7 items-center rounded-full bg-black/45 px-3 text-[12px] font-semibold tracking-[0.04em] text-white">
              {match.code}
            </span>
          </div>
          <div className="px-5 pt-4 pb-4">
            <h3 className="text-[18px] leading-[1.05] font-bold tracking-[-0.04em]">
              {match.title}
            </h3>
            <p className="mt-0.5 text-[12px] font-medium tracking-[0.06em] text-white/65 uppercase">
              {match.status} • {match.level}
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <TicketFact
                icon={Calendar}
                title={match.whenRange}
                detail={match.durationShort}
              />
              <TicketFact
                icon={MapPin}
                title={match.place}
                detail={match.venue}
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
            <p className="text-[14px] text-white/80">1 pemain • {method}</p>
            <p className="text-[14px] font-bold">{match.totalFull}</p>
          </div>
        </article>

        <div className="flex items-center gap-2.5 rounded-[22px] bg-white px-5 py-3.5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-lime text-ink">
            <Check className="size-4" strokeWidth={2.5} />
          </span>
          <p className="text-[14px] font-medium text-ink">{seatNote}</p>
        </div>

        <section className="flex gap-2.5 rounded-[22px] bg-lime px-5 py-4 text-ink">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-ink text-lime">
            <Clock className="size-4" strokeWidth={1.75} />
          </span>
          <div>
            <p className="text-[14px] font-semibold">
              Datang 15 menit lebih awal
            </p>
            <p className="mt-0.5 text-[13px] leading-snug text-ink/75">
              Tunjukkan tiket ini saat check-in di venue.
            </p>
          </div>
        </section>
      </div>
    </FlowShell>
  );
}

function TicketFact({ icon: Icon, title, detail }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-white/10 text-lime">
        <Icon className="size-4" strokeWidth={1.75} />
      </span>
      <div>
        <p className="text-[14px] font-semibold">{title}</p>
        <p className="text-[13px] text-white/65">{detail}</p>
      </div>
    </div>
  );
}
