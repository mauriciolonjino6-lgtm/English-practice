import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Message, SRSCard, UserProgress, UserProfile } from '@/types'

export type ScenarioType = 'free-talk' | 'cafe' | 'airport' | 'interview' | 'directions' | 'tech'

interface AppState {
  // ── Theme ──────────────────────────────────────────
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // ── User / Auth ────────────────────────────────────
  user: UserProfile | null
  userId: string
  setUser: (user: UserProfile | null) => void
  setUserId: (id: string) => void

  // ── Session & Chat ─────────────────────────────────
  messages: Message[]
  isTyping: boolean
  sessionId: string | null
  activeScenario: ScenarioType
  setActiveScenario: (scenario: ScenarioType) => void

  // ── Progress ───────────────────────────────────────
  progress: UserProgress | null

  // ── SRS ────────────────────────────────────────────
  dueCards: SRSCard[]
  reviewedToday: number

  // ── UI ─────────────────────────────────────────────
  activeTab: 'dashboard' | 'chat' | 'shadowing' | 'flashcards'
  isAuthModalOpen: boolean
  setAuthModalOpen: (open: boolean) => void

  // ── Actions ────────────────────────────────────────
  addMessage:     (msg: Message) => void
  updateMessage:  (id: string, patch: Partial<Message>) => void
  clearMessages:  () => void
  setIsTyping:    (v: boolean) => void
  setSessionId:   (id: string) => void
  setProgress:    (p: UserProgress) => void
  setDueCards:    (cards: SRSCard[]) => void
  incrementReviewed: () => void
  setActiveTab:   (tab: AppState['activeTab']) => void
  logout:         () => void
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme:             'dark',
      user:              null,
      userId:            'user_' + Math.random().toString(36).substring(2, 9),
      messages:          [],
      isTyping:          false,
      sessionId:         null,
      activeScenario:    'free-talk',
      progress:          null,
      dueCards:          [],
      reviewedToday:     0,
      activeTab:         'dashboard',
      isAuthModalOpen:   false,

      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        if (typeof document !== 'undefined') {
          if (next === 'dark') {
            document.documentElement.classList.add('dark')
          } else {
            document.documentElement.classList.remove('dark')
          }
        }
        set({ theme: next })
      },

      setUser: (user) => {
        if (user) {
          set({ user, userId: user.id })
        } else {
          set({ user: null })
        }
      },

      setUserId:         (id)       => set({ userId: id }),
      setAuthModalOpen:  (open)     => set({ isAuthModalOpen: open }),
      setActiveScenario: (scenario) => set({ activeScenario: scenario }),

      addMessage: (msg) => set((s) => ({ messages: [...s.messages, msg] })),
      updateMessage: (id, patch) =>
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

      logout: () => {
        const newId = 'user_' + Math.random().toString(36).substring(2, 9)
        set({ user: null, userId: newId, messages: [], sessionId: null })
      },
    }),
    {
      name: 'fluent-ai-v2',
      partialize: (s) => ({
        theme:          s.theme,
        user:           s.user,
        userId:         s.userId,
        reviewedToday:  s.reviewedToday,
        activeScenario: s.activeScenario,
      }),
    }
  )
)
