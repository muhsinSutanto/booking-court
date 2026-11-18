import { SlidersHorizontal } from 'lucide-react'
import { CoachingCard } from '@/components/learn/CoachingCard'
import { LearnFilterSheet } from '@/components/learn/LearnFilterSheet'
import { cn } from '@/lib/utils'
import { useLearnPage } from '@/pages/learn/hooks/useLearnPage'

export function LearnPage() {
  const {
    formats,
    coachOptions,
    format,
    coach,
    draftFormat,
    draftCoach,
    setDraftFormat,
    setDraftCoach,
    filtersOpen,
    setFiltersOpen,
    openFilters,
    applyFilters,
    resetFilters,
    selectChip,
    filtered,
    sessions,
    openSession,
  } = useLearnPage()

  return (
    <section className="px-6 pt-7 pb-10">
      <div className="flex items-end justify-between gap-3">
        <h1 className="text-[22px] leading-none font-bold tracking-[-0.04em] text-ink">Learn</h1>
        <button
          type="button"
          onClick={openFilters}
          className="mb-0.5 inline-flex items-center gap-1.5 text-[14px] font-medium text-[#8b908a]"
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
      <p className="mt-2 max-w-[280px] text-[13px] leading-relaxed text-[#6e766f]">
        Private untuk 1-on-1, group untuk latihan bareng.
      </p>

      <div className="mt-6 flex gap-2">
        {formats.map((item) => {
          const active =
            item.id === 'all' ? format === 'all' && coach === 'all' : format === item.id
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => selectChip(item.id)}
              className={cn(
                'h-9 shrink-0 rounded-full px-4 text-[13px] font-semibold',
                active ? 'bg-ink text-white' : 'bg-[#eceae4] text-ink',
              )}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        {sessions.length > 0 ? (
          sessions.map((session) => (
            <CoachingCard key={session.id} session={session} onOpen={openSession} />
          ))
        ) : (
          <p className="rounded-[24px] bg-white px-4 py-6 text-center text-[13px] text-[#7d847e]">
            Belum ada kelas untuk filter ini.
          </p>
        )}
      </div>

      <LearnFilterSheet
        open={filtersOpen}
        onOpenChange={setFiltersOpen}
        formats={formats}
        coaches={coachOptions}
        format={draftFormat}
        coach={draftCoach}
        onFormatChange={setDraftFormat}
        onCoachChange={setDraftCoach}
        onReset={resetFilters}
        onApply={applyFilters}
      />
    </section>
  )
}
