import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Languages, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import type { Message } from '@/types'

interface Props {
  message: Message
}

export default function MessageBubble({ message }: Props) {
  const { speak } = useSpeechSynthesis()
  const [showTranslation, setShowTranslation] = useState(false)
  const isUser = message.role === 'user'

  if (message.isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end gap-2"
      >
        <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-md">
          M
        </div>
        <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 px-4 py-3 rounded-2xl flex items-center gap-2.5 shadow-sm">
          <Loader2 size={16} className="text-brand-500 animate-spin" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">British Tutor is preparing the answer…</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      className={clsx('flex items-end gap-2 group', isUser && 'flex-row-reverse')}
    >
      {/* Teacher Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-md mb-1 select-none">
          M
        </div>
      )}

      <div className={clsx('flex flex-col gap-1 max-w-[88%] sm:max-w-[80%]', isUser && 'items-end')}>
        {/* Main Bubble */}
        <div
          className={clsx(
            'relative px-4 py-3 text-sm sm:text-base leading-relaxed shadow-sm transition-all',
            isUser
              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white rounded-[22px_22px_4px_22px] shadow-brand-500/20'
              : 'bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-white/10 text-slate-900 dark:text-slate-100 rounded-[22px_22px_22px_4px]'
          )}
        >
          {/* Attached Image/Document Preview */}
          {message.imageUrl && (
            <div className="mb-2.5 rounded-xl overflow-hidden border border-black/10 dark:border-white/10 max-w-xs shadow-sm bg-black/5">
              <img
                src={message.imageUrl}
                alt="Foto o archivo adjunto"
                className="w-full max-h-56 object-cover cursor-pointer hover:opacity-95 transition-opacity"
                onClick={() => window.open(message.imageUrl, '_blank')}
              />
            </div>
          )}

          {/* English Message Text */}
          <div className="font-normal whitespace-pre-wrap">{message.content}</div>

          {/* Interactive Tools for Teacher Messages */}
          {!isUser && (
            <div className="mt-3 pt-2.5 border-t border-slate-200/80 dark:border-white/10 flex items-center justify-between gap-2 text-xs">
              {/* Play British Accent TTS */}
              <button
                onClick={() => speak(message.content)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                           bg-brand-50 dark:bg-brand-950/40 border border-brand-200/70 dark:border-brand-800/40
                           text-brand-700 dark:text-brand-300 font-bold hover:bg-brand-100 dark:hover:bg-brand-900/50
                           transition-all active:scale-95"
                title="Listen to authentic British pronunciation"
              >
                <Volume2 size={14} className="text-brand-600 dark:text-brand-400" />
                <span>Listen</span>
              </button>

              {/* Toggle Spanish Translation */}
              {message.translation && (
                <button
                  onClick={() => setShowTranslation((v) => !v)}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg
                             bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/70 dark:border-emerald-800/40
                             text-emerald-800 dark:text-emerald-300 font-bold hover:bg-emerald-100 dark:hover:bg-emerald-900/50
                             transition-all active:scale-95"
                  title="Toggle Spanish translation"
                >
                  <Languages size={14} className="text-emerald-600 dark:text-emerald-400" />
                  <span>{showTranslation ? 'Hide Translation' : 'Translate'}</span>
                </button>
              )}
            </div>
          )}

          {/* Spanish translation card */}
          <AnimatePresence>
            {!isUser && showTranslation && message.translation && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="mt-3 p-3.5 rounded-xl bg-emerald-50/90 dark:bg-emerald-950/60 border-2 border-emerald-300 dark:border-emerald-700/60 shadow-sm"
              >
                <div className="flex items-center gap-1.5 text-[11px] font-extrabold text-emerald-800 dark:text-emerald-300 uppercase tracking-wider mb-1">
                  <Languages size={13} className="text-emerald-600 dark:text-emerald-400" />
                  <span>Spanish Translation:</span>
                </div>
                <p className="text-xs sm:text-sm font-semibold text-emerald-950 dark:text-emerald-100 leading-relaxed whitespace-pre-wrap">
                  {message.translation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timestamp */}
        <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
}
