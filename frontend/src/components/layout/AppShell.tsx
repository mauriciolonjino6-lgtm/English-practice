import { ReactNode, useState, useRef } from 'react'
import { RotateCw } from 'lucide-react'
import AppHeader from './AppHeader'
import Navigation from './Navigation'
import AuthModal from '../auth/AuthModal'

interface Props { children: ReactNode }

export default function AppShell({ children }: Props) {
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const startYRef = useRef(0)
  const isPullingRef = useRef(false)

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0]
    // Allow pull when touching in top 150px
    if (touch && touch.clientY < 150) {
      startYRef.current = touch.clientY
      isPullingRef.current = true
    } else {
      isPullingRef.current = false
    }
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPullingRef.current || isRefreshing) return
    const touch = e.touches[0]
    if (!touch) return
    const diff = touch.clientY - startYRef.current
    if (diff > 0) {
      setPullDistance(Math.min(diff * 0.45, 75))
    } else {
      setPullDistance(0)
    }
  }

  const handleTouchEnd = async () => {
    if (!isPullingRef.current) return
    isPullingRef.current = false
    if (pullDistance >= 50) {
      setIsRefreshing(true)
      try {
        if ('caches' in window) {
          const keys = await caches.keys()
          await Promise.all(keys.map((k) => caches.delete(k)))
        }
      } catch {}
      const url = new URL(window.location.href)
      url.searchParams.set('reload', Date.now().toString())
      window.location.replace(url.toString())
    } else {
      setPullDistance(0)
    }
  }

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="h-full flex flex-col bg-mesh overflow-hidden select-none"
    >
      {/* Top Header with Theme Switch, Refresh & Login */}
      <AppHeader />

      {/* Pull-to-refresh mobile visual indicator */}
      {pullDistance > 0 && (
        <div
          style={{ height: `${pullDistance}px`, opacity: pullDistance / 45 }}
          className="w-full flex items-center justify-center bg-brand-500/10 dark:bg-brand-500/20 border-b border-brand-500/20 transition-all text-xs font-bold text-brand-600 dark:text-brand-300 gap-2 shrink-0 overflow-hidden"
        >
          <RotateCw size={14} className={pullDistance >= 50 || isRefreshing ? 'animate-spin text-brand-500' : ''} />
          <span>{pullDistance >= 50 || isRefreshing ? 'Release to update app' : 'Pull down to refresh'}</span>
        </div>
      )}

      {/* Main content area */}
      <main className="flex-1 overflow-hidden relative select-auto">
        {children}
      </main>

      {/* Bottom navigation */}
      <Navigation />

      {/* Login & Profile Modal */}
      <AuthModal />
    </div>
  )
}
