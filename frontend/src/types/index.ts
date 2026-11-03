// ─── User Profile ────────────────────────────────────────────────────────────
export interface UserProfile {
  id:     string
  name:   string
  email?: string
  level:  string
  goal?:  string
  xp:     number
  streak: number
}

// ─── Message ──────────────────────────────────────────────────────────────────
export type MessageRole = 'user' | 'assistant'

export interface Correction {
  hasError:    boolean
  original:    string
  corrected:   string
  explanation: string
  rule:        string
}

export interface SuggestedReply {
  text: string
  hint: string
}

export interface Message {
  id:                string
  role:              MessageRole
  content:           string
  translation?:      string
  suggestedReplies?: SuggestedReply[]
  timestamp:         string
  correction?:       Correction
  audioUrl?:         string
  isLoading?:        boolean
}

// ─── SRS / Flashcard ──────────────────────────────────────────────────────────
export type SRSGrade = 0 | 1 | 2 | 3 | 4 | 5   // SM-2 grades

export interface SRSCard {
  id:           string
  userId:       string
  front:        string   // English word / phrase
  back:         string   // Spanish meaning
  example:      string
  easeFactor:   number   // SM-2 EF (default 2.5)
  interval:     number   // days until next review
  repetitions:  number
  nextReview:   string   // ISO date
  sourceError?: string   // original user error that created this card
  createdAt:    string
}

// ─── Shadowing ────────────────────────────────────────────────────────────────
export interface ShadowingExercise {
  id:           string
  title:        string
  transcript:   string
  audioUrl:     string   // native British audio
  difficulty:   'A1' | 'A2' | 'B1'
  category:     string
  durationSec:  number
}

// ─── Dashboard / Progress ─────────────────────────────────────────────────────
export interface UserProgress {
  userId:             string
  streak:             number
  totalMessages:      number
  totalWords:         number
  cardsReviewedToday: number
  cardsDueToday:      number
  level:              string
  xp:                 number
}

// ─── API Responses ────────────────────────────────────────────────────────────
export interface ChatResponse {
  sessionId?:        string
  message:           string
  translation?:      string
  suggestedReplies?: SuggestedReply[]
  correction?:       Correction
  vocabulary?:       { word: string; meaning: string; example: string }[]
  taskStatus?:       'ongoing' | 'completed'
}

export interface ApiError {
  error:   string
  details?: string
}
