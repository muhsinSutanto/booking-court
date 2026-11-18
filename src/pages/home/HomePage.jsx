import { CoachingBanner } from '@/components/home/CoachingBanner'
import { CopyrightNotice } from '@/components/home/CopyrightNotice'
import { CourtCard } from '@/components/home/CourtCard'
import { MatchCard } from '@/components/home/MatchCard'
import { SectionHeading } from '@/components/home/SectionHeading'
import { useHomePage } from '@/pages/home/hooks/useHomePage'

export function HomePage() {
  const { courts, matches, openMatch, openCourt, noticeOpen, dismissNotice } = useHomePage()

  return (
    <div className="pb-10">
      <CopyrightNotice open={noticeOpen} onConfirm={dismissNotice} />
      <section className="px-6 pt-7">
        <h1 className="text-[34px] leading-[0.92] font-bold tracking-[-0.045em] text-ink">
          Find your
          <br />
          court
        </h1>
      </section>

      <section className="mt-10 px-6">
        <SectionHeading>Popular</SectionHeading>
      </section>

      <div className="mt-5 flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-pl-6 px-6 pb-1 no-scrollbar">
        {courts.map((court, index) => (
          <CourtCard key={court.id} court={court} featured={index === 0} onOpen={openCourt} />
        ))}
      </div>

      <div className="mt-8 px-6">
        <CoachingBanner />
      </div>

      <section className="mt-8 px-6">
        <SectionHeading>List</SectionHeading>
        <div className="mt-5 flex flex-col gap-4">
          {matches.map((match) => (
            <MatchCard key={match.id} match={match} onOpen={openMatch} />
          ))}
        </div>
      </section>
    </div>
  )
}
