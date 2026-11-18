import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'kemang-coaching'
const CoachingSessionContext = createContext(null)

function readEnrolledIds() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CoachingSessionProvider({ children }) {
  const [enrolledIds, setEnrolledIds] = useState(readEnrolledIds)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(enrolledIds))
  }, [enrolledIds])

  const value = useMemo(
    () => ({
      isEnrolled(id) {
        return enrolledIds.includes(id)
      },
      enroll(id) {
        setEnrolledIds((current) => (current.includes(id) ? current : [...current, id]))
      },
    }),
    [enrolledIds],
  )

  return (
    <CoachingSessionContext.Provider value={value}>{children}</CoachingSessionContext.Provider>
  )
}

export function useCoachingSession() {
  const value = useContext(CoachingSessionContext)
  if (!value) {
    throw new Error('useCoachingSession harus dipakai di dalam CoachingSessionProvider')
  }
  return value
}
