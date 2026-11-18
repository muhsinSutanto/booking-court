import { ArrowRight, Check, Plus } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarGroup } from '@/components/ui/avatar'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export function MatchCard({ match, onOpen }) {
  const full = !match.joined && match.slotsLeft === 0
  const label = match.joined ? 'Tergabung' : full ? 'Penuh' : 'Gabung'

  return (
    <Card
      onClick={() => onOpen(match.id)}
      className="cursor-pointer gap-0 rounded-[28px] bg-white px-5 py-5 text-ink shadow-[0_10px_30px_rgba(23,48,38,0.06)] ring-0"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2.5">
          <Badge className="h-7 shrink-0 rounded-full bg-lime px-3 text-[11px] font-bold tracking-[0.03em] text-ink uppercase">
            {match.status}
          </Badge>
          <span className="truncate text-[13px] font-medium text-[#6e766f]">{match.when}</span>
        </div>
        <Badge
          variant="secondary"
          className="h-7 shrink-0 rounded-full px-3 text-[12px] font-medium text-[#4d574f]"
        >
          {match.level}
        </Badge>
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <CardTitle className="text-[16px] leading-tight font-bold tracking-[-0.03em] text-ink">
            {match.title}
          </CardTitle>
          <CardDescription className="mt-1 text-[13px] text-[#7b827c]">
            {match.place}
          </CardDescription>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-[18px] leading-none font-bold tracking-[-0.04em] text-ink">
            {match.priceLabel}
          </p>
          <p className="mt-1 text-[12px] text-[#8b918b]">/ player</p>
        </div>
      </div>

      <Separator className="my-4 h-px bg-[#eceae4]" />

      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2.5">
          <div className="flex items-center">
            <AvatarGroup className="-space-x-2.5">
              {match.players.map((player) => (
                <Avatar key={player.id} className="size-9 after:border-0">
                  <AvatarFallback
                    className="text-[11px] font-semibold"
                    style={{ backgroundColor: player.color, color: player.text }}
                  >
                    {player.initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </AvatarGroup>
            <button
              type="button"
              aria-label="Undang pemain"
              className="-ml-2 flex size-9 items-center justify-center rounded-full border border-dashed border-[#c8ccc6] bg-white text-[#8d938d]"
            >
              <Plus className="size-4" strokeWidth={1.75} />
            </button>
          </div>
          <span className="truncate text-[13px] text-[#7d847e]">{match.slotLabel}</span>
        </div>
        <Button
          type="button"
          disabled={match.joined || full}
          onClick={(event) => {
            event.stopPropagation()
            onOpen(match.id)
          }}
          className={cn(
            'h-10 shrink-0 rounded-full px-4 text-[14px] font-semibold',
            match.joined && 'disabled:opacity-100',
          )}
        >
          {label}
          {match.joined ? <Check className="size-4" /> : <ArrowRight className="size-4" />}
        </Button>
      </div>
    </Card>
  )
}
