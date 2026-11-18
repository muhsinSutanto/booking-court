import { coaches, coachings, currentPlayer } from '@/data/catalog'
import { formatRupiahFull } from '@/lib/format'

export function getCoaching(id) {
  return coachings.find((session) => session.id === id) ?? null
}

export function presentCoaching(session, enrolled) {
  if (!session) return null

  const coach = coaches.find((item) => item.id === session.coachId) ?? null
  const spotsLeft = Math.max(0, session.spotsLeft - (enrolled ? 1 : 0))
  const taken = session.spotsTotal - spotsLeft
  const roster = session.players ?? []
  const players =
    session.format === 'group' && enrolled ? [...roster, currentPlayer] : roster

  return {
    ...session,
    coach: coach?.name ?? '',
    coachMeta: coach?.title ?? '',
    coachInitials: coach?.initials ?? '',
    coachImage: coach?.image ?? '',
    coachExperience: coach?.experience ?? '',
    coachBio: coach?.bio ?? '',
    enrolled,
    spotsLeft,
    players,
    priceFull: formatRupiahFull(session.price),
    serviceLabel: 'Gratis',
    code:
      {
        'vibora-private': 'KCM-PV-1600',
        'serve-private': 'KCM-SR-1800',
        'vibora-group': 'KCM-GR-1800',
        'fundamentals-group': 'KCM-MF-0730',
      }[session.id] ?? 'KCM-CLASS',
    unit: session.format === 'private' ? '/sesi' : '/orang',
    slotLabel: session.format === 'private' ? '1-on-1' : `${taken}/${session.spotsTotal}`,
    spotDetail:
      session.format === 'private'
        ? 'Satu pemain bersama coach'
        : `${spotsLeft} slot tersisa dari ${session.spotsTotal}`,
  }
}
