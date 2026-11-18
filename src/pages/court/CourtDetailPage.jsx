import { ArrowRight, Check, SlidersHorizontal } from "lucide-react";
import { BookingFilterSheet } from "@/components/booking/BookingFilterSheet";
import { SlotGrid } from "@/components/booking/SlotGrid";
import { FlowDock, FlowShell } from "@/components/match/FlowShell";
import { Button } from "@/components/ui/button";
import { useCourtDetail } from "@/pages/court/hooks/useCourtDetail";

export function CourtDetailPage() {
  const {
    court,
    days,
    durations,
    dayId,
    durationText,
    visibleSlots,
    selectedId,
    selectSlot,
    booking,
    openCount,
    filtersOpen,
    setFiltersOpen,
    draftDay,
    draftMinutes,
    setDraftDay,
    setDraftMinutes,
    openFilters,
    applyFilters,
    resetFilters,
    filtered,
    goBack,
    continueBooking,
  } = useCourtDetail();

  if (!court) {
    return (
      <FlowShell title="Booking lapangan" onBack={goBack} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">
          Lapangan tidak ditemukan.
        </p>
      </FlowShell>
    );
  }

  const actionLabel = booking?.booked
    ? "Lihat tiket"
    : booking
      ? "Pesan lapangan"
      : "Pilih jam";

  return (
    <FlowShell
      title="Booking lapangan"
      onBack={goBack}
      back="circle"
      footer={
        <FlowDock
          align="left"
          note={`Sewa ${durationText} • biaya lapangan sudah termasuk.`}
        >
          <div className="flex items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="truncate text-[12px] text-[#8b918b]">
                {booking ? booking.whenRange : "Sewa lapangan"}
              </p>
              <p className="text-[18px] leading-none font-bold tracking-[-0.04em] text-ink">
                {court.priceFull}
              </p>
            </div>
            <Button
              type="button"
              disabled={!booking}
              onClick={continueBooking}
              className="h-11 shrink-0 rounded-full px-4 text-[14px] font-semibold"
            >
              {actionLabel}
              {booking ? <ArrowRight className="size-4" /> : null}
            </Button>
          </div>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-5 px-6 pt-4 pb-8">
        <article className="overflow-hidden rounded-[24px] bg-[#123026] text-white shadow-[0_14px_32px_rgba(18,48,38,0.16)]">
          <div className="relative">
            <img
              src={court.image}
              alt=""
              style={{ objectPosition: court.imagePosition }}
              className="h-[168px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#123026] via-[#123026]/10 to-black/10" />
            <span className="absolute top-3 left-3 inline-flex h-7 items-center rounded-full bg-lime px-3 text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
              Booking
            </span>
            <span className="absolute top-3 right-3 inline-flex h-7 items-center rounded-full bg-white/92 px-3 text-[12px] font-semibold text-ink">
              {openCount === 0 ? "Penuh" : `${openCount} slot`}
            </span>
          </div>
          <div className="px-5 pt-4 pb-4">
            <h2 className="text-[22px] leading-[1.02] font-bold tracking-[-0.045em]">
              {court.name}
            </h2>
            <p className="mt-1.5 text-[14px] leading-snug text-white/72">
              {court.summary}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex h-7 items-center rounded-full bg-lime px-3 text-[12px] font-semibold text-ink">
                {durationText}
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-white/12 px-3 text-[12px] font-medium text-white">
                {court.type}
              </span>
            </div>
          </div>
        </article>

        <section className="rounded-[22px] bg-white px-5 py-4 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-[14px] font-semibold text-ink">Pilih jam</h3>
              <p className="mt-1 text-[13px] text-[#8b918b]">
                {days.find((day) => day.id === dayId)?.date}
              </p>
            </div>
            <button
              type="button"
              onClick={openFilters}
              aria-label="Filter"
              className="inline-flex items-center gap-1.5 text-[14px] font-medium text-[#8b908a]"
            >
              Filter
              <span className="relative">
                <SlidersHorizontal className="size-4" strokeWidth={1.75} />
                {filtered && (
                  <span className="absolute -top-1 -right-1 size-1.5 rounded-full bg-olive" />
                )}
              </span>
            </button>
          </div>
          <SlotGrid
            slots={visibleSlots}
            selectedId={selectedId}
            onSelect={selectSlot}
          />
        </section>

        <section className="rounded-[22px] bg-lime px-5 py-4 text-ink">
          <h3 className="text-[14px] font-semibold">Sebelum main</h3>
          <ul className="mt-2 flex flex-col gap-2">
            {court.notes.map((note) => (
              <li
                key={note}
                className="flex items-start gap-2 text-[14px] leading-snug"
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
      <BookingFilterSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        days={days}
        durations={durations}
        dayId={draftDay}
        minutes={draftMinutes}
        onDayChange={setDraftDay}
        onMinutesChange={setDraftMinutes}
        onReset={resetFilters}
        onApply={applyFilters}
      />
    </FlowShell>
  );
}
