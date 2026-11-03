import { ReactNode } from 'react'
import AppHeader from './AppHeader'
import Navigation from './Navigation'
import AuthModal from '../auth/AuthModal'

interface Props { children: ReactNode }

export default function AppShell({ children }: Props) {
  return (
    <div className="h-full flex flex-col bg-mesh overflow-hidden">
      {/* Top Header with Theme Switch & Login */}
      <AppHeader />

      {/* Main content area */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>

      {/* Bottom navigation */}
      <Navigation />

      {/* Login & Profile Modal */}
      <AuthModal />
    </div>
  )
}
