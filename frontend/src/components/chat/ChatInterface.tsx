import { useState, useRef, useEffect, useCallback } from 'react'
import { Send, RotateCcw, ChevronDown, Sparkles, Coffee, Plane, Briefcase, Compass, MessageCircle, Code } from 'lucide-react'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

import { useAppStore, ScenarioType } from '@/store/useAppStore'
import { sendChatMessage, sendAudioMessage } from '@/services/api'
import { useVoiceRecorder }  from '@/hooks/useVoiceRecorder'

import MessageBubble  from './MessageBubble'
import CorrectionCard from './CorrectionCard'
import VoiceButton    from './VoiceButton'
import type { Message, Correction, SuggestedReply } from '@/types'

const uuidv4 = () => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2, 11))

function makeMsg(role: Message['role'], content: string, extra?: Partial<Message>): Message {
  return { id: uuidv4(), role, content, timestamp: new Date().toISOString(), ...extra }
}

const SCENARIOS = [
  { id: 'free-talk',   label: 'Conversación', icon: MessageCircle, intro: "Hello! Welcome to our English session. I'm Mr. Davies. Tell me, what's on your mind today, or what would you like to talk about?" },
  { id: 'cafe',        label: 'Cafetería',    icon: Coffee,        intro: "Good morning! Welcome to Soho Coffee. Take a look at the board. What can I get started for you today?" },
  { id: 'airport',     label: 'Aeropuerto',   icon: Plane,         intro: "Good afternoon. Welcome to London Heathrow. May I see your passport and landing card, please? What is the purpose of your visit?" },
  { id: 'interview',   label: 'Entrevista',   icon: Briefcase,     intro: "Hello, please have a seat. Thank you for coming to this interview today. To start off, could you tell me a little about yourself and your background?" },
  { id: 'directions',  label: 'Direcciones',  icon: Compass,       intro: "Excuse me, love! You look a bit lost here outside Covent Garden station. Where are you trying to get to?" },
  { id: 'tech',        label: 'Ingeniería',   icon: Code,          intro: "Hi there! I hear you're working on some software and network projects. Could you explain what technologies you use in your daily work?" },
] as const

const DEFAULT_SUGGESTIONS: Record<ScenarioType, SuggestedReply[]> = {
  'free-talk': [
    { text: "Hello Mr. Davies, I want to practice conversation.", hint: "Hola profesor Davies, quiero practicar conversación." },
    { text: "Could you teach me some British slang?", hint: "¿Podría enseñarme modismos británicos?" },
  ],
  'cafe': [
    { text: "Could I have a flat white and a muffin, please?", hint: "¿Podría pedir un flat white y un panecillo, por favor?" },
    { text: "How much is that in total?", hint: "¿Cuánto es en total?" },
  ],
  'airport': [
    { text: "I'm visiting London for a holiday and to study.", hint: "Visito Londres de vacaciones y para estudiar." },
    { text: "I will be staying here for three weeks.", hint: "Me quedaré aquí durante tres semanas." },
  ],
  'interview': [
    { text: "I'm a systems engineering student with experience in programming.", hint: "Soy estudiante de ingeniería de sistemas con experiencia en programación." },
    { text: "I enjoy solving complex technical problems.", hint: "Disfruto resolver problemas técnicos complejos." },
  ],
  'directions': [
    { text: "Could you tell me how to get to the British Museum, please?", hint: "¿Podría decirme cómo llegar al Museo Británico, por favor?" },
    { text: "Is it within walking distance from here?", hint: "¿Queda a una distancia caminable desde aquí?" },
  ],
  'tech': [
    { text: "I work with databases and cloud services.", hint: "Trabajo con bases de datos y servicios en la nube." },
    { text: "We are designing a microservices architecture.", hint: "Estamos diseñando una arquitectura de microservicios." },
  ],
}

