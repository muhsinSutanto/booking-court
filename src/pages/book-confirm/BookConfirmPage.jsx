import { useState } from "react";
import { Calendar, Info, MapPin } from "lucide-react";
import { CourtPreview } from "@/components/booking/CourtPreview";
import { PayChoiceSheet } from "@/components/booking/PayChoiceSheet";
import { StepMeter } from "@/components/booking/StepMeter";
import { InfoNote } from "@/components/match/InfoNote";
import { FlowDock, FlowShell } from "@/components/match/FlowShell";
import { Button } from "@/components/ui/button";
import { durationLabel } from "@/lib/court";
import { useBookConfirm } from "@/pages/book-confirm/hooks/useBookConfirm";

export function BookConfirmPage() {
  const { booking, goBack, continueToPayment } = useBookConfirm();
  const [choicesOpen, setChoicesOpen] = useState(false);

  if (!booking) {
    return (
      <FlowShell title="Konfirmasi booking" onBack={goBack} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">
          Jadwal tidak ditemukan.
        </p>
      </FlowShell>
    );
  }

  return (
    <FlowShell
      title="Konfirmasi booking"
      onBack={goBack}
      back="circle"
      footer={
        <FlowDock note="Dengan melanjutkan, kamu menyetujui aturan sewa lapangan.">
          <Button
            type="button"
            onClick={() => setChoicesOpen(true)}
            disabled={!booking.available}
            className="h-12 w-full rounded-full text-[14px] font-semibold"
          >
            Pesan lapangan
          </Button>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <header>
          <p className="text-[11px] font-bold tracking-[0.16em] text-[#8b918b] uppercase">
            Langkah 1 dari 3
          </p>
          <StepMeter step={1} />
          <h2 className="mt-5 text-[22px] leading-[1.05] font-bold tracking-[-0.045em] text-ink">
            Jadwal ini untukmu?
          </h2>
          <p className="mt-2 text-[14px] leading-snug text-[#6e766f]">
            Cek lapangan dan jam sebelum membayar.
          </p>
        </header>

        <CourtPreview court={booking} />

        <section className="rounded-[22px] bg-white px-5 py-2 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <Row
            icon={Calendar}
            title={booking.whenRange}
            detail={booking.durationShort}
          />
          <div className="ml-[46px] h-px bg-[#eceae4]" />
          <Row icon={MapPin} title={booking.venue} detail={booking.type} />
        </section>

        <section className="overflow-hidden rounded-[22px] bg-white shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <div className="px-5 pt-5 pb-5">
            <h3 className="text-[14px] font-semibold text-ink">
              Rincian biaya
            </h3>
            <div className="mt-4 flex flex-col gap-3 text-[14px] text-[#3e4841]">
              <div className="flex justify-between gap-3">
                <span>Sewa {durationLabel(booking.minutes)}</span>
                <span>{booking.priceFull}</span>
              </div>
              <div className="flex justify-between gap-3">
                <span>Biaya layanan</span>
                <span>{booking.serviceLabel}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between bg-[#f6f7ee] px-5 py-4 text-[14px] font-bold text-ink">
            <span>Total pembayaran</span>
            <span>{booking.priceFull}</span>
          </div>
        </section>

        <InfoNote icon={Info} title="Jam dikunci setelah bayar">
          Slot yang belum dibayar bisa diambil pemain lain. Datang 15 menit
          lebih awal.
        </InfoNote>
      </div>
      <PayChoiceSheet
        open={choicesOpen}
        onOpenChange={setChoicesOpen}
        booking={booking}
        onChoose={(share) => {
          setChoicesOpen(false);
          continueToPayment(share);
        }}
      />
    </FlowShell>
  );
}

function Row({ icon: Icon, title, detail }) {
  return (
    <div className="flex items-center gap-3.5 py-4">
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
