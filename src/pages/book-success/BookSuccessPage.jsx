import { ArrowRight, Calendar, Check, Clock, MapPin } from "lucide-react";
import { StepMeter } from "@/components/booking/StepMeter";
import { FlowDock, FlowShell } from "@/components/match/FlowShell";
import { Button } from "@/components/ui/button";
import { durationLabel } from "@/lib/court";
import { useBookSuccess } from "@/pages/book-success/hooks/useBookSuccess";

export function BookSuccessPage() {
  const { booking, payment, method, goHome } = useBookSuccess();

  if (!booking) {
    return (
      <FlowShell title="Booking" onBack={goHome} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">
          Booking tidak ditemukan.
        </p>
      </FlowShell>
    );
  }

  return (
    <FlowShell
      title="Booking"
      onBack={goHome}
      back="circle"
      footer={
        <FlowDock note="Tiket booking tersimpan di sesi ini.">
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
          <StepMeter step={3} />
          <div className="mx-auto mt-4 flex size-14 items-center justify-center rounded-full bg-lime text-ink shadow-[0_8px_18px_rgba(214,242,92,0.4)]">
            <Check className="size-6" strokeWidth={2.25} />
          </div>
          <h2 className="mt-3 text-[22px] leading-[1.05] font-bold tracking-[-0.045em] text-ink">
            Lapangan terpesan!
          </h2>
          <p className="mt-1 text-[14px] leading-snug text-[#6e766f]">
            Jammu sudah aman. Sampai ketemu di lapangan.
          </p>
        </header>

        <article className="overflow-hidden rounded-[24px] bg-[#123026] text-white shadow-[0_14px_32px_rgba(18,48,38,0.16)]">
          <div className="relative">
            <img
              src={booking.image}
              alt=""
              style={{ objectPosition: booking.imagePosition }}
              className="h-[112px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#123026] via-[#123026]/20 to-black/10" />
            <span className="absolute top-3 left-3 inline-flex h-7 items-center rounded-full bg-lime px-3 text-[11px] font-bold tracking-[0.08em] text-ink">
              LUNAS
            </span>
            <span className="absolute top-3 right-3 inline-flex h-7 items-center rounded-full bg-black/45 px-3 text-[12px] font-semibold tracking-[0.04em] text-white">
              {booking.code}
            </span>
          </div>
          <div className="px-5 pt-4 pb-4">
            <h3 className="text-[18px] leading-[1.05] font-bold tracking-[-0.04em]">
              {booking.name}
            </h3>
            <p className="mt-0.5 text-[12px] font-medium tracking-[0.06em] text-white/65 uppercase">
              {booking.type} • {durationLabel(booking.minutes)}
            </p>
            <div className="mt-3 flex flex-col gap-2.5">
              <TicketFact
                icon={Calendar}
                title={booking.whenRange}
                detail={booking.date}
              />
              <TicketFact
                icon={MapPin}
                title={booking.venue}
                detail={booking.name}
              />
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-white/10 px-5 py-4">
            <p className="text-[14px] text-white/80">
              {payment.label} • {method}
            </p>
            <p className="text-[14px] font-bold">{payment.amountFull}</p>
          </div>
        </article>

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
