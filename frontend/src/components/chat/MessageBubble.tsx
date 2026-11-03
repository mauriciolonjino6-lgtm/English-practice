import { motion } from 'framer-motion'
import { Volume2, Loader2 } from 'lucide-react'
import { clsx } from 'clsx'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import type { Message } from '@/types'

interface Props { message: Message }

export default function MessageBubble({ message }: Props) {
  const { speak } = useSpeechSynthesis()
  const isUser   = message.role === 'user'

  if (message.isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-end gap-2"
      >
        <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center shrink-0 text-xs font-bold">
          M
        </div>
        <div className="glass px-4 py-3 flex items-center gap-2">
          <Loader2 size={14} className="text-white/50 animate-spin" />
          <span className="text-sm text-white/50">Mr. Davies is typing…</span>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0,  scale: 1 }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
      className={clsx('flex items-end gap-2', isUser && 'flex-row-reverse')}
    >
      {/* Avatar */}
      {!isUser && (
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center shrink-0 text-xs font-bold mb-1">
          M
        </div>
      )}

      <div className={clsx('flex flex-col gap-1 max-w-[80%]', isUser && 'items-end')}>
        {/* Bubble */}
        <div className={clsx(
          'relative px-4 py-2.5 text-sm leading-relaxed',
          isUser
            ? 'bg-brand-500 text-white rounded-[18px_18px_4px_18px]'
            : 'glass text-white/90 rounded-[18px_18px_18px_4px]'
        )}>
          {message.content}

          {/* Speak button for assistant */}
          {!isUser && (
            <button
              onClick={() => speak(message.content)}
              className="absolute -bottom-5 right-0 text-white/30 hover:text-white/60 transition-colors p-1"
            >
              <Volume2 size={12} />
            </button>
          )}
        </div>

        {/* Timestamp */}
        <span className="text-[10px] text-white/30 px-1">
          {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  )
}
