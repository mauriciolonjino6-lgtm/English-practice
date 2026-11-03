import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from '@/components/layout/AppShell'
import Dashboard from '@/components/dashboard/Dashboard'
import ChatInterface from '@/components/chat/ChatInterface'
import ShadowingModule from '@/components/shadowing/ShadowingModule'
import FlashcardModule from '@/components/flashcards/FlashcardModule'

export default function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/chat" element={<ChatInterface />} />
        <Route path="/shadowing" element={<ShadowingModule />} />
        <Route path="/flashcards" element={<FlashcardModule />} />
      </Routes>
    </AppShell>
  )
}
