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
        <div className="glass px-4 py-3 flex items-center gap-2">
          <Loader2 size={16} className="text-brand-400 animate-spin" />
          <span className="text-sm opacity-70">Mr. Davies is preparing his answer…</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      className={clsx('flex items-end gap-2 group', isUser && 'flex-row-reverse')}
    >
      {/* Teacher Avatar */}
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-600 to-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold text-white shadow-md mb-1">
          M
        </div>
      )}

      <div className={clsx('flex flex-col gap-1 max-w-[85%] sm:max-w-[78%]', isUser && 'items-end')}>
        {/* Main Bubble */}
        <div
          className={clsx(
            'relative px-4 py-3 text-sm leading-relaxed rounded-2xl shadow-sm',
            isUser
              ? 'bg-brand-500 text-white rounded-[20px_20px_4px_20px]'
              : 'glass border border-white/10 rounded-[20px_20px_20px_4px]'
          )}
        >
          {/* English Message Text */}
          <div className="font-normal">{message.content}</div>

          {/* Interactive Tools for Teacher Messages */}
          {!isUser && (
            <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between gap-3 text-xs">
              {/* Play British Accent TTS */}
              <button
                onClick={() => speak(message.content)}
                className="flex items-center gap-1.5 opacity-70 hover:opacity-100 text-brand-300 font-semibold transition-opacity active:scale-95"
                title="Escuchar pronunciación británica"
              >
                <Volume2 size={14} />
                <span>Escuchar</span>
              </button>

              {/* Toggle Spanish Translation */}
              {message.translation && (
                <button
                  onClick={() => setShowTranslation((v) => !v)}
                  className="flex items-center gap-1.5 opacity-70 hover:opacity-100 text-emerald-400 font-medium transition-opacity active:scale-95"
                  title="Ver traducción en español"
                >
                  <Languages size={14} />
                  <span>{showTranslation ? 'Ocultar español' : 'Traducir'}</span>
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
                className="mt-2 p-2.5 rounded-xl bg-black/25 border border-white/10 text-xs text-emerald-300 leading-normal"
              >
                <span className="font-semibold block text-[10px] text-emerald-400 uppercase tracking-wider mb-0.5">
                  Traducción:
                </span>
                {message.translation}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Timestamp */}
        <span className="text-[10px] opacity-40 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
}
