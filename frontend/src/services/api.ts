import axios from 'axios'
import type { ChatResponse, SRSCard, SRSGrade, UserProgress, UserProfile } from '@/types'

const rawApiUrl = (import.meta as any).env?.VITE_API_URL as string | undefined
const baseURL = rawApiUrl
  ? `${rawApiUrl.replace(/\/$/, '')}/api`
  : '/api'

const http = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// ── Interceptors ──────────────────────────────────────────────────────────────
http.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.error ?? err.message ?? 'Network error'
    return Promise.reject(new Error(msg))
  }
)

// ── Auth ──────────────────────────────────────────────────────────────────────
export const authLogin = async (payload: {
  name?: string
  email?: string
  level?: string
  goal?: string
}): Promise<{ user: UserProfile }> => {
  const { data } = await http.post<{ user: UserProfile }>('/auth/login', payload)
  return data
}

export const updateUserProfile = async (
  id: string,
  payload: { name?: string; level?: string; goal?: string }
): Promise<{ user: UserProfile }> => {
  const { data } = await http.put<{ user: UserProfile }>(`/auth/user/${id}`, payload)
  return data
}

// ── Chat ──────────────────────────────────────────────────────────────────────
export const sendChatMessage = async (
  payload: {
    text:       string
    userId:     string
    sessionId:  string | null
    scenario?:  string
    history?:   { role: string; content: string }[]
    image?:     { mimeType: string; data: string }
  }
): Promise<ChatResponse> => {
  const { data } = await http.post<ChatResponse>('/chat/message', payload)
  return data
}

export const sendAudioMessage = async (
  blob:       Blob,
  userId:     string,
  sessionId:  string | null,
  scenario?:  string,
  history?:   { role: string; content: string }[]
): Promise<ChatResponse> => {
  const form = new FormData()
  form.append('audio', blob, 'recording.webm')
  form.append('userId', userId)
  if (sessionId) form.append('sessionId', sessionId)
  if (scenario)  form.append('scenario', scenario)
  if (history && history.length > 0) {
    form.append('history', JSON.stringify(history))
  }
  const { data } = await http.post<ChatResponse>('/chat/audio', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

// ── SRS ───────────────────────────────────────────────────────────────────────
export const getDueCards = async (userId: string): Promise<SRSCard[]> => {
  try {
    const { data } = await http.get<SRSCard[]>(`/srs/due/${userId}`)
    return data
  } catch {
    return []
  }
}

export const reviewCard = async (
  cardId: string,
  grade: SRSGrade
): Promise<SRSCard> => {
  const { data } = await http.post<SRSCard>(`/srs/review/${cardId}`, { grade })
  return data
}

// ── Progress ──────────────────────────────────────────────────────────────────
export const getUserProgress = async (userId: string): Promise<UserProgress> => {
  try {
    const { data } = await http.get<UserProgress>(`/progress/${userId}`)
    return data
  } catch {
    return {
      userId,
      streak: 1,
      totalMessages: 0,
      totalWords: 0,
      cardsReviewedToday: 0,
      cardsDueToday: 0,
      level: 'A1',
      xp: 10,
    }
  }
}
