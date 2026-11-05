import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import type { Message, SRSCard, UserProgress, UserProfile, ChatSession } from '@/types'

const safeStorage = {
  getItem: (name: string): string | null => {
    try {
      return localStorage.getItem(name)
    } catch {
      return null
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      localStorage.setItem(name, value)
    } catch (e) {
      console.warn('[Storage Quota Exceeded]: Cleaning up image data from persisted sessions', e)
      try {
        const parsed = JSON.parse(value)
        if (parsed?.state?.messages) {
          parsed.state.messages = parsed.state.messages.map((m: any) => ({ ...m, imageUrl: undefined }))
        }
        if (parsed?.state?.sessions) {
          parsed.state.sessions = parsed.state.sessions.map((s: any) => ({
            ...s,
            messages: (s.messages || []).map((m: any) => ({ ...m, imageUrl: undefined })),
          }))
        }
        localStorage.setItem(name, JSON.stringify(parsed))
      } catch (innerErr) {
        console.error('[SafeStorage Fallback Failed]:', innerErr)
      }
    }
  },
  removeItem: (name: string): void => {
    try {
      localStorage.removeItem(name)
    } catch {}
  },
}

export type ScenarioType = 'free-talk' | 'cafe' | 'airport' | 'interview' | 'directions' | 'tech'

export interface LevelProgressState {
  currentLevel: 'A2' | 'B1' | 'B2'
  completedLessons: string[]
  lessonScores: Record<string, number>
  passedExams: string[]
  examScores: Record<string, number>
  lastExamDate?: string
}

const initialLevelProgress: LevelProgressState = {
  currentLevel: 'A2',
  completedLessons: [],
  lessonScores: {},
  passedExams: [],
  examScores: {},
}

const uuidv4 = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : 'sess_' + Math.random().toString(36).substring(2, 11)

const DEFAULT_INTRO = "Hello! Welcome to our English session. I'm Mr. Davies. Tell me, what's on your mind today, or what would you like to talk about?"

