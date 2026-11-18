import { Plus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

export function PlayerLineup({ players, slotsTotal, tone = 'brand' }) {
  const emptySlots = Math.max(slotsTotal - players.length, 0)
  const soft = tone === 'soft'

  return (
    <div className="flex justify-between">
      {players.map((player) => (
        <div key={player.id} className="flex w-16 flex-col items-center gap-1.5">
          <Avatar className="size-11 after:border-0">
            <AvatarFallback
              className="text-[12px] font-semibold"
              style={
                soft
                  ? { backgroundColor: '#e7e6e0', color: '#3c463f' }
                  : { backgroundColor: player.color, color: player.text }
              }
            >
              {player.initials}
            </AvatarFallback>
          </Avatar>
          <span className="text-[12px] text-[#7a817b]">{player.name}</span>
        </div>
      ))}
      {Array.from({ length: emptySlots }, (_, index) => (
        <div key={`empty-${index}`} className="flex w-16 flex-col items-center gap-1.5">
          <div className="flex size-11 items-center justify-center rounded-full border border-dashed border-[#c5c9c2] text-[#8d938d]">
            <Plus className="size-4" strokeWidth={1.75} />
          </div>
          <span className="text-[12px] text-[#8d938d]">{index === 0 ? 'Kamu?' : 'Slot'}</span>
        </div>
      ))}
    </div>
  )
}