export default function ChatInterface() {
  const {
    userId, messages, isTyping, sessionId, activeScenario, user,
    addMessage, updateMessage, clearMessages, setIsTyping, setSessionId, setActiveScenario,
  } = useAppStore()

  const [inputText, setInputText] = useState('')
  const [activeCorrection, setActiveCorrection] = useState<Correction | null>(null)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [activeSuggestions, setActiveSuggestions] = useState<SuggestedReply[]>(DEFAULT_SUGGESTIONS[activeScenario] || [])

  const bottomRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { recordingState, audioLevel, startRecording, stopRecording, cancelRecording } = useVoiceRecorder()

  // Initialize intro if messages empty
  useEffect(() => {
    if (messages.length === 0) {
      const current = SCENARIOS.find((s) => s.id === activeScenario) ?? SCENARIOS[0]
      addMessage(makeMsg('assistant', current.intro, {
        translation: "¡Hola! Bienvenido a nuestra sesión de inglés. Soy el profesor Davies. Cuéntame, ¿qué tienes en mente hoy o de qué te gustaría hablar?",
      }))
    }
  }, [messages.length, activeScenario, addMessage])

  // Scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, scrollToBottom])

  // Handle Scenario Change
  const handleSelectScenario = (scId: ScenarioType) => {
    if (scId === activeScenario) return
    setActiveScenario(scId)
    const target = SCENARIOS.find((s) => s.id === scId)
    if (target) {
      clearMessages()
      addMessage(makeMsg('assistant', target.intro))
      setActiveSuggestions(DEFAULT_SUGGESTIONS[scId] || [])
      toast(`Cambiado a: ${target.label}`)
    }
  }

  // ── Send text message ───────────────────────────────────────────────────────
  const handleSend = useCallback(async (customText?: string) => {
    const textToSend = (customText ?? inputText).trim()
    if (!textToSend || isTyping) return

    setInputText('')
    addMessage(makeMsg('user', textToSend))

    const loadingId = uuidv4()
    addMessage({ id: loadingId, role: 'assistant', content: '', timestamp: new Date().toISOString(), isLoading: true })
    setIsTyping(true)

    try {
      const res = await sendChatMessage({
        text: textToSend,
        userId: user?.id || userId,
        sessionId,
        scenario: activeScenario,
      })

      if (res.sessionId && !sessionId) setSessionId(res.sessionId)

      updateMessage(loadingId, {
        content:          res.message,
        translation:      res.translation,
        suggestedReplies: res.suggestedReplies,
        correction:       res.correction,
        isLoading:        false,
      })

      if (res.suggestedReplies && res.suggestedReplies.length > 0) {
        setActiveSuggestions(res.suggestedReplies)
      }

      if (res.correction?.hasError) {
        setActiveCorrection(res.correction)
      }
    } catch (err: any) {
      toast.error('Error de conexión con el servidor. Intenta de nuevo.')
      updateMessage(loadingId, {
        content: "I apologize, our Oxford line seemed to disconnect for a moment. Please click below to send your message again!",
        isLoading: false,
      })
    } finally {
      setIsTyping(false)
    }
  }, [inputText, isTyping, user?.id, userId, sessionId, activeScenario, addMessage, updateMessage, setIsTyping, setSessionId])

  // ── Send audio message ──────────────────────────────────────────────────────
  const handleVoiceStop = useCallback(async () => {
    const blob = await stopRecording()
    if (!blob) return

    const loadingId = uuidv4()
    addMessage(makeMsg('user', '🎙️ [Voice note sent...]'))
    addMessage({ id: loadingId, role: 'assistant', content: '', timestamp: new Date().toISOString(), isLoading: true })
    setIsTyping(true)

    try {
      const res = await sendAudioMessage(blob, user?.id || userId, sessionId, activeScenario)
      if (res.sessionId && !sessionId) setSessionId(res.sessionId)

      updateMessage(loadingId, {
        content:          res.message,
        translation:      res.translation,
        suggestedReplies: res.suggestedReplies,
        correction:       res.correction,
        isLoading:        false,
      })

      if (res.suggestedReplies && res.suggestedReplies.length > 0) {
        setActiveSuggestions(res.suggestedReplies)
      }

      if (res.correction?.hasError) setActiveCorrection(res.correction)
    } catch {
      toast.error('Error de audio o conexión. Intenta de nuevo.')
      updateMessage(loadingId, {
        content: "I could not quite catch that audio recording. Would you mind pressing the microphone to speak once more?",
        isLoading: false,
      })
    } finally {
      setIsTyping(false)
    }
  }, [stopRecording, user?.id, userId, sessionId, activeScenario, addMessage, updateMessage, setIsTyping, setSessionId])

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Scenario Bar */}
      <div className="px-4 py-2 bg-white/90 dark:bg-slate-900/90 border-b border-slate-200 dark:border-white/10 backdrop-blur-xl flex items-center justify-between shrink-0 z-10">
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-1">
          {SCENARIOS.map(({ id, label, icon: Icon }) => {
            const active = activeScenario === id
            return (
              <button
                key={id}
                onClick={() => handleSelectScenario(id as ScenarioType)}
                className={clsx(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200',
                  active
                    ? 'bg-brand-600 text-white shadow-md shadow-brand-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                <Icon size={13} />
                <span>{label}</span>
              </button>
            )
          })}
        </div>

        <button
          onClick={() => {
            clearMessages()
            toast('Chat reiniciado')
          }}
          className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors ml-2"
          title="Reiniciar conversación"
        >
          <RotateCcw size={15} />
        </button>
      </div>

      {/* Message List */}
      <div
        ref={listRef}
        onScroll={(e) => {
          const el = e.currentTarget
          setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 150)
        }}
        className="flex-1 overflow-y-auto px-4 py-4 space-y-4 scroll-smooth"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={bottomRef} className="h-1" />
      </div>

      {/* Suggested Quick Replies */}
      {activeSuggestions.length > 0 && !isTyping && (
        <div className="px-4 py-2 bg-slate-100/95 dark:bg-slate-900/90 border-t border-b border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-hide flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-300 shrink-0 flex items-center gap-1">
            <Sparkles size={12} className="text-brand-600 dark:text-brand-400" /> Sugerencias:
          </span>
          {activeSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug.text)}
              className="px-3.5 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 text-slate-800 dark:text-slate-100 shadow-sm whitespace-nowrap transition-all text-left group active:scale-95"
              title={sug.hint}
            >
              <span className="font-semibold block text-slate-900 dark:text-white">{sug.text}</span>
              {sug.hint && <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium">{sug.hint}</span>}
            </button>
          ))}
        </div>
      )}

      {/* Correction Popover */}
      {activeCorrection && (
        <div className="px-2 sm:px-4 pb-2">
          <CorrectionCard
            correction={activeCorrection}
            onDismiss={() => setActiveCorrection(null)}
            onRepeat={(txt) => {
              setInputText(txt)
              setActiveCorrection(null)
            }}
          />
        </div>
      )}

      {/* Input area */}
      <div className="p-3 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-white/10 rounded-none shrink-0 safe-pb shadow-lg">
        <div className="flex items-end gap-2 max-w-3xl mx-auto">
          {/* Voice recorder */}
          <VoiceButton
            state={recordingState}
            audioLevel={audioLevel}
            onStart={startRecording}
            onStop={handleVoiceStop}
            onCancel={cancelRecording}
          />

          {/* Text Input */}
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              rows={1}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  handleSend()
                }
              }}
              placeholder="Escribe en inglés o usa el micrófono..."
              className="w-full rounded-xl px-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:bg-white dark:focus:bg-slate-800 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20 resize-none py-3 pr-10 text-sm max-h-32 transition-all shadow-sm"
            />
          </div>

          {/* Send button */}
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim() || isTyping}
            className="p-3 rounded-2xl bg-brand-600 text-white disabled:opacity-40 disabled:scale-100 hover:bg-brand-700 active:scale-95 transition-all shadow-md shadow-brand-500/20"
          >
            <Send size={18} />
          </button>
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <button
          onClick={() => scrollToBottom()}
          className="absolute bottom-20 right-5 p-2 rounded-full glass shadow-lg text-brand-400 hover:scale-105 transition-transform"
        >
          <ChevronDown size={18} />
        </button>
      )}
    </div>
  )
}
