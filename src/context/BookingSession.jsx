import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'kemang-booked-slots'
const BookingSessionContext = createContext(null)

function readBookedIds() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function BookingSessionProvider({ children }) {
  const [bookedIds, setBookedIds] = useState(readBookedIds)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(bookedIds))
  }, [bookedIds])

  const value = useMemo(
    () => ({
      bookedIds,
      isBooked(id) {
        return bookedIds.includes(id)
      },
      completeBooking(id) {
        setBookedIds((current) => (current.includes(id) ? current : [...current, id]))
      },
    }),
    [bookedIds],
  )

  return <BookingSessionContext.Provider value={value}>{children}</BookingSessionContext.Provider>
}

export function useBookingSession() {
  const value = useContext(BookingSessionContext)
  if (!value) {
    throw new Error('useBookingSession harus dipakai di dalam BookingSessionProvider')
  }
  return value
}
