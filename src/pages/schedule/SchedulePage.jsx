import { Plus, SlidersHorizontal } from "lucide-react";
import { CoachingCard } from "@/components/learn/CoachingCard";
import { CourtChoiceSheet } from "@/components/schedule/CourtChoiceSheet";
import { MatchFilterSheet } from "@/components/schedule/MatchFilterSheet";
import { OpenMatchCard } from "@/components/schedule/OpenMatchCard";
import { cn } from "@/lib/utils";
import { useSchedulePage } from "@/pages/schedule/hooks/useSchedulePage";

export function SchedulePage() {
  const {
    filters,
    dates,
    todayId,
    monthLabel,
    levels,
    date,
    level,
    draftDate,
    draftLevel,
    setDraftDate,
    setDraftLevel,
    filtersOpen,
    setFiltersOpen,
    openFilters,
    applyFilters,
    resetFilters,
    selectChip,
    filtered,
    sessions,
    coaching,
    openMatch,
    openLearn,
    openCoaching,
    courts,
    courtsOpen,
    setCourtsOpen,
    chooseCourt,
  } = useSchedulePage();

  return (
    <div className="relative min-h-full">
      <div className="px-6 pt-7 pb-10">
        <div className="flex items-end justify-between gap-3">
          <h1 className="text-[22px] leading-none font-bold tracking-[-0.04em] text-ink">
            Open Match
          </h1>
          <button
            type="button"
            onClick={openFilters}
            className="mb-1 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#8b908a]"
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

        <div className="mt-6 flex gap-2 overflow-x-auto no-scrollbar">
          {filters.map((item) => {
            const active =
              item.id === "all"
                ? date === "all" && level === "all"
                : item.id === "today"
                  ? date === todayId
                  : level === "medium";
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => selectChip(item.id)}
                className={cn(
                  "h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold",
                  active ? "bg-ink text-white" : "bg-[#eceae4] text-ink",
                )}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        <div className="mt-6 flex flex-col gap-4">
          {sessions.length > 0 ? (
            sessions.map((match) => (
              <OpenMatchCard key={match.id} match={match} onOpen={openMatch} />
            ))
          ) : (
            <p className="rounded-[24px] bg-white px-4 py-6 text-center text-[13px] text-[#7d847e]">
              Belum ada match untuk filter ini.
            </p>
          )}
        </div>

        <section className="mt-8">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-[16px] font-bold tracking-[-0.03em] text-ink">
              Coaching & Event
            </h2>
            <button
              type="button"
              onClick={openLearn}
              className="text-[13px] font-medium text-[#8b908a]"
            >
              Lihat Semua
            </button>
          </div>
          {coaching ? (
            <div className="mt-4">
              <CoachingCard session={coaching} onOpen={openCoaching} />
            </div>
          ) : null}
        </section>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => setCourtsOpen(true)}
            className="inline-flex h-11 items-center gap-1.5 rounded-full bg-ink px-4 text-[14px] font-semibold text-white shadow-[0_8px_20px_rgba(23,48,38,0.18)]"
          >
            <Plus className="size-4" strokeWidth={2} />
            Buat Match
          </button>
        </div>
      </div>

      <CourtChoiceSheet
        open={courtsOpen}
        onOpenChange={setCourtsOpen}
        courts={courts}
        onChoose={chooseCourt}
      />
      <MatchFilterSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        dates={dates}
        monthLabel={monthLabel}
        levels={levels}
        date={draftDate}
        level={draftLevel}
        onDateChange={setDraftDate}
        onLevelChange={setDraftLevel}
        onReset={resetFilters}
        onApply={applyFilters}
      />
    </div>
  );
}
