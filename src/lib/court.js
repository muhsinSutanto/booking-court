import { courts } from '@/data/catalog'
import { findSlot, listSlots } from '@/data/slots'
import { formatRupiah, formatRupiahFull } from '@/lib/format'

export function getCourt(id) {
  return courts.find((court) => court.id === id) ?? null
}

export function durationLabel(minutes = 90) {
  return minutes === 60 ? '1 jam' : '1.5 jam'
}

export function priceForDuration(price, minutes = 90) {
  return Math.round((price * minutes) / 90 / 1000) * 1000
}

export function presentCourt(court, minutes = 90) {
  if (!court) return null

  const price = priceForDuration(court.price, minutes)
  const length = durationLabel(minutes)

  return {
    ...court,
    minutes,
    amount: price,
    venue: 'Sample Padel',
    duration: `${length} sewa lapangan`,
    durationShort: `Durasi ${length}`,
    priceLabel: formatRupiah(price),
    priceFull: formatRupiahFull(price),
    serviceLabel: 'Gratis',
    summary: `${court.type} untuk main ${length}.`,
    notes: [
      'Datang 15 menit lebih awal untuk check-in.',
      'Bawa raket. Bola disediakan di venue.',
    ],
  }
}

export function presentBooking(court, slot, booked) {
  const presented = presentCourt(court, slot?.minutes ?? 90)
  if (!presented || !slot) return null

  const courtNo = court.id.replace('court-', '')

  return {
    ...presented,
    slotId: slot.id,
    day: slot.day,
    dayLabel: slot.dayLabel,
    date: slot.date,
    start: slot.start,
    end: slot.end,
    available: slot.available,
    booked,
    when: `${slot.dayLabel} • ${slot.start}`,
    whenRange: `${slot.dayLabel} • ${slot.start}–${slot.end}`,
    code: `KCM-C${courtNo}-${slot.start.replace(':', '')}`,
  }
}

export function presentShare(booking, share) {
  const mode = share === 'player' ? 'player' : 'all'
  const amount = mode === 'player' ? Math.round(booking.amount / 4) : booking.amount

  return {
    share: mode,
    label: mode === 'player' ? 'Bayar 1 pemain' : 'Bayar semua',
    detail: mode === 'player' ? 'Bagian kamu dari 4 pemain' : 'Seluruh biaya lapangan',
    amount,
    amountFull: formatRupiahFull(amount),
  }
}

export function bookingFromId(slotId, booked) {
  const slot = findSlot(slotId)
  if (!slot) return null
  return presentBooking(getCourt(slot.courtId), slot, booked)
}

export function slotsForCourt(courtId, bookedIds) {
  const booked = new Set(bookedIds)

  return listSlots(courtId).map((slot) => ({
    ...slot,
    booked: booked.has(slot.id),
  }))
}
