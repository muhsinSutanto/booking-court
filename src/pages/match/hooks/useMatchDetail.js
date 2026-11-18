import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { currentPlayer } from '@/data/catalog'
import { useJoinSession } from '@/context/JoinSession'
import { getMatch, presentMatch } from '@/lib/match'

export function useMatchDetail() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'schedule' ? 'schedule' : 'home'
  const { isJoined } = useJoinSession()
  const source = getMatch(matchId)
  const joined = source ? isJoined(source.id) : false
  const match = presentMatch(source, joined)
  const lineup = source ? (joined ? [...source.players, currentPlayer] : source.players) : []

  function goBack() {
    navigate(from === 'schedule' ? '/schedule' : '/')
  }

  function continueJoin() {
    if (!match || match.joined || match.slotsLeft === 0) return
    navigate(`/match/${match.id}/confirm`, { state: { from } })
  }

  function viewTicket() {
    if (!match) return
    navigate(`/match/${match.id}/joined`, { state: { from } })
  }

  return { match, lineup, goBack, continueJoin, viewTicket }
}
