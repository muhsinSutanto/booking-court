import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useJoinSession } from '@/context/JoinSession'
import { getMatch, presentMatch } from '@/lib/match'

export function useJoinSuccess() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isJoined } = useJoinSession()
  const source = getMatch(matchId)
  const joined = source ? isJoined(source.id) : false
  const paid = Boolean(location.state?.paid)
  const from = location.state?.from === 'schedule' ? 'schedule' : 'home'
  const match = presentMatch(source, true)
  const method = location.state?.method ?? 'GoPay'

  useEffect(() => {
    if (!source || joined || paid) return
    navigate(`/match/${source.id}`, { replace: true, state: { from } })
  }, [source, joined, paid, navigate, from])

  const seatNote = match
    ? match.seatsLeftAfterJoin === 0
      ? `Kamu pemain ke-${match.seat} • Match lengkap`
      : `Kamu pemain ke-${match.seat} • ${match.seatsLeftAfterJoin} slot tersisa`
    : ''

  function goHome() {
    navigate('/')
  }

  return { match, method, seatNote, goHome }
}
