import { matches } from '@/data/catalog'
import { formatRupiah, formatRupiahFull } from '@/lib/format'

export function getMatch(id) {
  return matches.find((match) => match.id === id) ?? null
}

export function presentMatch(match, joined) {
  if (!match) return null

  const slotsLeft = Math.max(match.slotsLeft - (joined ? 1 : 0), 0)

  return {
    ...match,
    joined,
    slotsLeft,
    priceLabel: formatRupiah(match.price),
    priceFull: formatRupiahFull(match.price),
    totalFull: formatRupiahFull(match.price + match.serviceFee),
    serviceLabel: match.serviceFee === 0 ? 'Gratis' : formatRupiahFull(match.serviceFee),
    slotLabel: `${slotsLeft} slot left`,
    seat: match.players.length + 1,
    seatsLeftAfterJoin: Math.max(match.slotsLeft - 1, 0),
  }
}
