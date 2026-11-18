import { useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { bookingDays, bookingDurations } from '@/data/slots'
import { useBookingSession } from '@/context/BookingSession'
import {
  durationLabel,
  getCourt,
  presentBooking,
  presentCourt,
  slotsForCourt,
} from '@/lib/court'

export function useCourtDetail() {
  const { courtId } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const { bookedIds, isBooked } = useBookingSession()
  const slots = useMemo(
    () => (courtId ? slotsForCourt(courtId, bookedIds) : []),
    [courtId, bookedIds],
  )
  const requested = slots.find((slot) => slot.id === location.state?.slotId)
  const [dayId, setDayId] = useState(requested?.day ?? bookingDays[0].id)
  const [minutes, setMinutes] = useState(requested?.minutes ?? 90)
  const [selectedId, setSelectedId] = useState(requested?.id ?? null)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [draftDay, setDraftDay] = useState(dayId)
  const [draftMinutes, setDraftMinutes] = useState(minutes)
  const court = presentCourt(getCourt(courtId), minutes)

  const visibleSlots = slots.filter(
    (slot) => slot.day === dayId && slot.minutes === minutes,
  )
  const selected =
    slots.find(
      (slot) => slot.id === selectedId && slot.day === dayId && slot.minutes === minutes,
    ) ?? null
  const booking = selected
    ? presentBooking(getCourt(courtId), selected, isBooked(selected.id))
    : null
  const openCount = slots.filter(
    (slot) => slot.minutes === minutes && slot.available && !slot.booked,
  ).length

  const from = location.state?.from === 'schedule' ? 'schedule' : 'home'

  function goBack() {
    navigate(from === 'schedule' ? '/schedule' : '/')
  }

  function selectDay(nextDay) {
    setDayId(nextDay)
    setSelectedId((current) => {
      const slot = slots.find((item) => item.id === current)
      return slot?.day === nextDay && slot?.minutes === minutes ? current : null
    })
  }

  function openFilters() {
    setDraftDay(dayId)
    setDraftMinutes(minutes)
    setFiltersOpen(true)
  }

  function applyFilters() {
    setDayId(draftDay)
    setMinutes(draftMinutes)
    setSelectedId((current) => {
      const slot = slots.find((item) => item.id === current)
      return slot?.day === draftDay && slot?.minutes === draftMinutes ? current : null
    })
    setFiltersOpen(false)
  }

  function resetFilters() {
    setDraftDay(bookingDays[0].id)
    setDraftMinutes(90)
  }

  function continueBooking() {
    if (!booking || (!booking.available && !booking.booked)) return
    if (booking.booked) {
      navigate(`/court/${booking.id}/book/${booking.slotId}/booked`)
      return
    }
    navigate(`/court/${booking.id}/book/${booking.slotId}`, { state: { from } })
  }

  return {
    court,
    days: bookingDays,
    durations: bookingDurations,
    dayId,
    selectDay,
    minutes,
    durationText: durationLabel(minutes),
    visibleSlots,
    selectedId,
    selectSlot: setSelectedId,
    booking,
    openCount,
    filtersOpen,
    setFiltersOpen,
    draftDay,
    draftMinutes,
    setDraftDay,
    setDraftMinutes,
    openFilters,
    applyFilters,
    resetFilters,
    filtered: minutes !== 90 || dayId !== bookingDays[0].id,
    goBack,
    continueBooking,
  }
}
