import { useEffect, useRef } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useBookingSession } from '@/context/BookingSession'
import { bookingFromId } from '@/lib/court'

export function useBookConfirm() {
  const { courtId, slotId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'schedule' ? 'schedule' : 'home'
  const { isBooked } = useBookingSession()
  const booked = slotId ? isBooked(slotId) : false
  const booking = bookingFromId(slotId, booked)
  const openedBooked = useRef(booked && booking?.id === courtId)

  useEffect(() => {
    if (!booking || booking.id !== courtId || !openedBooked.current) return
    navigate(`/court/${booking.id}/book/${booking.slotId}/booked`, { replace: true })
  }, [booking, courtId, navigate])

  function goBack() {
    if (!booking) {
      navigate('/')
      return
    }
    navigate(`/court/${booking.id}`, { state: { slotId: booking.slotId, from } })
  }

  function continueToPayment(share) {
    if (!booking || !booking.available || booking.booked) return
    const mode = share === 'player' ? 'player' : 'all'
    navigate(`/court/${booking.id}/book/${booking.slotId}/pay?share=${mode}`, {
      state: { from },
    })
  }

  return { booking: booking?.id === courtId ? booking : null, goBack, continueToPayment }
}
