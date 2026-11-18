import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'kemang-joined-matches'
const JoinSessionContext = createContext(null)

function readJoinedIds() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function JoinSessionProvider({ children }) {
  const [joinedIds, setJoinedIds] = useState(readJoinedIds)

  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(joinedIds))
  }, [joinedIds])

  const value = useMemo(
    () => ({
      joinedIds,
      isJoined(id) {
        return joinedIds.includes(id)
      },
      completeJoin(id) {
        setJoinedIds((current) => (current.includes(id) ? current : [...current, id]))
      },
    }),
    [joinedIds],
  )

  return <JoinSessionContext.Provider value={value}>{children}</JoinSessionContext.Provider>
}

export function useJoinSession() {
  const value = useContext(JoinSessionContext)
  if (!value) {
    throw new Error('useJoinSession harus dipakai di dalam JoinSessionProvider')
  }
  return value
}
