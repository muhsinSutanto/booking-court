import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCoachingSession } from '@/context/CoachingSession'
import { useJoinSession } from '@/context/JoinSession'
import { courts, currentPlayer, matches } from '@/data/catalog'
import { getCoaching, presentCoaching } from '@/lib/coaching'
import { presentMatch } from '@/lib/match'

const filters = [
  { id: 'all', label: 'Semua Match' },
  { id: 'today', label: 'Hari Ini' },
  { id: 'medium', label: 'Level Menengah' },
]

const todayId = '2026-11-18'

const dates = [
  { id: '2026-11-18', weekday: 'Rab', dayNumber: '18', caption: 'Hari ini', when: 'Hari ini' },
  { id: '2026-11-19', weekday: 'Kam', dayNumber: '19', caption: 'Besok', when: 'Besok' },
  { id: '2026-11-20', weekday: 'Jum', dayNumber: '20', caption: '20 Nov' },
  { id: '2026-11-21', weekday: 'Sab', dayNumber: '21', caption: '21 Nov' },
  { id: '2026-11-22', weekday: 'Min', dayNumber: '22', caption: '22 Nov' },
]

const levels = [
  { id: 'all', label: 'Semua' },
  { id: 'beginner', label: 'Pemula' },
  { id: 'medium', label: 'Menengah' },
]

const courtLabels = {
  sunset: 'Court Panoramik',
  morning: 'Court 2 Standard',
}

function displayWhen(whenRange) {
  return whenRange.replace('Hari ini', 'Hari Ini').replace('–', ' – ')
}

function matchesDate(match, date) {
  if (date === 'all') return true
  return match.dateId === date
}

function matchesLevel(match, level) {
  if (level === 'beginner') return match.level.includes('2.')
  if (level === 'medium') return match.level.includes('3.')
  return true
}

export function useSchedulePage() {
  const navigate = useNavigate()
  const { isJoined } = useJoinSession()
  const { isEnrolled } = useCoachingSession()
  const coaching = useMemo(() => {
    const source = getCoaching('vibora-group')
    return presentCoaching(source, source ? isEnrolled(source.id) : false)
  }, [isEnrolled])
  const [date, setDate] = useState('all')
  const [level, setLevel] = useState('all')
  const [draftDate, setDraftDate] = useState('all')
  const [draftLevel, setDraftLevel] = useState('all')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [courtsOpen, setCourtsOpen] = useState(false)

  const sessions = useMemo(
    () =>
      matches
        .map((match) => {
          const presented = presentMatch(match, isJoined(match.id))
          return {
            ...presented,
            dateId: dates.find((day) => day.when && match.when.startsWith(day.when))?.id ?? null,
            courtLabel: courtLabels[match.id] ?? match.place,
            whenLabel: displayWhen(presented.whenRange),
            roster: presented.joined
              ? [...presented.players, currentPlayer]
              : presented.players,
            slotCount: `${presented.slotsTotal - presented.slotsLeft}/${presented.slotsTotal}`,
            canJoin: !presented.joined && presented.slotsLeft > 0,
          }
        })
        .filter((match) => matchesDate(match, date) && matchesLevel(match, level)),
    [date, level, isJoined],
  )

  function openFilters() {
    setDraftDate(date)
    setDraftLevel(level)
    setFiltersOpen(true)
  }

  function applyFilters() {
    setDate(draftDate)
    setLevel(draftLevel)
    setFiltersOpen(false)
  }

  function resetFilters() {
    setDraftDate('all')
    setDraftLevel('all')
  }

  function selectChip(id) {
    if (id === 'all') {
      setDate('all')
      setLevel('all')
      return
    }
    if (id === 'today') {
      setDate((current) => (current === todayId ? 'all' : todayId))
      return
    }
    if (id === 'medium') {
      setLevel((current) => (current === 'medium' ? 'all' : 'medium'))
    }
  }

  function openMatch(id) {
    navigate(`/match/${id}`, { state: { from: 'schedule' } })
  }

  function openLearn() {
    navigate('/learn')
  }

  function openCoaching(id) {
    navigate(`/learn/${id}`, { state: { from: 'schedule' } })
  }

  function chooseCourt(id) {
    setCourtsOpen(false)
    navigate(`/court/${id}`, { state: { from: 'schedule' } })
  }

  return {
    filters,
    dates,
    todayId,
    monthLabel: 'November 2026',
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
    filtered: date !== 'all' || level !== 'all',
    sessions,
    coaching,
    openMatch,
    openLearn,
    openCoaching,
    courts,
    courtsOpen,
    setCourtsOpen,
    chooseCourt,
  }
}
