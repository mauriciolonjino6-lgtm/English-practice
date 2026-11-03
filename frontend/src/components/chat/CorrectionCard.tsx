import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X, RefreshCw } from 'lucide-react'
import type { Correction } from '@/types'

interface Props {
  correction: Correction
  onDismiss:  () => void
  onRepeat:   (text: string) => void
}

export default function CorrectionCard({ correction, onDismiss, onRepeat }: Props) {
  if (!correction.hasError) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0,  scale: 1 }}
        exit={{   opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
        className="mx-4 mb-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 backdrop-blur-xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-amber-500/20">
          <div className="flex items-center gap-2">
            <AlertCircle size={16} className="text-amber-400 shrink-0" />
            <span className="text-amber-300 font-semibold text-sm">Correction · {correction.rule}</span>
          </div>
          <button
            onClick={onDismiss}
            className="text-white/40 hover:text-white/70 transition-colors p-1"
          >
            <X size={14} />
          </button>
        </div>

        {/* Body */}
        <div className="px-4 py-3 space-y-3">
          {/* Error */}
          <div>
            <p className="text-[10px] text-red-400/80 font-semibold uppercase tracking-wider mb-1">You said</p>
            <p className="text-sm text-red-300 line-through opacity-80 bg-red-500/10 px-3 py-2 rounded-xl">
              {correction.original}
            </p>
          </div>

          {/* Corrected */}
          <div>
            <p className="text-[10px] text-emerald-400/80 font-semibold uppercase tracking-wider mb-1">Correct</p>
            <p className="text-sm text-emerald-300 font-medium bg-emerald-500/10 px-3 py-2 rounded-xl">
              {correction.corrected}
            </p>
          </div>

          {/* Explanation */}
          <div className="bg-white/5 rounded-xl px-3 py-2">
            <p className="text-[10px] text-white/50 font-semibold uppercase tracking-wider mb-1">Regla</p>
            <p className="text-xs text-white/80 leading-relaxed">{correction.explanation}</p>
          </div>
        </div>

        {/* Repeat button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => onRepeat(correction.corrected)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
                       bg-amber-500/20 hover:bg-amber-500/30 active:scale-[0.98]
                       text-amber-300 text-sm font-semibold transition-all duration-200"
          >
            <RefreshCw size={14} />
            Repetir la frase correcta
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
