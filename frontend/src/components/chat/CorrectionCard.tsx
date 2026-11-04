import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X, RefreshCw, CheckCircle2, BookOpen } from 'lucide-react'
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
        initial={{ opacity: 0, y: 16, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: 'spring', damping: 24, stiffness: 320 }}
        className="mx-2 sm:mx-4 mb-3 rounded-2xl border-2 border-amber-400/90 dark:border-amber-500/40 bg-white dark:bg-slate-900 shadow-xl shadow-amber-500/10 overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50">
          <div className="flex items-center gap-2">
            <AlertCircle size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-amber-950 dark:text-amber-200 font-bold text-sm tracking-tight">
              Recomendación · {correction.rule || "Consejo del Profesor Davies"}
            </span>
          </div>
          <button
            onClick={onDismiss}
            className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
            title="Cerrar sugerencia"
          >
            <X size={16} />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 space-y-3.5">
          {/* Lo que dijiste (Error) */}
          <div>
            <p className="text-[11px] font-extrabold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <span>Como lo dijiste:</span>
            </p>
            <div className="text-sm font-medium text-rose-950 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 px-3.5 py-2.5 rounded-xl line-through decoration-rose-500/70">
              {correction.original}
            </div>
          </div>

          {/* Forma Correcta */}
          <div>
            <p className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
              <span>Forma correcta sugerida:</span>
            </p>
            <div className="text-sm font-bold text-emerald-950 dark:text-emerald-100 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800/60 px-3.5 py-2.5 rounded-xl shadow-sm">
              {correction.corrected}
            </div>
          </div>

          {/* Explicación / Regla */}
          <div>
            <p className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <BookOpen size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Explicación del profesor:</span>
            </p>
            <div className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 px-3.5 py-2.5 rounded-xl leading-relaxed">
              {correction.explanation}
            </div>
          </div>
        </div>

        {/* Repeat button */}
        <div className="px-4 pb-4">
          <button
            onClick={() => onRepeat(correction.corrected)}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl
                       bg-amber-500 hover:bg-amber-600 active:scale-[0.98]
                       text-white text-sm font-bold shadow-md shadow-amber-500/25 transition-all"
          >
            <RefreshCw size={15} />
            <span>Practicar la frase correcta</span>
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}
