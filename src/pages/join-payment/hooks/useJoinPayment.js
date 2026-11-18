import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useJoinSession } from '@/context/JoinSession'
import { getMatch, presentMatch } from '@/lib/match'

const methods = [{ id: 'gopay', name: 'GoPay', detail: 'E-wallet' }]

export function useJoinPayment() {
  const { matchId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'schedule' ? 'schedule' : 'home'
  const { isJoined, completeJoin } = useJoinSession()
  const source = getMatch(matchId)
  const joined = source ? isJoined(source.id) : false
  const match = presentMatch(source, joined)
  const openedJoined = useRef(joined)
  const [methodId, setMethodId] = useState(methods[0].id)
  const [paying, setPaying] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (!source || !openedJoined.current) return
    navigate(`/match/${source.id}/joined`, { replace: true, state: { from } })
  }, [source, navigate, from])

  function goBack() {
    if (!match) {
      navigate('/')
      return
    }
    navigate(`/match/${match.id}/confirm`, { state: { from } })
  }

  function pay() {
    if (!match || paying || match.slotsLeft === 0) return
    const method = methods.find((item) => item.id === methodId) ?? methods[0]
    setPaying(true)
    timer.current = window.setTimeout(() => {
      completeJoin(match.id)
      navigate(`/match/${match.id}/joined`, {
        replace: true,
        state: { method: method.name, paid: true, from },
      })
    }, 700)
  }

  return { match, methods, methodId, setMethodId, paying, goBack, pay }
}
