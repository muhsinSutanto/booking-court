import { useMemo, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCoachingSession } from '@/context/CoachingSession'
import { coaches, coachings } from '@/data/catalog'
import { presentCoaching } from '@/lib/coaching'

const formats = [
  { id: 'all', label: 'Semua' },
  { id: 'private', label: 'Private' },
  { id: 'group', label: 'Group' },
]

const coachOptions = [
  { id: 'all', label: 'Semua' },
  ...coaches.map((coach) => ({ id: coach.id, label: coach.name })),
]

export function useLearnPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'home' ? 'home' : 'learn'
  const { isEnrolled } = useCoachingSession()
  const [format, setFormat] = useState('all')
  const [coach, setCoach] = useState('all')
  const [draftFormat, setDraftFormat] = useState('all')
  const [draftCoach, setDraftCoach] = useState('all')
  const [filtersOpen, setFiltersOpen] = useState(false)

  const sessions = useMemo(
    () =>
      coachings
        .filter((session) => format === 'all' || session.format === format)
        .filter((session) => coach === 'all' || session.coachId === coach)
        .map((session) => presentCoaching(session, isEnrolled(session.id))),
    [format, coach, isEnrolled],
  )

  function openFilters() {
    setDraftFormat(format)
    setDraftCoach(coach)
    setFiltersOpen(true)
  }

  function applyFilters() {
    setFormat(draftFormat)
    setCoach(draftCoach)
    setFiltersOpen(false)
  }

  function resetFilters() {
    setDraftFormat('all')
    setDraftCoach('all')
  }

  function selectChip(id) {
    if (id === 'all') {
      setFormat('all')
      setCoach('all')
      return
    }
    setFormat((current) => (current === id ? 'all' : id))
  }

  function openSession(id) {
    navigate(`/learn/${id}`, { state: { from } })
  }

  return {
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
    filtered: format !== 'all' || coach !== 'all',
    sessions,
    openSession,
  }
}
