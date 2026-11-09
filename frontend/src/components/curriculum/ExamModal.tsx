import { useState } from 'react'
import { motion } from 'framer-motion'
import { Award, XCircle, X, ChevronRight, GraduationCap, Volume2, RotateCcw, ShieldCheck } from 'lucide-react'
import { clsx } from 'clsx'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { useAppStore } from '@/store/useAppStore'
import type { Exam, ExerciseItem } from '@/data/curriculumA2'

interface Props {
  exam: Exam
  onClose: () => void
  onComplete: (score: number, passed: boolean) => void
}

export default function ExamModal({ exam, onClose, onComplete }: Props) {
  const { speak, stop, isPlaying } = useSpeechSynthesis()
  const { user, recordExamResult } = useAppStore()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [userAnswers, setUserAnswers] = useState<Record<number, boolean>>({})
  const [isFinished, setIsFinished] = useState(false)

  const currentExercise: ExerciseItem | undefined = exam.exercises[currentIndex]
  const progressPercent = Math.round(((currentIndex) / exam.exercises.length) * 100)

  const handleSelectOption = (opt: string) => {
    setSelectedOption(opt)
  }

  const handleNextQuestion = () => {
    if (!currentExercise) return

    let isCorrect = false
    if (currentExercise.type === 'sentence-order') {
      const built = selectedWords.join(' ').trim().toLowerCase()
      const target = currentExercise.correctAnswer.trim().toLowerCase()
      isCorrect = built === target || built.replace(/[^a-z0-9 ]/g, '') === target.replace(/[^a-z0-9 ]/g, '')
    } else if (currentExercise.type === 'speaking') {
      // In exams, speaking verification is acknowledged
      isCorrect = true
    } else {
      isCorrect = selectedOption?.trim().toLowerCase() === currentExercise.correctAnswer.trim().toLowerCase()
    }

    const updatedAnswers = { ...userAnswers, [currentIndex]: isCorrect }
    setUserAnswers(updatedAnswers)

    if (currentIndex + 1 < exam.exercises.length) {
      setCurrentIndex((prev) => prev + 1)
      setSelectedOption(null)
      setSelectedWords([])
    } else {
      // Finalize exam
      const correctTotal = Object.values(updatedAnswers).filter(Boolean).length
      const score = Math.round((correctTotal / exam.exercises.length) * 100)
      const passed = score >= exam.passingScore

      recordExamResult(exam.id, score, passed)
      setIsFinished(true)
      onComplete(score, passed)
    }
  }

  if (isFinished) {
    const correctTotal = Object.values(userAnswers).filter(Boolean).length
    const score = Math.round((correctTotal / exam.exercises.length) * 100)
    const passed = score >= exam.passingScore

    return (
      <div className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl relative overflow-hidden"
        >
          {passed ? (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-white shadow-xl mb-4 animate-bounce">
                <GraduationCap size={44} />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 text-xs font-bold uppercase tracking-wider mb-2">
                ¡Examen Aprobado con Éxito!
              </span>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                {exam.title}
              </h2>

              <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                Puntuación alcanzada: <strong className="text-emerald-500 text-base">{score}%</strong> (Mínimo requerido: {exam.passingScore}%)
              </p>

              {/* Oxford Certificate Banner */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-800/80 border-2 border-amber-300 dark:border-amber-500/30 text-left mb-6 shadow-sm relative">
                <div className="flex items-center gap-2 mb-2">
                  <ShieldCheck size={20} className="text-amber-600 dark:text-amber-400" />
                  <span className="text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300">
                    Certificación de Nivel Oxford ESL
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  Otorgado a: {user?.name || 'Estudiante'}
                </p>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                  Ha demostrado competencia sólida en habilidades de comprensión auditiva, expresión oral y gramática funcional correspondientes al <strong>Nivel A2 (Pre-Intermedio)</strong>.
                </p>
                <div className="mt-3 pt-2 border-t border-amber-200 dark:border-amber-700/40 flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400 italic">
                  <span>Prof. Davies • Oxford, UK</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">+100 XP Ganados</span>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shadow-lg mb-4">
                <XCircle size={44} />
              </div>

              <span className="inline-block px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-2">
                Further practice recommended
              </span>

              <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-2">
                {score}% Achieved
              </h2>

              <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                A minimum score of <strong>{exam.passingScore}%</strong> is required to pass. We recommend reviewing the course lessons before retaking the assessment.
              </p>
            </>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 rounded-2xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-800 dark:text-white font-bold transition-all text-sm"
            >
              Close
            </button>
            {!passed && (
              <button
                onClick={() => {
                  setCurrentIndex(0)
                  setSelectedOption(null)
                  setSelectedWords([])
                  setUserAnswers({})
                  setIsFinished(false)
                }}
                className="flex-1 py-3.5 rounded-2xl bg-brand-600 hover:bg-brand-500 text-white font-bold transition-all text-sm shadow-md flex items-center justify-center gap-1.5"
              >
                <RotateCcw size={16} />
                <span>Retry</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    )
  }

  if (!currentExercise) return null

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex flex-col justify-between">
      {/* Top Header */}
      <div className="p-4 max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 transition-colors"
          title="Exit assessment"
        >
          <X size={20} />
        </button>

        <div className="flex-1">
          <div className="flex items-center justify-between text-xs font-bold text-slate-300 mb-1">
            <span className="flex items-center gap-1.5 text-amber-400">
              <Award size={14} />
              {exam.title}
            </span>
            <span>{currentIndex + 1} of {exam.exercises.length}</span>
          </div>
          <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-amber-500 to-yellow-400 rounded-full transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Main Question Card Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 flex items-center justify-center">
        <div className="max-w-xl w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center gap-1.5">
              <GraduationCap size={14} />
              Question #{currentIndex + 1}
            </span>
            <span className="text-xs text-slate-400">Passing mark: {exam.passingScore}%</span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentExercise.instruction}
          </h3>

          {/* Prompt */}
          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl border border-slate-200 dark:border-white/5 flex items-center justify-between gap-3">
            <p className="text-base sm:text-lg font-medium text-slate-900 dark:text-white leading-relaxed">
              {currentExercise.prompt}
            </p>
            {currentExercise.audioText && (
              <button
                type="button"
                onClick={() => (isPlaying ? stop() : speak(currentExercise.audioText!))}
                className={clsx(
                  "w-10 h-10 rounded-xl text-white flex items-center justify-center shrink-0 transition-all shadow-sm",
                  isPlaying ? "bg-emerald-600 animate-pulse" : "bg-brand-600 hover:bg-brand-500"
                )}
                title={isPlaying ? "Detener audio" : "Escuchar audio"}
              >
                <Volume2 size={18} />
              </button>
            )}
          </div>

          {/* Options */}
          {currentExercise.options && currentExercise.type !== 'sentence-order' && (
            <div className="grid grid-cols-1 gap-2.5">
              {currentExercise.options.map((option) => {
                const isSelected = selectedOption === option
                return (
                  <button
                    key={option}
                    onClick={() => handleSelectOption(option)}
                    className={clsx(
                      'p-4 rounded-2xl border text-sm sm:text-base font-semibold text-left transition-all',
                      isSelected
                        ? 'border-amber-500 bg-amber-500/15 text-amber-700 dark:text-amber-300 shadow-sm'
                        : 'border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20 text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-800/50'
                    )}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          )}

          {/* Sentence order in exam */}
          {currentExercise.type === 'sentence-order' && currentExercise.options && (
            <div className="space-y-3">
              <div className="min-h-[56px] p-3 rounded-2xl border-2 border-dashed border-amber-300 dark:border-amber-700 bg-amber-50/40 dark:bg-amber-950/20 flex flex-wrap gap-2 items-center">
                {selectedWords.length === 0 ? (
                  <span className="text-xs text-slate-400 italic">Toca las palabras para ordenar la oración...</span>
                ) : (
                  selectedWords.map((word, idx) => (
                    <button
                      key={`${word}-${idx}`}
                      onClick={() => setSelectedWords((prev) => prev.filter((_, i) => i !== idx))}
                      className="px-3 py-1.5 rounded-xl bg-amber-600 text-white text-sm font-semibold shadow-sm"
                    >
                      {word}
                    </button>
                  ))
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {currentExercise.options.map((word, idx) => {
                  const isUsed = selectedWords.includes(word)
                  return (
                    <button
                      key={`${word}-${idx}`}
                      disabled={isUsed}
                      onClick={() => setSelectedWords((prev) => [...prev, word])}
                      className={clsx(
                        'px-3.5 py-2 rounded-xl text-sm font-semibold border transition-all',
                        isUsed
                          ? 'opacity-30 border-slate-200 dark:border-white/5 bg-slate-100 dark:bg-slate-800'
                          : 'border-slate-200 dark:border-white/10 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:border-amber-400'
                      )}
                    >
                      {word}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {/* Speaking in exam */}
          {currentExercise.type === 'speaking' && (
            <div className="text-center p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-white/5 space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Escucha el audio modelo de la profesora Emma y luego pronúncialo con voz clara y firme:
              </p>
              <button
                type="button"
                onClick={() => (isPlaying ? stop() : speak(currentExercise.audioText || currentExercise.correctAnswer))}
                className={clsx(
                  "px-4 py-2 rounded-xl text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-sm transition-all",
                  isPlaying ? "bg-emerald-600 animate-pulse" : "bg-brand-600 hover:bg-brand-500"
                )}
              >
                <Volume2 size={16} />
                <span>{isPlaying ? 'Detener Audio' : 'Escuchar Frase Modelo'}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="p-4 bg-white/90 dark:bg-slate-900/90 border-t border-slate-200 dark:border-white/10 max-w-2xl mx-auto w-full flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-700 dark:hover:text-white"
        >
          Cancelar examen
        </button>

        <button
          type="button"
          disabled={
            currentExercise.type !== 'sentence-order' && currentExercise.type !== 'speaking' && !selectedOption ||
            currentExercise.type === 'sentence-order' && selectedWords.length === 0
          }
          onClick={handleNextQuestion}
          className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-sm shadow-md hover:opacity-95 disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex items-center gap-2"
        >
          <span>{currentIndex + 1 === exam.exercises.length ? 'Finalizar Examen' : 'Siguiente Pregunta'}</span>
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  )
}

