import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, Mic, MicOff, CheckCircle2, XCircle, ChevronRight, RotateCcw, Award, X, Lightbulb } from 'lucide-react'
import { clsx } from 'clsx'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { useAppStore } from '@/store/useAppStore'
import type { Lesson, ExerciseItem } from '@/data/curriculumA2'

interface Props {
  lesson: Lesson
  onClose: () => void
  onComplete: (score: number) => void
}

export default function LessonPlayer({ lesson, onClose, onComplete }: Props) {
  const { speak } = useSpeechSynthesis()
  const { completeLesson } = useAppStore()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [isListeningSpeech, setIsListeningSpeech] = useState(false)
  const [spokenText, setSpokenText] = useState('')
  const [hasChecked, setHasChecked] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [isFinished, setIsFinished] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)

  const currentExercise: ExerciseItem | undefined = lesson.exercises[currentIndex]
  const progressPercent = Math.round(((currentIndex) / lesson.exercises.length) * 100)

  // Speech Recognition setup
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      setSpeechSupported(false)
    }
  }, [])

  // Auto-play listening audio when a listening exercise loads
  useEffect(() => {
    if (currentExercise?.type === 'listening' && currentExercise.audioText) {
      speak(currentExercise.audioText)
    }
    // Reset state for new exercise
    setSelectedOption(null)
    setSelectedWords([])
    setSpokenText('')
    setHasChecked(false)
    setIsCorrect(false)
  }, [currentIndex, currentExercise])

  const handleSpeechInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    if (!SpeechRecognition) {
      // Fallback
      setSpokenText(currentExercise?.correctAnswer || '')
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognition.lang = 'en-GB'
      recognition.interimResults = false
      recognition.maxAlternatives = 1

      recognition.onstart = () => setIsListeningSpeech(true)
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript
        setSpokenText(transcript)
        setIsListeningSpeech(false)
      }
      recognition.onerror = () => setIsListeningSpeech(false)
      recognition.onend = () => setIsListeningSpeech(false)

      recognition.start()
    } catch {
      setIsListeningSpeech(false)
    }
  }

  const checkAnswer = () => {
    if (!currentExercise) return

    let userIsCorrect = false
    if (currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening' || currentExercise.type === 'fill-blank') {
      userIsCorrect = selectedOption?.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase()
    } else if (currentExercise.type === 'sentence-order') {
      const built = selectedWords.join(' ').trim().toLowerCase()
      const target = currentExercise.correctAnswer.trim().toLowerCase()
      userIsCorrect = built === target || built.replace(/[^a-z0-9 ]/g, '') === target.replace(/[^a-z0-9 ]/g, '')
    } else if (currentExercise.type === 'speaking') {
      const cleanSpoken = spokenText.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '')
      const cleanTarget = currentExercise.correctAnswer.trim().toLowerCase().replace(/[^a-z0-9 ]/g, '')
      // lenient similarity for speaking
      userIsCorrect = cleanSpoken.includes(cleanTarget) || cleanTarget.includes(cleanSpoken) || cleanSpoken.length > 5
    }

    setIsCorrect(userIsCorrect)
    setHasChecked(true)
    if (userIsCorrect) {
      setCorrectCount((prev) => prev + 1)
    }
  }

  const handleNext = () => {
    if (currentIndex + 1 < lesson.exercises.length) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      const finalScore = Math.round(((correctCount + (isCorrect ? 1 : 0)) / lesson.exercises.length) * 100)
      completeLesson(lesson.id, finalScore)
      setIsFinished(true)
      onComplete(finalScore)
    }
  }

  if (isFinished) {
    const finalScore = Math.round((correctCount / lesson.exercises.length) * 100)
    return (
      <div className="fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-md w-full text-center shadow-2xl relative overflow-hidden"
        >
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white shadow-lg mb-4">
            <Award size={42} />
          </div>

          <span className="inline-block px-3 py-1 rounded-full bg-brand-50 dark:bg-brand-950/60 text-brand-600 dark:text-brand-300 text-xs font-bold uppercase tracking-wider mb-2">
            ¡Lección Completada!
          </span>

          <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
            {lesson.title}
          </h2>

          <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
            Has ganado <strong className="text-amber-500 font-extrabold">+25 XP</strong> y reforzado tus habilidades comunicativas británicas con el profesor Davies.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Puntuación</p>
              <p className="text-2xl font-black text-brand-600 dark:text-brand-400">{finalScore}%</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase">Aciertos</p>
              <p className="text-2xl font-black text-emerald-500">{correctCount} / {lesson.exercises.length}</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-bold hover:shadow-lg hover:shadow-brand-500/25 transition-all active:scale-98"
          >
            Continuar en la Ruta A2
          </button>
        </motion.div>
      </div>
    )
  }

  if (!currentExercise) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          title="Salir"
        >
          <X size={20} />
        </button>

        {/* Progress Bar */}
        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
            <span>{lesson.unitTitle} • {lesson.title}</span>
            <span>{currentIndex + 1} / {lesson.exercises.length}</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-brand-500 to-indigo-500 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      </div>

      {/* Main Exercise Card Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          {/* Badge & Type */}
          <div className="flex items-center justify-between">
            <span className={clsx(
              'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider',
              currentExercise.type === 'listening' && 'bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300',
              currentExercise.type === 'speaking' && 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300',
              currentExercise.type === 'fill-blank' && 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300',
              currentExercise.type === 'sentence-order' && 'bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300',
              currentExercise.type === 'multiple-choice' && 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300'
            )}>
              {currentExercise.type === 'listening' && 'Comprensión Auditiva'}
              {currentExercise.type === 'speaking' && 'Expresión Oral'}
              {currentExercise.type === 'fill-blank' && 'Completar Espacio'}
              {currentExercise.type === 'sentence-order' && 'Ordenar la Oración'}
              {currentExercise.type === 'multiple-choice' && 'Opción Múltiple'}
            </span>

            {currentExercise.hint && (
              <span className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                <Lightbulb size={13} className="text-amber-400" /> Pista disponible
              </span>
            )}
          </div>

          {/* Instruction */}
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentExercise.instruction}
          </h3>

          {/* Prompt / Audio Box */}
          {currentExercise.type === 'listening' && (
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold uppercase mb-1">Audio del Profesor Davies</p>
                <p className="text-sm text-slate-800 dark:text-slate-200 italic">"Haz clic en el botón para escuchar la pronunciación británica..."</p>
              </div>
              <button
                type="button"
                onClick={() => speak(currentExercise.audioText || currentExercise.prompt)}
                className="w-12 h-12 rounded-2xl bg-brand-600 text-white flex items-center justify-center hover:bg-brand-500 transition-colors shadow-md active:scale-95 shrink-0"
                title="Escuchar audio"
              >
                <Volume2 size={22} />
              </button>
            </div>
          )}

          {currentExercise.type !== 'listening' && (
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5">
              <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
                {currentExercise.prompt}
              </p>
            </div>
          )}

          {/* Exercise Specific Controls */}
          {/* 1. Multiple Choice / Listening Options */}
          {(currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening' || currentExercise.type === 'fill-blank') && currentExercise.options && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentExercise.options.map((option) => {
                const isSelected = selectedOption === option
                return (
                  <button
                    key={option}
                    disabled={hasChecked}
                    onClick={() => setSelectedOption(option)}
                    className={clsx(
                      'p-3.5 rounded-2xl border text-sm sm:text-base font-semibold text-left transition-all',
                      isSelected
                        ? 'border-brand-500 bg-brand-500/15 text-brand-600 dark:text-brand-300 shadow-sm'
                        : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/50'
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          )}

          {/* 2. Speaking Exercise */}
          {currentExercise.type === 'speaking' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-3 rounded-2xl border border-slate-200 dark:border-white/5">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">Escuchar modelo nativo:</span>
                <button
                  type="button"
                  onClick={() => speak(currentExercise.audioText || currentExercise.correctAnswer)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 text-xs font-bold hover:bg-brand-200 transition-colors"
                >
                  <Volume2 size={16} />
                  <span>Escuchar</span>
                </button>
              </div>

              <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-200 dark:border-white/10 rounded-2xl text-center space-y-3">
                <button
                  type="button"
                  disabled={hasChecked}
                  onClick={handleSpeechInput}
                  className={clsx(
                    'w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg transition-all active:scale-95',
                    isListeningSpeech
                      ? 'bg-rose-500 animate-pulse'
                      : 'bg-emerald-600 hover:bg-emerald-500'
                  )}
                >
                  {isListeningSpeech ? <MicOff size={28} /> : <Mic size={28} />}
                </button>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {isListeningSpeech ? 'Escuchando tu voz...' : 'Toca el micrófono y pronuncia la frase en voz alta'}
                </p>

                {spokenText && (
                  <div className="mt-2 p-2.5 rounded-xl bg-brand-50 dark:bg-brand-950/40 border border-brand-200 dark:border-brand-800/40 text-xs text-slate-800 dark:text-slate-200 w-full text-center">
                    <strong>Dijiste:</strong> "{spokenText}"
                  </div>
                )}

                {!speechSupported && (
                  <button
                    type="button"
                    onClick={() => setSpokenText(currentExercise.correctAnswer)}
                    className="text-xs text-brand-500 underline mt-1"
                  >
                    Simular pronunciación correcta
                  </button>
                )}
              </div>
            </div>
          )}

          {/* 3. Sentence Order Exercise */}
          {currentExercise.type === 'sentence-order' && currentExercise.options && (
            <div className="space-y-4">
              {/* Selected Words Tray */}
              <div className="min-h-[56px] p-3 rounded-2xl border-2 border-dashed border-brand-300 dark:border-brand-700 bg-brand-50/50 dark:bg-brand-950/20 flex flex-wrap gap-2 items-center">
                {selectedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Toca las palabras abajo en el orden correcto...</span>
                ) : (
                  selectedWords.map((word, idx) => (
                    <button
                      key={`${word}-${idx}`}
                      disabled={hasChecked}
                      onClick={() => setSelectedWords((prev) => prev.filter((_, i) => i !== idx))}
                      className="px-3 py-1.5 rounded-xl bg-brand-600 text-white text-sm font-semibold shadow-sm hover:bg-brand-700 transition-colors"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              {/* Available Words */}
              <div className="flex flex-wrap gap-2">
                {currentExercise.options.map((word, idx) => {
                  const isUsed = selectedWords.includes(word)
                  return (
                    <button
                      key={`${word}-${idx}`}
                      disabled={hasChecked || isUsed}
                      onClick={() => setSelectedWords((prev) => [...prev, word])}
                      className={clsx(
                        'px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all',
                        isUsed
                          ? 'opacity-30 border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-800'
                          : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-brand-400'
                      )}
                    >
                      {word}
                    </button>
                  )
                })}
              </div>

              {selectedWords.length > 0 && !hasChecked && (
                <button
                  type="button"
                  onClick={() => setSelectedWords([])}
                  className="text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 flex items-center gap-1"
                >
                  <RotateCcw size={13} /> Reiniciar palabras
                </button>
              )}
            </div>
          )}

          {/* Hint Card */}
          {currentExercise.hint && !hasChecked && (
            <p className="text-xs text-slate-500 dark:text-slate-400 italic bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
              <strong>Pista del profesor:</strong> {currentExercise.hint}
            </p>
          )}

          {/* Feedback Card (Post-Check) */}
          <AnimatePresence>
            {hasChecked && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={clsx(
                  'p-4 rounded-2xl border text-sm',
                  isCorrect
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-700 text-emerald-900 dark:text-emerald-100'
                    : 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-700 text-rose-900 dark:text-rose-100'
                )}
              >
                <div className="flex items-center gap-2 font-bold mb-1">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 size={18} className="text-emerald-600 dark:text-emerald-400" />
                      <span>¡Brillante! Respuesta correcta</span>
                    </>
                  ) : (
                    <>
                      <XCircle size={18} className="text-rose-600 dark:text-rose-400" />
                      <span>Respuesta incorrecta</span>
                    </>
                  )}
                </div>

                {!isCorrect && (
                  <p className="text-xs mb-1">
                    <strong>Respuesta correcta:</strong> "{currentExercise.correctAnswer}"
                  </p>
                )}

                <p className="text-xs opacity-90 mt-1 leading-relaxed">
                  <strong>Explicación:</strong> {currentExercise.explanation}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="p-4 bg-white/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-white/10 max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
        >
          Abandonar lección
        </button>

        {!hasChecked ? (
          <button
            type="button"
            onClick={checkAnswer}
            disabled={
              (currentExercise.type === 'multiple-choice' || currentExercise.type === 'listening' || currentExercise.type === 'fill-blank') && !selectedOption ||
              currentExercise.type === 'sentence-order' && selectedWords.length === 0 ||
              currentExercise.type === 'speaking' && !spokenText
            }
            className="px-6 py-3 rounded-2xl bg-brand-600 text-white font-bold text-sm shadow-md hover:bg-brand-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Comprobar respuesta</span>
            <ChevronRight size={16} />
          </button>
        ) : (
          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold text-sm shadow-md hover:opacity-95 transition-all active:scale-95 flex items-center gap-2"
          >
            <span>Continuar</span>
            <ChevronRight size={16} />
          </button>
        )}
      </div>
    </div>
  )
}

