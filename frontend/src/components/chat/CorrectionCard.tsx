import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertCircle, X, RefreshCw, CheckCircle2, BookOpen, ChevronUp, ChevronDown } from 'lucide-react'
import type { Correction } from '@/types'

interface Props {
  correction: Correction
  onDismiss:  () => void
  onRepeat:   (text: string) => void
}

export default function CorrectionCard({ correction, onDismiss, onRepeat }: Props) {
  const [isMinimized, setIsMinimized] = useState(false)
  if (!correction.hasError) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 14, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ type: 'spring', damping: 25, stiffness: 320 }}
        className="mx-1 sm:mx-3 mb-2 rounded-2xl border-2 border-amber-400/90 dark:border-amber-500/40 bg-white dark:bg-slate-900 shadow-xl shadow-amber-500/10 overflow-hidden flex flex-col"
      >
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-3.5 py-2.5 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/50 shrink-0">
          <button
            onClick={() => setIsMinimized((v) => !v)}
            className="flex items-center gap-2 text-left group"
          >
            <AlertCircle size={17} className="text-amber-600 dark:text-amber-400 shrink-0" />
            <span className="text-amber-950 dark:text-amber-200 font-bold text-xs sm:text-sm tracking-tight group-hover:underline">
              Recomendación · {correction.rule || "Consejo del Profesor Davies"}
            </span>
            {isMinimized ? (
              <ChevronDown size={15} className="text-amber-700 dark:text-amber-400" />
            ) : (
              <ChevronUp size={15} className="text-amber-700 dark:text-amber-400" />
            )}
          </button>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsMinimized((v) => !v)}
              className="px-2 py-0.5 text-[11px] font-semibold rounded-md bg-amber-200/60 dark:bg-amber-900/40 text-amber-900 dark:text-amber-300 hover:bg-amber-200"
            >
              {isMinimized ? 'Ver detalle' : 'Minimizar'}
            </button>
            <button
              onClick={onDismiss}
              className="text-slate-400 hover:text-slate-700 dark:text-slate-400 dark:hover:text-white transition-colors p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10"
              title="Cerrar sugerencia"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Expandable/Scrollable Body */}
        {!isMinimized && (
          <>
            <div className="p-3.5 space-y-3 max-h-[30vh] sm:max-h-[32vh] overflow-y-auto overscroll-contain">
              {/* Lo que dijiste (Error) */}
              <div>
                <p className="text-[11px] font-extrabold text-rose-700 dark:text-rose-400 uppercase tracking-wider mb-1">
                  Como lo dijiste:
                </p>
                <div className="text-xs sm:text-sm font-medium text-rose-950 dark:text-rose-200 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 px-3 py-2 rounded-xl line-through decoration-rose-500/70">
                  {correction.original}
                </div>
              </div>

              {/* Forma Correcta */}
              <div>
                <p className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Forma correcta sugerida:</span>
                </p>
                <div className="text-xs sm:text-sm font-bold text-emerald-950 dark:text-emerald-100 bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-300 dark:border-emerald-800/60 px-3 py-2 rounded-xl shadow-sm">
                  {correction.corrected}
                </div>
              </div>

              {/* Explicación / Regla */}
              <div>
                <p className="text-[11px] font-extrabold text-blue-700 dark:text-blue-400 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <BookOpen size={13} className="text-blue-600 dark:text-blue-400" />
                  <span>Explicación del profesor:</span>
                </p>
                <div className="text-xs sm:text-sm font-medium text-slate-800 dark:text-slate-200 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/40 px-3 py-2 rounded-xl leading-relaxed">
                  {correction.explanation}
                </div>
              </div>
            </div>

            {/* Sticky Footer */}
            <div className="px-3.5 py-2.5 bg-amber-50/60 dark:bg-amber-950/20 border-t border-amber-200/60 dark:border-amber-900/40 shrink-0">
              <button
                onClick={() => onRepeat(correction.corrected)}
                className="w-full flex items-center justify-center gap-2 py-2 px-3 rounded-xl
                           bg-amber-500 hover:bg-amber-600 active:scale-[0.98]
                           text-white text-xs sm:text-sm font-bold shadow-md shadow-amber-500/25 transition-all"
              >
                <RefreshCw size={14} />
                <span>Practicar la frase correcta</span>
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
