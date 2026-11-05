import { useEffect } from 'react'
import { Sun, Moon, User as UserIcon } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'

export default function AppHeader() {
  const { theme, toggleTheme, user, setAuthModalOpen } = useAppStore()

  // Sync theme with HTML class on mount and change
  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    }
  }, [theme])

  return (
    <header className="h-14 px-4 border-b border-slate-200 dark:border-white/[0.08] flex items-center justify-between shrink-0 bg-white/90 dark:bg-slate-900/90 rounded-none backdrop-blur-xl z-20">
      {/* Brand */}
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center text-xs font-black text-white shadow-md shadow-brand-500/20 tracking-wider">
          GB
        </div>
        <div>
          <span className="font-extrabold text-base tracking-tight text-gradient">
            FluentAI
          </span>
          <span className="hidden xs:inline-block ml-2 px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-brand-500/10 dark:bg-brand-500/20 text-brand-700 dark:text-brand-300 uppercase tracking-wider">
            Pro ESL
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Dark/Light Mode Button */}
        <button
          onClick={toggleTheme}
          title={theme === 'dark' ? 'Cambiar a Modo Claro' : 'Cambiar a Modo Oscuro'}
          className="p-2 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 text-slate-700 dark:text-white/80"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-amber-400 transition-transform duration-300 rotate-0 hover:rotate-45" />
          ) : (
            <Moon size={18} className="text-indigo-600 transition-transform duration-300" />
          )}
        </button>

        {/* User / Login Button */}
        <button
          onClick={() => setAuthModalOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/15 active:scale-95 transition-all text-xs font-semibold text-slate-800 dark:text-slate-100 border border-slate-200/80 dark:border-transparent"
        >
          {user ? (
            <>
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-brand-500 to-indigo-600 text-white flex items-center justify-center text-[10px] font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <span className="block text-[11px] font-bold leading-tight line-clamp-1">{user.name}</span>
                <span className="text-[9px] text-brand-600 dark:text-brand-300 uppercase font-semibold">{user.level || 'A1'}</span>
              </div>
            </>
          ) : (
            <>
              <UserIcon size={15} className="text-brand-600 dark:text-brand-400" />
              <span>Iniciar Sesión</span>
            </>
          )}
        </button>
      </div>
    </header>
  )
}
