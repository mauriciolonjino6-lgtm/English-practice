import { useState } from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import type { SRSCard } from '@/types'

interface Props {
  card:     SRSCard
  onGrade:  (grade: 0 | 1 | 2 | 3 | 4 | 5) => void
}

const grades: { label: string; grade: 0|1|2|3|4|5; color: string; hint: string }[] = [
  { label: 'Blackout', grade: 0, color: 'bg-red-500/20 text-red-300 border-red-500/30',     hint: 'No recuerdo nada' },
  { label: 'Hard',     grade: 1, color: 'bg-orange-500/20 text-orange-300 border-orange-500/30', hint: 'Muy difícil' },
  { label: 'Difficult',grade: 2, color: 'bg-amber-500/20 text-amber-300 border-amber-500/30',  hint: 'Difícil' },
  { label: 'OK',       grade: 3, color: 'bg-blue-500/20 text-blue-300 border-blue-500/30',    hint: 'Correcto con esfuerzo' },
  { label: 'Good',     grade: 4, color: 'bg-teal-500/20 text-teal-300 border-teal-500/30',   hint: 'Fácil' },
  { label: 'Perfect',  grade: 5, color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30', hint: 'Perfecto' },
]

export default function FlashCard({ card, onGrade }: Props) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="w-full space-y-4">
      {/* Card */}
      <div
        className="relative cursor-pointer select-none"
        style={{ perspective: '1000px' }}
        onClick={() => setFlipped((f) => !f)}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ type: 'spring', damping: 20, stiffness: 200 }}
          style={{ transformStyle: 'preserve-3d' }}
          className="relative w-full"
        >
          {/* Front */}
          <div
            className="glass p-8 min-h-[200px] flex flex-col items-center justify-center gap-4 backface-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">English</p>
            <p className="text-2xl font-bold text-center text-white">{card.front}</p>
            <p className="text-xs text-white/30 mt-2">Tap to reveal</p>
          </div>

          {/* Back */}
          <div
            className="glass p-8 min-h-[200px] flex flex-col items-center justify-center gap-4 absolute inset-0"
            style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          >
            <p className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Español</p>
            <p className="text-xl font-bold text-center text-brand-300">{card.back}</p>
            <div className="bg-white/5 rounded-xl px-4 py-3 mt-2 w-full">
              <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-1">Example</p>
              <p className="text-sm text-white/70 italic leading-relaxed text-center">"{card.example}"</p>
            </div>
            {card.sourceError && (
              <div className="bg-amber-500/10 rounded-xl px-3 py-2 w-full">
                <p className="text-[10px] text-amber-400/70 uppercase tracking-wider mb-1">From your error</p>
                <p className="text-xs text-amber-300 line-through opacity-60">{card.sourceError}</p>
              </div>
            )}
          </div>
        </motion.div>
      </div>

      {/* Grade buttons — only show after flip */}
      {flipped && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <p className="text-xs text-white/40 text-center">¿Qué tan bien lo recordaste?</p>
          <div className="grid grid-cols-3 gap-2">
            {grades.map(({ label, grade, color, hint }) => (
              <button
                key={grade}
                onClick={() => onGrade(grade)}
                className={clsx(
                  'py-3 rounded-xl border text-xs font-semibold',
                  'flex flex-col items-center gap-0.5',
                  'active:scale-95 transition-all duration-200',
                  color
                )}
              >
                <span>{label}</span>
                <span className="text-[9px] opacity-60 font-normal">{hint}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  )
}
