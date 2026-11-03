import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message, SRSCard, UserProgress } from '@/types'

interface AppState {
  // ── Session ────────────────────────────────────────
  userId: string
  messages: Message[]
  isTyping: boolean
  sessionId: string | null

  // ── Progress ───────────────────────────────────────
  progress: UserProgress | null

  // ── SRS ────────────────────────────────────────────
  dueCards: SRSCard[]
  reviewedToday: number

  // ── UI ─────────────────────────────────────────────
  activeTab: 'dashboard' | 'chat' | 'shadowing' | 'flashcards'

  // ── Actions ────────────────────────────────────────
  setUserId:      (id: string) => void
  addMessage:     (msg: Message) => void
  updateMessage:  (id: string, patch: Partial<Message>) => void
  clearMessages:  () => void
  setIsTyping:    (v: boolean) => void
  setSessionId:   (id: string) => void
  setProgress:    (p: UserProgress) => void
  setDueCards:    (cards: SRSCard[]) => void
  incrementReviewed: () => void
  setActiveTab:   (tab: AppState['activeTab']) => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      userId:         crypto.randomUUID(),
      messages:       [],
      isTyping:       false,
      sessionId:      null,
      progress:       null,
      dueCards:       [],
      reviewedToday:  0,
      activeTab:      'dashboard',

      setUserId:      (id)      => set({ userId: id }),
      addMessage:     (msg)     => set((s) => ({ messages: [...s.messages, msg] })),
      updateMessage:  (id, patch) =>
        set((s) => ({
          messages: s.messages.map((m) => (m.id === id ? { ...m, ...patch } : m)),
        })),
      clearMessages:  ()        => set({ messages: [] }),
      setIsTyping:    (v)       => set({ isTyping: v }),
      setSessionId:   (id)      => set({ sessionId: id }),
      setProgress:    (p)       => set({ progress: p }),
      setDueCards:    (cards)   => set({ dueCards: cards }),
      incrementReviewed: ()     => set((s) => ({ reviewedToday: s.reviewedToday + 1 })),
      setActiveTab:   (tab)     => set({ activeTab: tab }),
    }),
    {
      name:    'fluent-ai-store',
      partialize: (s) => ({
        userId:        s.userId,
        reviewedToday: s.reviewedToday,
      }),
    }
  )
)
