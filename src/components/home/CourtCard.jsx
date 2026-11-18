import { MapPin } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardTitle } from '@/components/ui/card'

export function CourtCard({ court, featured = false, onOpen }) {
  return (
    <Card
      role="button"
      tabIndex={0}
      aria-label={`Booking ${court.name}`}
      onClick={() => onOpen?.(court.id)}
      onKeyDown={(event) => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        onOpen?.(court.id)
      }}
      className={cn(
        'w-[168px] shrink-0 snap-start cursor-pointer gap-0 overflow-hidden rounded-[24px] py-2 ring-0',
        featured
          ? 'bg-[#123026] text-white shadow-[0_12px_28px_rgba(18,48,38,0.18)]'
          : 'bg-white text-ink shadow-[0_10px_24px_rgba(23,48,38,0.06)]',
      )}
    >
      <div className="px-2.5">
        <img
          src={court.image}
          alt={court.name}
          style={{ objectPosition: court.imagePosition }}
          className="h-[100px] w-full rounded-[16px] object-cover"
        />
      </div>
      <div className="px-4 pt-3.5">
        <CardTitle
          className={cn(
            'text-[14px] leading-tight font-semibold tracking-[-0.02em]',
            featured ? 'text-white' : 'text-ink',
          )}
        >
          {court.name}
        </CardTitle>
        <p className={cn('mt-0.5 text-[13px]', featured ? 'text-white/75' : 'text-[#6d756f]')}>
          {court.type}
        </p>
        <p
          className={cn(
            'text-[13px] font-medium',
            court.available ? 'text-lime' : featured ? 'text-white/70' : 'text-[#8b918b]',
          )}
        >
          {court.schedule}
        </p>
      </div>
      <div className="flex items-center justify-between px-4 pt-4 pb-2.5">
        <MapPin
          className={cn('size-[18px]', featured ? 'text-lime' : 'text-[#a1a79f]')}
          strokeWidth={1.75}
        />
        <p className={cn('text-[14px] font-bold tracking-[-0.03em]', featured && 'text-white')}>
          {court.priceLabel}
        </p>
      </div>
    </Card>
  )
}
