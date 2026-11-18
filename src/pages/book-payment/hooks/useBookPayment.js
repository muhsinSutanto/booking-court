import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useBookingSession } from '@/context/BookingSession'
import { bookingFromId, presentShare } from '@/lib/court'

const methods = [{ id: 'gopay', name: 'GoPay', detail: 'E-wallet' }]

export function useBookPayment() {
  const { courtId, slotId } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from === 'schedule' ? 'schedule' : 'home'
  const share = params.get('share') === 'player' ? 'player' : 'all'
  const { isBooked, completeBooking } = useBookingSession()
  const booked = slotId ? isBooked(slotId) : false
  const booking = bookingFromId(slotId, booked)
  const matchesCourt = booking?.id === courtId
  const openedBooked = useRef(booked && matchesCourt)
  const [methodId, setMethodId] = useState(methods[0].id)
  const [paying, setPaying] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  useEffect(() => {
    if (!matchesCourt || !openedBooked.current) return
    navigate(`/court/${booking.id}/book/${booking.slotId}/booked`, { replace: true })
  }, [booking, matchesCourt, navigate])

  function goBack() {
    if (!matchesCourt) {
      navigate('/')
      return
    }
    navigate(`/court/${booking.id}/book/${booking.slotId}`, { state: { from } })
  }

  function pay() {
    if (!matchesCourt || paying || !booking.available || booking.booked) return
    const method = methods.find((item) => item.id === methodId) ?? methods[0]
    setPaying(true)
    timer.current = window.setTimeout(() => {
      completeBooking(booking.slotId)
      navigate(`/court/${booking.id}/book/${booking.slotId}/booked?share=${share}`, {
        replace: true,
        state: { method: method.name, paid: true, share },
      })
    }, 700)
  }

  return {
    booking: matchesCourt ? booking : null,
    payment: matchesCourt ? presentShare(booking, share) : null,
    methods,
    methodId,
    setMethodId,
    paying,
    goBack,
    pay,
  }
}
