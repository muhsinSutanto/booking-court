import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { currentPlayer } from '@/data/catalog'
import { useJoinSession } from '@/context/JoinSession'
import { getMatch, presentMatch } from '@/lib/match'

export function useJoinConfirm() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'schedule' ? 'schedule' : 'home'
  const { isJoined } = useJoinSession()
  const source = getMatch(matchId)
  const joined = source ? isJoined(source.id) : false
  const match = presentMatch(source, joined)
  const openedJoined = useRef(joined)

  useEffect(() => {
    if (!source || !openedJoined.current) return
    navigate(`/match/${source.id}/joined`, { replace: true })
  }, [source, navigate])

  function goBack() {
    if (!match) {
      navigate('/')
      return
    }
    navigate(`/match/${match.id}`, { state: { from } })
  }

  function continueToPayment() {
    if (!match || match.slotsLeft === 0) return
    navigate(`/match/${match.id}/pay`, { state: { from } })
  }

  const levelLabel = match ? match.level.replace(/^Level\s/i, 'level ') : ''

  return {
    match,
    player: currentPlayer,
    goBack,
    continueToPayment,
    levelNote: `Match ini untuk ${levelLabel}. Pastikan kamu nyaman bermain di level tersebut.`,
  }
}
