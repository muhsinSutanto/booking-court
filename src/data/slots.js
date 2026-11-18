export const bookingDays = [
  {
    id: 'today',
    weekday: 'Rab',
    dayNumber: '18',
    caption: 'Hari ini',
    label: 'Hari ini',
    date: 'Rab, 18 Nov',
  },
  {
    id: 'tomorrow',
    weekday: 'Kam',
    dayNumber: '19',
    caption: 'Besok',
    label: 'Besok',
    date: 'Kam, 19 Nov',
  },
  {
    id: 'fri',
    weekday: 'Jum',
    dayNumber: '20',
    caption: '20 Nov',
    label: 'Jumat',
    date: 'Jum, 20 Nov',
  },
  {
    id: 'sat',
    weekday: 'Sab',
    dayNumber: '21',
    caption: '21 Nov',
    label: 'Sabtu',
    date: 'Sab, 21 Nov',
  },
  {
    id: 'sun',
    weekday: 'Min',
    dayNumber: '22',
    caption: '22 Nov',
    label: 'Minggu',
    date: 'Min, 22 Nov',
  },
]

export const bookingDurations = [
  { id: 60, label: '1 jam' },
  { id: 90, label: '1.5 jam' },
]

const sessions = {
  90: [
    ['07:00', '08:30'],
    ['09:00', '10:30'],
    ['16:00', '17:30'],
    ['18:00', '19:30'],
    ['20:00', '21:30'],
  ],
  60: [
    ['07:00', '08:00'],
    ['08:00', '09:00'],
    ['09:00', '10:00'],
    ['16:00', '17:00'],
    ['17:00', '18:00'],
    ['18:00', '19:00'],
    ['19:00', '20:00'],
    ['20:00', '21:00'],
  ],
}

const taken = new Set([
  'court-1:today:90:18:00',
  'court-1:tomorrow:90:07:00',
  'court-1:today:60:08:00',
  'court-1:today:60:17:00',
  'court-2:today:90:16:00',
  'court-2:today:90:18:00',
  'court-2:fri:60:16:00',
  'court-3:today:90:20:00',
  'court-3:tomorrow:90:09:00',
  'court-3:sat:60:19:00',
])

function slotId(courtId, dayId, minutes, start) {
  const stamp = start.replace(':', '')
  return minutes === 90
    ? `${courtId}-${dayId}-${stamp}`
    : `${courtId}-${dayId}-60-${stamp}`
}

export function listSlots(courtId) {
  return bookingDays.flatMap((day) =>
    [90, 60].flatMap((minutes) =>
      sessions[minutes].map(([start, end]) => ({
        id: slotId(courtId, day.id, minutes, start),
        courtId,
        day: day.id,
        dayLabel: day.label,
        date: day.date,
        minutes,
        start,
        end,
        available: !taken.has(`${courtId}:${day.id}:${minutes}:${start}`),
      })),
    ),
  )
}

export function findSlot(slotIdValue) {
  if (!slotIdValue) return null
  const courtId = slotIdValue.split('-').slice(0, 2).join('-')
  return listSlots(courtId).find((slot) => slot.id === slotIdValue) ?? null
}
