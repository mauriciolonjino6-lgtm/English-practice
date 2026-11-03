import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Loader2, X } from 'lucide-react'
import { clsx } from 'clsx'
import type { RecordingState } from '@/hooks/useVoiceRecorder'

interface Props {
  state:      RecordingState
  audioLevel: number
  onStart:    () => void
  onStop:     () => void
  onCancel:   () => void
}

export default function VoiceButton({ state, audioLevel, onStart, onStop, onCancel }: Props) {
  const isRecording  = state === 'recording'
  const isProcessing = state === 'processing'

  return (
    <div className="relative flex items-center justify-center">
      {/* Pulse ring when recording */}
      <AnimatePresence>
        {isRecording && (
          <>
            <motion.div
              key="ring1"
              initial={{ scale: 1, opacity: 0.4 }}
              animate={{ scale: 1 + audioLevel * 1.2, opacity: 0 }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeOut' }}
              className="absolute w-16 h-16 rounded-full bg-red-500/40"
            />
            <motion.div
              key="ring2"
              initial={{ scale: 1, opacity: 0.2 }}
              animate={{ scale: 1 + audioLevel * 1.8, opacity: 0 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeOut', delay: 0.1 }}
              className="absolute w-16 h-16 rounded-full bg-red-500/20"
            />
          </>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.button
        whileTap={{ scale: 0.92 }}
        onClick={isRecording ? onStop : isProcessing ? undefined : onStart}
        disabled={isProcessing}
        className={clsx(
          'relative z-10 w-14 h-14 rounded-full flex items-center justify-center',
          'shadow-lg transition-all duration-300 select-none',
          isRecording
            ? 'bg-red-500 shadow-red-500/30'
            : isProcessing
              ? 'bg-surface-3 cursor-not-allowed'
              : 'bg-brand-500 shadow-brand-500/30 hover:bg-brand-400 active:bg-brand-600'
        )}
      >
        {isProcessing ? (
          <Loader2 size={22} className="text-white animate-spin" />
        ) : isRecording ? (
          <Square size={18} className="text-white fill-white" />
        ) : (
          <Mic size={22} className="text-white" />
        )}
      </motion.button>

      {/* Cancel while recording */}
      {isRecording && (
        <button
          onClick={onCancel}
          className="absolute -right-8 text-xs text-white/40 hover:text-white/70 transition-colors p-1"
          title="Cancel"
        >
          <X size={14} />
        </button>
      )}
    </div>
  )
}
