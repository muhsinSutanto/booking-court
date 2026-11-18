import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useCoachingSession } from '@/context/CoachingSession'
import { getCoaching, presentCoaching } from '@/lib/coaching'

export function useCoachingDetail() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'home' || location.state?.from === 'schedule'
    ? location.state.from
    : 'learn'
  const { isEnrolled } = useCoachingSession()
  const source = getCoaching(sessionId)
  const enrolled = source ? isEnrolled(source.id) : false
  const session = presentCoaching(source, enrolled)

  function goBack() {
    if (from === 'home') {
      navigate('/')
      return
    }
    if (from === 'schedule') {
      navigate('/schedule')
      return
    }
    navigate('/learn')
  }

  function followClass() {
    if (!session || session.enrolled || session.spotsLeft === 0) return
    navigate(`/learn/${session.id}/pay`, { state: { from } })
  }

  function viewTicket() {
    if (!session?.enrolled) return
    navigate(`/learn/${session.id}/joined`, { state: { from } })
  }

  return { session, goBack, followClass, viewTicket }
}
