import { Calendar, Dumbbell, House, User } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { cn } from '@/lib/utils'

const items = [
  { to: '/', label: 'Home', icon: House, end: true },
  { to: '/schedule', label: 'Match', icon: Calendar },
  { to: '/learn', label: 'Learn', icon: Dumbbell },
  { to: '/profile', label: 'Profil', icon: User },
]

export function BottomNav() {
  return (
    <nav className="sticky bottom-0 z-30 border-t border-black/5 bg-[#f7f6f2]/95 px-6 pt-3 pb-[max(0.85rem,env(safe-area-inset-bottom))] backdrop-blur">
      <ul className="grid grid-cols-4">
        {items.map((item) => {
          const Icon = item.icon

          return (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.end}
                aria-label={item.label}
                className={({ isActive }) =>
                  cn(
                    'flex flex-col items-center gap-1 text-[#b4b8b2]',
                    isActive && 'text-ink',
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon
                      className={cn('size-[22px]', isActive && 'fill-current')}
                      strokeWidth={1.75}
                    />
                    <span
                      className={cn(
                        'size-1 rounded-full',
                        isActive ? 'bg-ink' : 'bg-transparent',
                      )}
                    />
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
