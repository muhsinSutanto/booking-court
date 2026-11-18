export function formatRupiah(amount) {
  const thousands = amount / 1000
  const value = Number.isInteger(thousands)
    ? String(thousands)
    : thousands.toFixed(1).replace(/\.0$/, '')

  return `Rp ${value}k`
}

export function formatRupiahFull(amount) {
  return `Rp ${new Intl.NumberFormat('id-ID').format(amount)}`
}
