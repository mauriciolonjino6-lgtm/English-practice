import axios from 'axios'
import type { ChatResponse, SRSCard, SRSGrade, UserProgress } from '@/types'

const rawApiUrl = import.meta.env.VITE_API_URL as string | undefined
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
    const msg = err.response?.data?.error ?? 'Network error'
    return Promise.reject(new Error(msg))
  }
)

// ── Chat ──────────────────────────────────────────────────────────────────────
export const sendChatMessage = async (
  payload: { text: string; userId: string; sessionId: string | null }
): Promise<ChatResponse> => {
  const { data } = await http.post<ChatResponse>('/chat/message', payload)
  return data
}

export const sendAudioMessage = async (
  blob: Blob,
  userId: string,
  sessionId: string | null
): Promise<ChatResponse> => {
  const form = new FormData()
  form.append('audio', blob, 'recording.webm')
  form.append('userId', userId)
  if (sessionId) form.append('sessionId', sessionId)
  const { data } = await http.post<ChatResponse>('/chat/audio', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
  return data
}

// ── SRS ───────────────────────────────────────────────────────────────────────
export const getDueCards = async (userId: string): Promise<SRSCard[]> => {
  const { data } = await http.get<SRSCard[]>(`/srs/due/${userId}`)
  return data
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
  const { data } = await http.get<UserProgress>(`/progress/${userId}`)
  return data
}
