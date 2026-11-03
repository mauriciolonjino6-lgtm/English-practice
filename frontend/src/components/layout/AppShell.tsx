import { ReactNode } from 'react'
import Navigation from './Navigation'

interface Props { children: ReactNode }

export default function AppShell({ children }: Props) {
  return (
    <div className="h-full flex flex-col bg-mesh overflow-hidden">
      {/* Main content area */}
      <main className="flex-1 overflow-hidden relative">
        {children}
      </main>

      {/* Bottom navigation */}
      <Navigation />
    </div>
  )
}
