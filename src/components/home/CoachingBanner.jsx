import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

function PadelRacket({ className }) {
  return (
    <svg viewBox="0 0 110 110" className={className} fill="none" aria-hidden="true">
      <ellipse cx="42" cy="44" rx="26" ry="32" stroke="currentColor" strokeWidth="3" />
      <circle cx="33" cy="34" r="2.4" fill="currentColor" />
      <circle cx="48" cy="32" r="2.4" fill="currentColor" />
      <circle cx="40" cy="46" r="2.4" fill="currentColor" />
      <circle cx="31" cy="52" r="2" fill="currentColor" />
      <circle cx="51" cy="50" r="2" fill="currentColor" />
      <circle cx="42" cy="60" r="2" fill="currentColor" />
      <path
        d="M56 70c8 10 14 18 26 30"
        stroke="currentColor"
        strokeWidth="3.4"
        strokeLinecap="round"
      />
      <circle cx="86" cy="62" r="10" stroke="currentColor" strokeWidth="3" />
    </svg>
  )
}

export function CoachingBanner() {
  const navigate = useNavigate()

  return (
    <section className="relative overflow-hidden rounded-[28px] bg-lime px-6 py-6 text-ink">
      <div className="relative z-10 max-w-[230px]">
        <p className="text-[11px] font-bold tracking-[0.16em] uppercase">Padel coaching</p>
        <h2 className="mt-2.5 text-[22px] leading-[1.02] font-bold tracking-[-0.045em]">
          Naik level
          <br />
          bareng coach.
        </h2>
        <p className="mt-2 text-[13.5px] leading-snug text-ink/75">
          Sesi privat & grup, untuk semua level.
        </p>
        <Button
          type="button"
          onClick={() => navigate('/learn', { state: { from: 'home' } })}
          className="mt-4 h-10 rounded-full px-4 text-[14px] font-semibold"
        >
          Lihat kelas
          <ArrowRight className="size-4" />
        </Button>
      </div>
      <PadelRacket className="pointer-events-none absolute top-4 right-1 size-[118px] text-ink" />
    </section>
  )
}
