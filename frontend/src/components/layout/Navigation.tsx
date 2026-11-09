import { useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, GraduationCap, MessageCircle, BookOpen, Mic2 } from 'lucide-react'
import { clsx } from 'clsx'

const tabs = [
  { path: '/dashboard',  label: 'Home',      icon: LayoutDashboard },
  { path: '/learn',      label: 'Curriculum',icon: GraduationCap   },
  { path: '/chat',       label: 'AI Tutor',  icon: MessageCircle   },
  { path: '/glossary',   label: 'Glossary',  icon: BookOpen        },
  { path: '/shadowing',  label: 'Speaking',  icon: Mic2            },
] as const

export default function Navigation() {
  const navigate = useNavigate()
  const { pathname } = useLocation()

  return (
    <nav className="
      flex items-center justify-around
      glass rounded-none
      border-t border-white/[0.08]
      safe-pb
      px-2 pt-2 pb-[max(0.75rem,env(safe-area-inset-bottom))]
      shrink-0
    ">
      {tabs.map(({ path, label, icon: Icon }) => {
        const active = pathname === path
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={clsx(
              'flex flex-col items-center gap-1 px-3 sm:px-4 py-1.5 rounded-2xl',
              'transition-all duration-200 select-none min-w-[58px]',
              active
                ? 'text-brand-500 font-bold'
                : 'opacity-50 hover:opacity-100 active:scale-95'
            )}
          >
            <div className={clsx(
              'p-1.5 rounded-xl transition-all duration-200',
              active && 'bg-brand-500/20'
            )}>
              <Icon size={20} strokeWidth={active ? 2.5 : 1.8} />
            </div>
            <span className="text-[10px] tracking-wide font-medium">
              {label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