function createInitialSession(scenario: ScenarioType = 'free-talk'): ChatSession {
  const id = uuidv4()
  return {
    id,
    title: 'Nueva Conversación',
    scenario,
    messages: [
      {
        id: uuidv4(),
        role: 'assistant',
        content: DEFAULT_INTRO,
        translation: "¡Hola! Bienvenido a nuestra sesión de inglés. Soy el profesor Davies. Cuéntame, ¿qué tienes en mente hoy o de qué te gustaría hablar?",
        timestamp: new Date().toISOString(),
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}

interface AppState {
  // ── Theme ──────────────────────────────────────────
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // ── User / Auth ────────────────────────────────────
  user: UserProfile | null
  userId: string
  setUser: (user: UserProfile | null) => void
  setUserId: (id: string) => void

  // ── Multi-Chat Sessions ────────────────────────────
  sessions: ChatSession[]
  activeSessionId: string
  createNewSession: (scenario?: ScenarioType) => string
  switchSession: (id: string) => void
  deleteSession: (id: string) => void
  renameSession: (id: string, title: string) => void

  // ── Active Chat State (Mirrored with activeSession) ─
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

  // ── Level Progression ──────────────────────────────
  levelProgress: LevelProgressState
  completeLesson: (lessonId: string, score: number) => void
  recordExamResult: (examId: string, score: number, passed: boolean) => void
  setCurrentLevel: (level: 'A2' | 'B1' | 'B2') => void
  resetLevelProgress: () => void

  // ── UI ─────────────────────────────────────────────
  activeTab: 'dashboard' | 'chat' | 'shadowing' | 'flashcards' | 'curriculum'
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

const initialSession = createInitialSession()

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      theme:             'dark',
      user:              null,
      userId:            uuidv4(),
      sessions:          [initialSession],
      activeSessionId:   initialSession.id,
      messages:          initialSession.messages,
      isTyping:          false,
      sessionId:         initialSession.id,
      activeScenario:    initialSession.scenario,
      progress:          null,
      dueCards:          [],
      reviewedToday:     0,
      activeTab:         'dashboard',
      isAuthModalOpen:   false,
      levelProgress:     initialLevelProgress,

      completeLesson: (lessonId: string, score: number) => {
        set((s) => {
          const completed = s.levelProgress.completedLessons.includes(lessonId)
            ? s.levelProgress.completedLessons
            : [...s.levelProgress.completedLessons, lessonId]
          const updatedScores = {
            ...s.levelProgress.lessonScores,
            [lessonId]: Math.max(score, s.levelProgress.lessonScores[lessonId] || 0),
          }
          const currentXp = s.user?.xp || s.progress?.xp || 20
          const newXp = currentXp + 25
          return {
            levelProgress: {
              ...s.levelProgress,
              completedLessons: completed,
              lessonScores: updatedScores,
            },
            user: s.user ? { ...s.user, xp: newXp } : null,
            progress: s.progress ? { ...s.progress, xp: newXp } : null,
          }
        })
      },

      recordExamResult: (examId: string, score: number, passed: boolean) => {
        set((s) => {
          const passedList = passed && !s.levelProgress.passedExams.includes(examId)
            ? [...s.levelProgress.passedExams, examId]
            : s.levelProgress.passedExams
          const nextLevel = passed && examId === 'final-exam-a2' ? 'B1' : s.levelProgress.currentLevel
          const currentXp = s.user?.xp || s.progress?.xp || 20
          const newXp = passed ? currentXp + 100 : currentXp + 30
          return {
            levelProgress: {
              ...s.levelProgress,
              passedExams: passedList,
              examScores: {
                ...s.levelProgress.examScores,
                [examId]: Math.max(score, s.levelProgress.examScores[examId] || 0),
              },
              currentLevel: nextLevel as 'A2' | 'B1' | 'B2',
              lastExamDate: new Date().toISOString(),
            },
            user: s.user ? { ...s.user, xp: newXp, level: nextLevel } : null,
            progress: s.progress ? { ...s.progress, xp: newXp, level: nextLevel } : null,
          }
        })
      },

      setCurrentLevel: (level: 'A2' | 'B1' | 'B2') => {
        set((s) => ({
          levelProgress: { ...s.levelProgress, currentLevel: level },
          user: s.user ? { ...s.user, level } : null,
          progress: s.progress ? { ...s.progress, level } : null,
        }))
      },

      resetLevelProgress: () => {
        set({
          levelProgress: initialLevelProgress,
        })
      },

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

      // ── Multi-Chat Management ────────────────────────
      createNewSession: (scenario = 'free-talk') => {
        const newSess = createInitialSession(scenario)
        set((s) => ({
          sessions: [newSess, ...s.sessions],
          activeSessionId: newSess.id,
          messages: newSess.messages,
          sessionId: newSess.id,
          activeScenario: scenario,
        }))
        return newSess.id
      },

      switchSession: (id: string) => {
        const target = get().sessions.find((s) => s.id === id)
        if (target) {
          set({
            activeSessionId: target.id,
            messages:        target.messages,
            sessionId:       target.id,
            activeScenario:  target.scenario,
          })
        }
      },

      deleteSession: (id: string) => {
        const remaining = get().sessions.filter((s) => s.id !== id)
        if (remaining.length === 0) {
          const fresh = createInitialSession()
          set({
            sessions: [fresh],
            activeSessionId: fresh.id,
            messages: fresh.messages,
            sessionId: fresh.id,
            activeScenario: fresh.scenario,
          })
        } else {
          const nextActive = remaining[0]
          set({
            sessions: remaining,
            activeSessionId: nextActive.id,
            messages: nextActive.messages,
            sessionId: nextActive.id,
            activeScenario: nextActive.scenario,
          })
        }
      },

      renameSession: (id: string, title: string) => {
        set((s) => ({
          sessions: s.sessions.map((sess) =>
            sess.id === id ? { ...sess, title, updatedAt: new Date().toISOString() } : sess
          ),
        }))
      },

      setActiveScenario: (scenario) => {
        const activeId = get().activeSessionId
        set((s) => ({
          activeScenario: scenario,
          sessions: s.sessions.map((sess) =>
            sess.id === activeId ? { ...sess, scenario, updatedAt: new Date().toISOString() } : sess
          ),
        }))
      },

      // ── Message handling with Auto-Session Sync ───────
      addMessage: (msg) => {
        const { activeSessionId, sessions } = get()
        const currentSession = sessions.find((s) => s.id === activeSessionId)
        const updatedMessages = [...(currentSession?.messages || get().messages), msg]

        // Derive title from first user message if still default
        let newTitle = currentSession?.title || 'Conversación'
        if (msg.role === 'user' && (!currentSession || currentSession.title === 'Nueva Conversación')) {
          newTitle = msg.content.trim().slice(0, 32)
          if (msg.content.trim().length > 32) newTitle += '…'
        }

        const updatedSessions = sessions.map((sess) =>
          sess.id === activeSessionId
            ? {
                ...sess,
                title: newTitle,
                messages: updatedMessages,
                updatedAt: new Date().toISOString(),
              }
            : sess
        )

        set({
          messages: updatedMessages,
          sessions: updatedSessions,
        })
      },

      updateMessage: (id, patch) => {
        const { activeSessionId, sessions, messages } = get()
        const updatedMessages = messages.map((m) => (m.id === id ? { ...m, ...patch } : m))
        const updatedSessions = sessions.map((sess) =>
          sess.id === activeSessionId
            ? { ...sess, messages: updatedMessages, updatedAt: new Date().toISOString() }
            : sess
        )
        set({
          messages: updatedMessages,
          sessions: updatedSessions,
        })
      },

      clearMessages: () => {
        const { activeSessionId, sessions } = get()
        const emptyIntro: Message = {
          id: uuidv4(),
          role: 'assistant',
          content: DEFAULT_INTRO,
          translation: "¡Hola! Bienvenido a nuestra sesión de inglés. Soy el profesor Davies. Cuéntame, ¿qué tienes en mente hoy o de qué te gustaría hablar?",
          timestamp: new Date().toISOString(),
        }
        const updatedSessions = sessions.map((sess) =>
          sess.id === activeSessionId
            ? { ...sess, messages: [emptyIntro], title: 'Nueva Conversación', updatedAt: new Date().toISOString() }
            : sess
        )
        set({
          messages: [emptyIntro],
          sessions: updatedSessions,
        })
      },

      setIsTyping:    (v)       => set({ isTyping: v }),
      setSessionId:   (id)      => set({ sessionId: id }),
      setProgress:    (p)       => set({ progress: p }),
      setDueCards:    (cards)   => set({ dueCards: cards }),
      incrementReviewed: ()     => set((s) => ({ reviewedToday: s.reviewedToday + 1 })),
      setActiveTab:   (tab)     => set({ activeTab: tab }),

      logout: () => {
        const fresh = createInitialSession()
        set({
          user: null,
          userId: uuidv4(),
          sessions: [fresh],
          activeSessionId: fresh.id,
          messages: fresh.messages,
          sessionId: fresh.id,
        })
      },
    }),
    {
      name: 'fluent-ai-v4-storage',
      storage: createJSONStorage(() => safeStorage),
      onRehydrateStorage: () => (state) => {
        if (state && state.sessions && state.sessions.length > 0) {
          const active = state.sessions.find((s) => s.id === state.activeSessionId) || state.sessions[0]
          if (active) {
            state.activeSessionId = active.id
            state.sessionId = active.id
            state.messages = active.messages || []
            state.activeScenario = active.scenario || 'free-talk'
          }
        }
      },
      partialize: (s) => ({
        theme:            s.theme,
        user:             s.user,
        userId:           s.userId,
        sessions:         s.sessions,
        activeSessionId:  s.activeSessionId,
        messages:         s.messages,
        sessionId:        s.sessionId,
        activeScenario:   s.activeScenario,
        reviewedToday:    s.reviewedToday,
        levelProgress:    s.levelProgress,
      }),
    }
  )
)
