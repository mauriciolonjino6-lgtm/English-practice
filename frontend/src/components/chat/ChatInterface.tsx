import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Send, RotateCcw, ChevronDown } from 'lucide-react'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

const uuidv4 = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11))

import { useAppStore }       from '@/store/useAppStore'
import { sendChatMessage, sendAudioMessage } from '@/services/api'
import { useVoiceRecorder }  from '@/hooks/useVoiceRecorder'

import MessageBubble  from './MessageBubble'
import CorrectionCard from './CorrectionCard'
import VoiceButton    from './VoiceButton'
import type { Message, Correction } from '@/types'

// ── Helper ────────────────────────────────────────────────────────────────────
function makeMsg(role: Message['role'], content: string, extra?: Partial<Message>): Message {
  return { id: uuidv4(), role, content, timestamp: new Date().toISOString(), ...extra }
}

const INTRO: Message = makeMsg(
  'assistant',
  "Oh, hello! Come in, come in! Welcome! Please, sit down. My name is Mr. Davies. I am your English teacher here. So... tell me about yourself! What is your name? And where are you from? Take your time — there is no rush."
)

export default function ChatInterface() {
  // ── Store ──────────────────────────────────────────────────────────────────
  const {
    userId, messages, isTyping, sessionId,
    addMessage, updateMessage, clearMessages, setIsTyping, setSessionId,
  } = useAppStore()

  // ── Local state ────────────────────────────────────────────────────────────
  const [inputText,       setInputText]       = useState('')
  const [activeCorrection, setActiveCorrection] = useState<Correction | null>(null)
  const [showScrollBtn,   setShowScrollBtn]   = useState(false)
  const [inputRows,       setInputRows]       = useState(1)

  // ── Refs ───────────────────────────────────────────────────────────────────
  const bottomRef   = useRef<HTMLDivElement>(null)
  const scrollRef   = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  // ── Voice ──────────────────────────────────────────────────────────────────
  const { recordingState, audioLevel, startRecording, stopRecording, cancelRecording } =
    useVoiceRecorder()

  // ── Init: show intro if no messages ───────────────────────────────────────
  useEffect(() => {
    if (messages.length === 0) addMessage(INTRO)
  }, [])

  // ── Auto-scroll ────────────────────────────────────────────────────────────
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping, activeCorrection])

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 80)
  }

  // ── Text auto-resize ───────────────────────────────────────────────────────
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value
    setInputText(val)
    const lines = val.split('\n').length
    setInputRows(Math.min(4, Math.max(1, lines)))
  }

  // ── Send message ───────────────────────────────────────────────────────────
  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || isTyping) return

    setInputText('')
    setInputRows(1)
    addMessage(makeMsg('user', trimmed))

    const loadingId = uuidv4()
    addMessage({ id: loadingId, role: 'assistant', content: '', timestamp: new Date().toISOString(), isLoading: true })
    setIsTyping(true)

    try {
      const res = await sendChatMessage({ text: trimmed, userId, sessionId })
      if (res.sessionId && !sessionId) setSessionId(res.sessionId as string)

      updateMessage(loadingId, {
        content:    res.message,
        correction: res.correction,
        isLoading:  false,
      })

      if (res.correction?.hasError) {
        setActiveCorrection(res.correction)
      }
    } catch (err) {
      updateMessage(loadingId, { content: 'Connection error. Please try again.', isLoading: false })
      toast.error('Failed to reach the server')
    } finally {
      setIsTyping(false)
    }
  }, [isTyping, userId, sessionId, addMessage, updateMessage, setIsTyping, setSessionId])

  // ── Send audio ─────────────────────────────────────────────────────────────
  const handleVoiceStop = useCallback(async () => {
    const blob = await stopRecording()
    if (!blob) return

    const loadingId = uuidv4()
    addMessage(makeMsg('user', 'Voice message...'))
    addMessage({ id: loadingId, role: 'assistant', content: '', timestamp: new Date().toISOString(), isLoading: true })
    setIsTyping(true)

    try {
      const res = await sendAudioMessage(blob, userId, sessionId)
      if (res.sessionId && !sessionId) setSessionId(res.sessionId as string)

      updateMessage(loadingId, {
        content:    res.message,
        correction: res.correction,
        isLoading:  false,
      })

      if (res.correction?.hasError) setActiveCorrection(res.correction)
    } catch {
      updateMessage(loadingId, { content: 'Audio processing failed.', isLoading: false })
      toast.error('Audio processing failed')
    } finally {
      setIsTyping(false)
    }
  }, [stopRecording, userId, sessionId, addMessage, updateMessage, setIsTyping, setSessionId])

  // ── Keyboard ───────────────────────────────────────────────────────────────
  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputText)
    }
  }

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.08] bg-surface-2/60 backdrop-blur-xl shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center font-bold text-sm">
            M
          </div>
          <div>
            <p className="font-semibold text-sm">Mr. Davies</p>
            <div className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
              <span className="text-[11px] text-white/50">DELTA Certified · ESL Teacher</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => { clearMessages(); addMessage(INTRO); setActiveCorrection(null) }}
          className="p-2 text-white/40 hover:text-white/70 transition-colors rounded-xl hover:bg-white/5"
          title="New session"
        >
          <RotateCcw size={16} />
        </button>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={onScroll}
        className="flex-1 overflow-y-auto scrollbar-hide px-4 py-4 space-y-4"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Scroll-to-bottom button */}
      <AnimatePresence>
        {showScrollBtn && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{   opacity: 0, scale: 0.8 }}
            onClick={() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' })}
            className="absolute bottom-28 right-4 w-8 h-8 glass rounded-full flex items-center justify-center shadow-lg z-10"
          >
            <ChevronDown size={16} className="text-white/70" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Correction card */}
      <AnimatePresence>
        {activeCorrection && (
          <CorrectionCard
            key="correction"
            correction={activeCorrection}
            onDismiss={() => setActiveCorrection(null)}
            onRepeat={(text) => { sendMessage(text); setActiveCorrection(null) }}
          />
        )}
      </AnimatePresence>

      {/* Input area */}
      <div className="shrink-0 border-t border-white/[0.08] bg-surface-2/60 backdrop-blur-xl px-3 py-3 safe-pb">
        <div className="flex items-end gap-2 max-w-lg mx-auto">
          {/* Voice button */}
          <VoiceButton
            state={recordingState}
            audioLevel={audioLevel}
            onStart={startRecording}
            onStop={handleVoiceStop}
            onCancel={cancelRecording}
          />

          {/* Text input */}
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={inputText}
              onChange={handleTextChange}
              onKeyDown={onKeyDown}
              rows={inputRows}
              placeholder={recordingState === 'recording' ? 'Recording...' : 'Type or use the mic...'}
              disabled={recordingState !== 'idle'}
              className={clsx(
                'input-field resize-none leading-relaxed',
                'transition-all duration-200',
                recordingState !== 'idle' && 'opacity-50 cursor-not-allowed'
              )}
            />
          </div>

          {/* Send button */}
          <button
            onClick={() => sendMessage(inputText)}
            disabled={!inputText.trim() || isTyping || recordingState !== 'idle'}
            className={clsx(
              'w-11 h-11 rounded-2xl flex items-center justify-center shrink-0',
              'transition-all duration-200 active:scale-90',
              inputText.trim() && !isTyping
                ? 'bg-brand-500 shadow-lg shadow-brand-500/30 hover:bg-brand-400'
                : 'bg-white/10 cursor-not-allowed'
            )}
          >
            <Send size={18} className="text-white" />
          </button>
        </div>

        {/* Hint */}
        <p className="text-center text-[10px] text-white/20 mt-2">
          Enter to send · Shift+Enter for new line · Tap mic to speak
        </p>
      </div>
    </div>
  )
}
