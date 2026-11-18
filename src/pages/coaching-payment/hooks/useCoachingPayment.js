import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCoachingSession } from '@/context/CoachingSession'
import { getCoaching, presentCoaching } from '@/lib/coaching'

const methods = [{ id: 'gopay', name: 'GoPay', detail: 'E-wallet' }]

export function useCoachingPayment() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'home' || location.state?.from === 'schedule'
    ? location.state.from
    : 'learn'
  const { isEnrolled, enroll } = useCoachingSession()
  const source = getCoaching(sessionId)
  const enrolled = source ? isEnrolled(source.id) : false
  const session = presentCoaching(source, enrolled)
  const openedEnrolled = useRef(Boolean(session?.enrolled))
  const [methodId, setMethodId] = useState(methods[0].id)
  const [paying, setPaying] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (!session || !openedEnrolled.current) return
    navigate(`/learn/${session.id}/joined`, { replace: true, state: { from } })
  }, [session, navigate, from])

  function goBack() {
    if (!session) {
      navigate('/learn')
      return
    }
    navigate(`/learn/${session.id}`, { state: { from } })
  }

  function pay() {
    if (!session || paying || session.enrolled || session.spotsLeft === 0) return
    const method = methods.find((item) => item.id === methodId) ?? methods[0]
    setPaying(true)
    timer.current = window.setTimeout(() => {
      enroll(session.id)
      navigate(`/learn/${session.id}/joined`, {
        replace: true,
        state: { method: method.name, paid: true, from },
      })
    }, 700)
  }

  return {
    session,
    methods,
    methodId,
    setMethodId,
    paying,
    goBack,
    pay,
  }
}
