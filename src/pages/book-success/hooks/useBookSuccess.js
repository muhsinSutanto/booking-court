import { useEffect } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useBookingSession } from '@/context/BookingSession'
import { bookingFromId, presentShare } from '@/lib/court'

export function useBookSuccess() {
  const { courtId, slotId } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { isBooked } = useBookingSession()
  const booked = slotId ? isBooked(slotId) : false
  const paid = Boolean(location.state?.paid)
  const booking = bookingFromId(slotId, true)
  const matchesCourt = booking?.id === courtId
  const method = location.state?.method ?? 'GoPay'
  const share = location.state?.share ?? params.get('share')

  useEffect(() => {
    if (!matchesCourt || booked || paid) return
    navigate(`/court/${booking.id}`, { replace: true })
  }, [booking, booked, matchesCourt, navigate, paid])

  function goHome() {
    navigate('/')
  }

  return {
    booking: matchesCourt ? booking : null,
    payment: matchesCourt ? presentShare(booking, share) : null,
    method,
    goHome,
  }
}
