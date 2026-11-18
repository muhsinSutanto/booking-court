import { ArrowRight, Calendar, Check, MapPin } from 'lucide-react'
import { FlowDock, FlowShell } from '@/components/match/FlowShell'
import { Button } from '@/components/ui/button'
import { useCoachingDetail } from '@/pages/coaching/hooks/useCoachingDetail'

export function CoachingDetailPage() {
  const { session, goBack, followClass, viewTicket } = useCoachingDetail()

  if (!session) {
    return (
      <FlowShell title="Detail coaching" onBack={goBack} back="circle">
        <p className="px-6 pt-12 text-sm text-muted-foreground">Kelas tidak ditemukan.</p>
      </FlowShell>
    )
  }

  const full = !session.enrolled && session.spotsLeft === 0
  const actionLabel = session.enrolled ? 'Lihat tiket' : full ? 'Penuh' : 'Ikuti kelas'

  return (
    <FlowShell
      title="Detail coaching"
      onBack={goBack}
      back="circle"
      footer={
        <FlowDock align="left" note={session.spotDetail}>
          <div className="flex items-center justify-between gap-4">
            <div className="shrink-0">
              <p className="text-[12px] text-[#8b918b]">
                {session.format === 'private' ? 'Per sesi' : 'Per orang'}
              </p>
              <p className="text-[18px] leading-none font-bold tracking-[-0.04em] text-ink">
                {session.priceFull}
              </p>
            </div>
            <Button
              type="button"
              disabled={full}
              onClick={session.enrolled ? viewTicket : followClass}
              className="h-11 shrink-0 rounded-full px-4 text-[14px] font-semibold"
            >
              {actionLabel}
              {full ? null : <ArrowRight className="size-4" />}
            </Button>
          </div>
        </FlowDock>
      }
    >
      <div className="flex flex-col gap-6 px-6 pt-6 pb-10">
        <article className="overflow-hidden rounded-[24px] bg-[#123026] text-white shadow-[0_14px_32px_rgba(18,48,38,0.16)]">
          <div className="relative">
            <img
              src={session.image}
              alt=""
              style={{ objectPosition: session.imagePosition }}
              className="h-[168px] w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#123026] via-[#123026]/10 to-black/10" />
            <div className="absolute top-3 left-3">
              <span className="inline-flex h-7 items-center rounded-full bg-lime px-3 text-[11px] font-bold tracking-[0.08em] text-ink uppercase">
                {session.formatLabel}
              </span>
            </div>
          </div>
          <div className="px-5 pt-4 pb-5">
            <h2 className="text-[22px] leading-[1.05] font-bold tracking-[-0.045em]">
              {session.title}
            </h2>
            <p className="mt-2 text-[14px] leading-snug text-white/72">{session.summary}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex h-7 items-center rounded-full bg-lime px-3 text-[12px] font-semibold text-ink">
                {session.level}
              </span>
              <span className="inline-flex h-7 items-center rounded-full bg-white/12 px-3 text-[12px] font-medium text-white">
                {session.slotLabel}
              </span>
            </div>
          </div>
        </article>

        <section className="rounded-[22px] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <p className="text-[11px] font-bold tracking-[0.14em] text-[#8b918b] uppercase">
            Coach
          </p>
          <div className="mt-4 flex items-center gap-3.5">
            <img
              src={session.coachImage}
              alt=""
              className="size-12 shrink-0 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-[15px] font-semibold text-ink">{session.coach}</p>
              <p className="mt-0.5 text-[13px] text-[#8a918b]">
                {session.coachMeta} • {session.coachExperience}
              </p>
            </div>
          </div>
          <p className="mt-4 text-[13px] leading-relaxed text-[#5c6560]">{session.coachBio}</p>
        </section>

        <section className="rounded-[22px] bg-white px-5 py-2 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <Fact icon={Calendar} title={session.whenRange} detail={session.duration} />
          <div className="ml-[50px] h-px bg-[#eceae4]" />
          <Fact icon={MapPin} title={session.place} detail={session.venue} />
        </section>

        {session.format === 'group' ? (
          <section className="rounded-[22px] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[14px] font-semibold text-ink">Peserta</h3>
              <p className="text-[13px] text-[#8a918b]">
                {session.players.length} dari {session.spotsTotal}
              </p>
            </div>
            <ul className="mt-4 flex flex-col gap-3.5">
              {session.players.map((player) => (
                <li key={player.id} className="flex items-center gap-3">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#f3f2ec] text-[12px] font-semibold text-ink">
                    {player.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[14px] font-semibold text-ink">{player.name}</span>
                    <span className="block text-[12px] text-[#8a918b]">{player.level}</span>
                  </span>
                </li>
              ))}
            </ul>
            {session.spotsLeft > 0 ? (
              <p className="mt-4 text-[12px] text-[#8a918b]">
                {session.spotsLeft} slot masih terbuka
              </p>
            ) : null}
          </section>
        ) : null}

        <section className="rounded-[22px] bg-white px-5 py-5 shadow-[0_10px_30px_rgba(23,48,38,0.06)]">
          <h3 className="text-[14px] font-semibold text-ink">Fokus latihan</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {session.focus.map((item) => (
              <span
                key={item}
                className="inline-flex h-8 items-center rounded-full bg-[#f3f2ec] px-3 text-[12px] font-medium text-ink"
              >
                {item}
              </span>
            ))}
          </div>
        </section>

        <section className="rounded-[22px] bg-lime px-5 py-5 text-ink">
          <h3 className="text-[14px] font-semibold">Sebelum kelas</h3>
          <ul className="mt-3 flex flex-col gap-3">
            {session.notes.map((note) => (
              <li key={note} className="flex items-start gap-2.5 text-[13px] leading-snug">
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
  )
}

function Fact({ icon: Icon, title, detail }) {
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
  )
}
