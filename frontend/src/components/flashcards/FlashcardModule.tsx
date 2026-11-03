import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trophy, BookOpen, RefreshCw, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppStore } from '@/store/useAppStore'
import { getDueCards, reviewCard } from '@/services/api'
import FlashCard from './FlashCard'
import type { SRSCard, SRSGrade } from '@/types'

export default function FlashcardModule() {
  const { userId, setDueCards, incrementReviewed, reviewedToday } = useAppStore()
  const [cards,       setCards]       = useState<SRSCard[]>([])
  const [currentIdx,  setCurrentIdx]  = useState(0)
  const [isLoading,   setIsLoading]   = useState(true)
  const [sessionDone, setSessionDone] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    getDueCards(userId)
      .then((c) => { setCards(c); setDueCards(c) })
      .catch(() => toast.error('Failed to load cards'))
      .finally(() => setIsLoading(false))
  }, [userId])

  const handleGrade = async (grade: SRSGrade) => {
    const card = cards[currentIdx]
    if (!card) return
    try {
      await reviewCard(card.id, grade)
      incrementReviewed()
      const next = currentIdx + 1
      if (next >= cards.length) setSessionDone(true)
      else setCurrentIdx(next)
    } catch {
      toast.error('Failed to save review')
    }
  }

  const restart = () => {
    setSessionDone(false)
    setCurrentIdx(0)
    getDueCards(userId).then(setCards).catch(console.error)
  }

  const card = cards[currentIdx]

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="p-4 space-y-4 max-w-lg mx-auto pb-6">
        {/* Header */}
        <div className="pt-2 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Flashcards</h1>
            <p className="text-sm text-white/50 mt-0.5">Spaced Repetition · SM-2</p>
          </div>
          <div className="glass px-3 py-1.5 flex items-center gap-2">
            <CheckCircle2 size={13} className="text-emerald-400" />
            <span className="text-xs font-semibold">{reviewedToday} today</span>
          </div>
        </div>

        {isLoading ? (
          <div className="glass p-8 flex flex-col items-center gap-3">
            <RefreshCw size={24} className="text-brand-400 animate-spin" />
            <p className="text-sm text-white/50">Loading cards…</p>
          </div>
        ) : sessionDone || cards.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-8 flex flex-col items-center gap-4 text-center"
          >
            <Trophy size={40} className="text-amber-400" />
            <div>
              <p className="text-xl font-bold">
                {cards.length === 0 ? 'All caught up' : 'Session complete'}
              </p>
              <p className="text-sm text-white/60 mt-2">
                {cards.length === 0
                  ? 'No cards are due right now. Come back later!'
                  : `Great work! You reviewed ${cards.length} card${cards.length !== 1 ? 's' : ''}.`
                }
              </p>
            </div>
            {cards.length > 0 && (
              <button onClick={restart} className="btn-ghost flex items-center gap-2 text-sm">
                <RefreshCw size={14} /> Practice again
              </button>
            )}
          </motion.div>
        ) : (
          <>
            {/* Progress bar */}
            <div>
              <div className="flex items-center justify-between text-xs text-white/40 mb-2">
                <span>Card {currentIdx + 1} of {cards.length}</span>
                <span>{Math.round((currentIdx / cards.length) * 100)}%</span>
              </div>
              <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-brand-400 rounded-full"
                  animate={{ width: `${(currentIdx / cards.length) * 100}%` }}
                  transition={{ type: 'spring', damping: 25 }}
                />
              </div>
            </div>

            {/* Card */}
            <AnimatePresence mode="wait">
              {card && (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{   opacity: 0, x: -30 }}
                  transition={{ type: 'spring', damping: 22 }}
                >
                  <FlashCard card={card} onGrade={handleGrade} />
                </motion.div>
              )}
            </AnimatePresence>

            {/* SM-2 info */}
            <div className="glass p-3 flex items-start gap-2">
              <BookOpen size={14} className="text-white/40 shrink-0 mt-0.5" />
              <p className="text-[11px] text-white/40 leading-relaxed">
                The <span className="text-white/60">SM-2 algorithm</span> adjusts each card's review interval based on your grade. Grade 5 (Perfect) pushes the card further into the future.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
