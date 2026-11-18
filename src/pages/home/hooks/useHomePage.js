import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useJoinSession } from '@/context/JoinSession'
import { courts, matches } from '@/data/catalog'
import { formatRupiah } from '@/lib/format'
import { presentMatch } from '@/lib/match'

const NOTICE_KEY = 'sample-padel-copyright-notice'

export function useHomePage() {
  const navigate = useNavigate()
  const { isJoined } = useJoinSession()
  const [noticeOpen, setNoticeOpen] = useState(() => {
    try {
      return localStorage.getItem(NOTICE_KEY) !== 'seen'
    } catch {
      return true
    }
  })

  const visibleCourts = useMemo(
    () =>
      courts.map((court) => ({
        ...court,
        priceLabel: formatRupiah(court.price),
      })),
    [],
  )

  const visibleMatches = useMemo(
    () => matches.map((match) => presentMatch(match, isJoined(match.id))),
    [isJoined],
  )

  function openMatch(id) {
    navigate(`/match/${id}`, { state: { from: 'home' } })
  }

  function openCourt(id) {
    navigate(`/court/${id}`, { state: { from: 'home' } })
  }

  function dismissNotice() {
    try {
      localStorage.setItem(NOTICE_KEY, 'seen')
    } catch {
      // Tetap tutup jika penyimpanan browser tidak tersedia.
    }
    setNoticeOpen(false)
  }

  return {
    courts: visibleCourts,
    matches: visibleMatches,
    openMatch,
    openCourt,
    noticeOpen,
    dismissNotice,
  }
}
