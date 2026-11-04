import { useState, useRef, useEffect, useCallback } from 'react'
import {
  Send,
  PlusCircle,
  History,
  Trash2,
  X,
  Sparkles,
  Coffee,
  Plane,
  Briefcase,
  Compass,
  MessageCircle,
  Code,
  ChevronDown,
  Check,
} from 'lucide-react'
import toast from 'react-hot-toast'
import { clsx } from 'clsx'

import { useAppStore, ScenarioType } from '@/store/useAppStore'
import { sendChatMessage, sendAudioMessage } from '@/services/api'
import { useVoiceRecorder } from '@/hooks/useVoiceRecorder'

import MessageBubble from './MessageBubble'
import CorrectionCard from './CorrectionCard'
import VoiceButton from './VoiceButton'
import type { Message, Correction, SuggestedReply } from '@/types'

const uuidv4 = () =>
  typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 11)

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
    userId,
    messages,
    isTyping,
    sessionId,
    activeScenario,
    user,
    sessions,
    activeSessionId,
    createNewSession,
    switchSession,
    deleteSession,
    addMessage,
    updateMessage,
    setIsTyping,
    setSessionId,
    setActiveScenario,
  } = useAppStore()

  const [inputText, setInputText] = useState('')
  const [activeCorrection, setActiveCorrection] = useState<Correction | null>(null)
  const [showScrollBtn, setShowScrollBtn] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [activeSuggestions, setActiveSuggestions] = useState<SuggestedReply[]>(
    DEFAULT_SUGGESTIONS[activeScenario] || []
  )

  const bottomRef = useRef<HTMLDivElement>(null)
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  const { recordingState, audioLevel, startRecording, stopRecording, cancelRecording } = useVoiceRecorder()

  // Scroll to bottom
  const scrollToBottom = useCallback((smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' })
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages.length, activeCorrection, scrollToBottom])

  // Handle Scenario Change
  const handleSelectScenario = (scId: ScenarioType) => {
    if (scId === activeScenario) return
    setActiveScenario(scId)
    setActiveSuggestions(DEFAULT_SUGGESTIONS[scId] || [])
    const target = SCENARIOS.find((s) => s.id === scId)
    if (target) {
      toast(`Escenario: ${target.label}`)
    }
  }

  // ── Send text message with Full Memory ──────────────────────────────────────
  const handleSend = useCallback(async (customText?: string) => {
    const textToSend = (customText ?? inputText).trim()
    if (!textToSend || isTyping) return

    setInputText('')
    addMessage(makeMsg('user', textToSend))

    const loadingId = uuidv4()
    addMessage({ id: loadingId, role: 'assistant', content: '', timestamp: new Date().toISOString(), isLoading: true })
    setIsTyping(true)

    // Build memory history from all preceding valid messages
    const history = messages
      .filter((m) => !m.isLoading && m.content?.trim())
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
      .slice(-10)

    try {
      const res = await sendChatMessage({
        text: textToSend,
        userId: user?.id || userId,
        sessionId,
        scenario: activeScenario,
        history,
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
    } catch {
      toast.error('Error de conexión con el servidor. Intenta de nuevo.')
      updateMessage(loadingId, {
        content: "I apologize, our Oxford line seemed to disconnect for a moment. Please click below to send your message again!",
        isLoading: false,
      })
    } finally {
      setIsTyping(false)
      setTimeout(() => scrollToBottom(), 100)
    }
  }, [inputText, isTyping, messages, user?.id, userId, sessionId, activeScenario, addMessage, updateMessage, setIsTyping, setSessionId, scrollToBottom])

  // ── Send audio message with Full Memory ─────────────────────────────────────
  const handleVoiceStop = useCallback(async () => {
    const blob = await stopRecording()
    if (!blob) return

    const loadingId = uuidv4()
    addMessage(makeMsg('user', '🎙️ [Nota de voz enviada...]'))
    addMessage({ id: loadingId, role: 'assistant', content: '', timestamp: new Date().toISOString(), isLoading: true })
    setIsTyping(true)

    const history = messages
      .filter((m) => !m.isLoading && m.content?.trim())
      .map((m) => ({ role: m.role as 'user' | 'assistant', content: m.content }))
      .slice(-10)

    try {
      const res = await sendAudioMessage(blob, user?.id || userId, sessionId, activeScenario, history)
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
      setTimeout(() => scrollToBottom(), 100)
    }
  }, [stopRecording, messages, user?.id, userId, sessionId, activeScenario, addMessage, updateMessage, setIsTyping, setSessionId, scrollToBottom])

  const activeChat = sessions.find((s) => s.id === activeSessionId)

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      {/* Top Actions Bar: Multi-Chat & Scenarios */}
      <div className="px-3 sm:px-4 py-2 bg-white/95 dark:bg-slate-900/95 border-b border-slate-200 dark:border-white/10 backdrop-blur-xl flex flex-col gap-2 shrink-0 z-10 shadow-sm">
        <div className="flex items-center justify-between gap-2">
          {/* Multi-Chat Controls */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                createNewSession(activeScenario)
                toast.success('¡Nuevo chat creado!')
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-sm transition-all active:scale-95"
              title="Iniciar una conversación nueva con Mr. Davies"
            >
              <PlusCircle size={14} />
              <span>Nuevo Chat</span>
            </button>

            <button
              onClick={() => setShowHistoryModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all active:scale-95"
              title="Ver todas tus conversaciones guardadas"
            >
              <History size={14} className="text-brand-600 dark:text-brand-400" />
              <span>Mis Chats ({sessions.length})</span>
            </button>
          </div>

          {/* Current Chat Title badge */}
          <div className="text-right hidden sm:block">
            <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block truncate max-w-[200px]">
              {activeChat?.title || 'Conversación'}
            </span>
          </div>
        </div>

        {/* Scenarios Carousel */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
          {SCENARIOS.map(({ id, label, icon: Icon }) => {
            const active = activeScenario === id
            return (
              <button
                key={id}
                onClick={() => handleSelectScenario(id as ScenarioType)}
                className={clsx(
                  'flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all duration-200',
                  active
                    ? 'bg-brand-600 text-white shadow-sm shadow-brand-500/20'
                    : 'bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                <Icon size={12} />
                <span>{label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Message List (Scrollable with min-h-0 so it shrinks properly) */}
      <div
        ref={listRef}
        onScroll={(e) => {
          const el = e.currentTarget
          setShowScrollBtn(el.scrollHeight - el.scrollTop - el.clientHeight > 150)
        }}
        className="flex-1 overflow-y-auto px-3 sm:px-4 py-4 space-y-4 scroll-smooth min-h-0"
      >
        {messages.map((m) => (
          <MessageBubble key={m.id} message={m} />
        ))}
        <div ref={bottomRef} className="h-2" />
      </div>

      {/* Suggested Quick Replies */}
      {activeSuggestions.length > 0 && !isTyping && (
        <div className="px-3 sm:px-4 py-1.5 bg-slate-100/95 dark:bg-slate-900/90 border-t border-b border-slate-200 dark:border-white/10 overflow-x-auto scrollbar-hide flex items-center gap-2 shrink-0">
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-700 dark:text-brand-300 shrink-0 flex items-center gap-1">
            <Sparkles size={12} className="text-brand-600 dark:text-brand-400" /> Sugerencias:
          </span>
          {activeSuggestions.map((sug, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(sug.text)}
              className="px-3 py-1.5 rounded-xl text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-brand-500 dark:hover:border-brand-400 text-slate-800 dark:text-slate-100 shadow-sm whitespace-nowrap transition-all text-left group active:scale-95"
              title={sug.hint}
            >
              <span className="font-semibold block text-slate-900 dark:text-white">{sug.text}</span>
              {sug.hint && <span className="block text-[10px] text-slate-500 dark:text-slate-400 font-medium">{sug.hint}</span>}
            </button>
          ))}
        </div>
      )}

      {/* Correction Popover (Scrollable inside, never cuts off buttons or chat) */}
      {activeCorrection && (
        <div className="px-2 sm:px-4 pb-1 shrink-0 z-20">
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
          className="absolute bottom-20 right-5 p-2 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xl text-brand-600 dark:text-brand-400 hover:scale-105 transition-transform z-20"
        >
          <ChevronDown size={18} />
        </button>
      )}

      {/* History / Multi-Chat Modal */}
      {showHistoryModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">
            <div className="p-4 bg-slate-50 dark:bg-slate-850 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <History size={18} className="text-brand-600 dark:text-brand-400" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">Tus Conversaciones</h3>
              </div>
              <button
                onClick={() => setShowHistoryModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Chats list */}
            <div className="p-4 overflow-y-auto space-y-2.5 flex-1 min-h-0">
              {sessions.map((sess) => {
                const isActive = sess.id === activeSessionId
                const msgCount = sess.messages.length
                return (
                  <div
                    key={sess.id}
                    className={clsx(
                      'p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 group',
                      isActive
                        ? 'bg-brand-50/90 dark:bg-brand-950/40 border-brand-300 dark:border-brand-700 shadow-sm'
                        : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 hover:border-brand-300'
                    )}
                  >
                    <button
                      onClick={() => {
                        switchSession(sess.id)
                        setShowHistoryModal(false)
                        toast.success(`Chat activo: ${sess.title}`)
                      }}
                      className="flex-1 text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-sm text-slate-900 dark:text-white truncate">
                          {sess.title}
                        </span>
                        {isActive && (
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-brand-500 text-white rounded-full flex items-center gap-1">
                            <Check size={10} /> Actual
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <span>{msgCount} {msgCount === 1 ? 'mensaje' : 'mensajes'}</span>
                        <span>•</span>
                        <span>{new Date(sess.updatedAt).toLocaleDateString([], { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                      </div>
                    </button>

                    {sessions.length > 1 && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          if (confirm('¿Eliminar esta conversación?')) {
                            deleteSession(sess.id)
                            toast('Chat eliminado')
                          }
                        }}
                        className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                        title="Eliminar conversación"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                )
              })}
            </div>

            {/* Modal footer */}
            <div className="p-4 bg-slate-50 dark:bg-slate-850 border-t border-slate-200 dark:border-white/10 flex items-center justify-between">
              <button
                onClick={() => {
                  createNewSession(activeScenario)
                  setShowHistoryModal(false)
                  toast.success('¡Nuevo chat iniciado!')
                }}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition-all"
              >
                <PlusCircle size={15} />
                <span>Crear nuevo chat</span>
              </button>

              <button
                onClick={() => setShowHistoryModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
