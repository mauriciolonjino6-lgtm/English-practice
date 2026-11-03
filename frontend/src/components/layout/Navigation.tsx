import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageCircle, Mic2, BookOpen } from 'lucide-react'
import { clsx } from 'clsx'

const tabs = [
  { path: '/dashboard',  label: 'Home',       icon: LayoutDashboard },
  { path: '/chat',       label: 'Chat',        icon: MessageCircle   },
  { path: '/shadowing',  label: 'Shadow',      icon: Mic2            },
  { path: '/flashcards', label: 'Cards',       icon: BookOpen        },
] as const

export default function Navigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="
      flex items-center justify-around
      bg-surface-2/80 backdrop-blur-xl
      border-t border-white/[0.08]
      safe-pb
      px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]
    ">
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={clsx(
              'flex flex-col items-center gap-1 px-4 py-1.5 rounded-2xl',
              'transition-all duration-200 select-none min-w-[60px]',
              active
                ? 'text-brand-400'
                : 'text-white/40 hover:text-white/70 active:scale-95'
            )}
          >
            <div className={clsx(
              'p-1.5 rounded-xl transition-all duration-200',
              active && 'bg-brand-500/20'
            )}>
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            </div>
            <span className={clsx(
              'text-[10px] font-semibold tracking-wide',
              active ? 'text-brand-400' : 'text-white/40'
            )}>
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
