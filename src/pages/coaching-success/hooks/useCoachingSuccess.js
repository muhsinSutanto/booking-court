import { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCoachingSession } from '@/context/CoachingSession'
import { getCoaching, presentCoaching } from '@/lib/coaching'

export function useCoachingSuccess() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isEnrolled } = useCoachingSession()
  const source = getCoaching(sessionId)
  const enrolled = source ? isEnrolled(source.id) : false
  const paid = Boolean(location.state?.paid)
  const from = location.state?.from === 'home' || location.state?.from === 'schedule'
    ? location.state.from
    : 'learn'
  const session = presentCoaching(source, enrolled || paid)
  const method = location.state?.method ?? 'GoPay'

  useEffect(() => {
    if (!session || enrolled || paid) return
    navigate(`/learn/${session.id}`, { replace: true, state: { from } })
  }, [session, enrolled, navigate, paid, from])

  function goHome() {
    navigate('/')
  }

  return { session, method, goHome }
}
