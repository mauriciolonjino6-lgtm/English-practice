import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, CheckCircle2, Play, Award, ChevronRight, Trophy } from 'lucide-react'
import { clsx } from 'clsx'
import { CURRICULUM_A2, FINAL_A2_EXAM, type Lesson, type Exam, type Unit } from '@/data/curriculumA2'
import { useAppStore } from '@/store/useAppStore'
import LessonPlayer from './LessonPlayer'
import ExamModal from './ExamModal'

export default function CurriculumModule() {
  const { levelProgress } = useAppStore()
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
  const [activeExam, setActiveExam] = useState<Exam | null>(null)

  // Calculate global A2 progress
  const allA2Lessons = CURRICULUM_A2.flatMap((u) => u.lessons)
  const completedA2Count = allA2Lessons.filter((l) => levelProgress.completedLessons.includes(l.id)).length
  const totalLessons = allA2Lessons.length
  const progressPercent = Math.round((completedA2Count / totalLessons) * 100)
  const hasPassedFinal = levelProgress.passedExams.includes(FINAL_A2_EXAM.id)

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4 sm:p-6 pb-24 max-w-3xl mx-auto space-y-6">
      {/* Header Level Banner */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-indigo-700 to-purple-800 p-6 text-white shadow-xl"
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap size={15} />
              Ruta Estructurada • Nivel A2 (Pre-Intermedio)
            </span>
            <div className="flex items-center gap-1 text-amber-300 font-extrabold text-xs">
              <Trophy size={14} />
              <span>{levelProgress.passedExams.length} Certificados</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            Aprende Inglés Paso a Paso
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-lg leading-relaxed">
            Metodología Communicative Language Teaching (CLT) con ejercicios interactivos de comprensión auditiva, expresión oral y gramática real en contexto británico.
          </p>

          {/* Progress Bar inside Banner */}
          <div className="mt-5 bg-white/10 p-3.5 rounded-2xl backdrop-blur-md border border-white/10">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span>Progreso del Nivel A2</span>
              <span>{completedA2Count} de {totalLessons} lecciones ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-black/20 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-8 -bottom-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
      </motion.div>

      {/* Units List */}
      <div className="space-y-6">
        {CURRICULUM_A2.map((unit: Unit) => {
          const unitCompletedCount = unit.lessons.filter((l) => levelProgress.completedLessons.includes(l.id)).length
          const unitExamPassed = levelProgress.passedExams.includes(unit.exam.id)

          return (
            <motion.div
              key={unit.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/10 rounded-3xl p-5 sm:p-6 shadow-sm space-y-4"
            >
              {/* Unit Header */}
              <div className="flex items-start justify-between gap-3">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-wider text-brand-600 dark:text-brand-400">
                    Unidad {unit.unitNumber} • {unit.topic}
                  </span>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white mt-0.5">
                    {unit.title}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {unit.description}
                  </p>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
                    {unitCompletedCount}/{unit.lessons.length}
                  </span>
                </div>
              </div>

              {/* Lessons Grid */}
              <div className="grid grid-cols-1 gap-2.5">
                {unit.lessons.map((lesson) => {
                  const isCompleted = levelProgress.completedLessons.includes(lesson.id)
                  const score = levelProgress.lessonScores[lesson.id]

                  return (
                    <button
                      key={lesson.id}
                      onClick={() => setActiveLesson(lesson)}
                      className={clsx(
                        'p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3 group',
                        isCompleted
                          ? 'border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 hover:border-emerald-300'
                          : 'border-slate-200 dark:border-white/10 bg-slate-50/50 dark:bg-slate-800/40 hover:border-brand-400 hover:bg-brand-50/20 dark:hover:bg-slate-800'
                      )}
                    >
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className={clsx(
                          'w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm',
                          isCompleted
                            ? 'bg-emerald-500 text-white'
                            : 'bg-brand-600 text-white group-hover:scale-105 transition-transform'
                        )}>
                          {isCompleted ? <CheckCircle2 size={20} /> : <Play size={18} fill="currentColor" />}
                        </div>

                        <div className="truncate">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                              {lesson.title}
                            </span>
                            {lesson.type === 'listening' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                                🎧 Escuchar
                              </span>
                            )}
                            {lesson.type === 'speaking' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                                🗣️ Hablar
                              </span>
                            )}
                            {lesson.type === 'grammar' && (
                              <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                                ✏️ Gramática
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {lesson.description} • {lesson.durationMinutes} min
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        {isCompleted && score !== undefined && (
                          <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">
                            {score}%
                          </span>
                        )}
                        <ChevronRight size={18} className="text-slate-400 group-hover:text-brand-500 transition-colors" />
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Unit Exam Card */}
              <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                <button
                  onClick={() => setActiveExam(unit.exam)}
                  className={clsx(
                    'w-full p-4 rounded-2xl border text-left transition-all flex items-center justify-between gap-3',
                    unitExamPassed
                      ? 'bg-amber-500/10 border-amber-400/40 text-amber-900 dark:text-amber-200'
                      : 'bg-gradient-to-r from-amber-500/15 to-orange-500/15 border-amber-300 dark:border-amber-700 hover:border-amber-400'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Award size={22} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          {unit.exam.title}
                        </span>
                        {unitExamPassed && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">
                            Aprobado
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300">
                        {unit.exam.description} (Puntaje mínimo: {unit.exam.passingScore}%)
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400 shrink-0">
                    {unitExamPassed ? 'Repetir Examen' : 'Presentar Examen'} →
                  </span>
                </button>
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Final Level Certification Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-2xl relative overflow-hidden text-center space-y-4"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
          <GraduationCap size={36} />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-black uppercase tracking-wider inline-block mb-1">
            Evaluación Periódica Final
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            Examen Integral de Certificación A2
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-md mx-auto mt-1">
            Valida tus conocimientos completos de nivel A2 con el examen de Oxford para desbloquear el Nivel B1.
          </p>
        </div>

        {hasPassedFinal ? (
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl max-w-sm mx-auto border border-white/20">
            <p className="text-xs font-bold text-white uppercase flex items-center justify-center gap-1.5">
              <Award size={16} /> ¡Certificado A2 Obtenido con Éxito!
            </p>
            <p className="text-[11px] text-amber-100 mt-1">
              Felicidades, has completado y certificado este nivel.
            </p>
          </div>
        ) : null}

        <button
          onClick={() => setActiveExam(FINAL_A2_EXAM)}
          className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-amber-50 transition-all active:scale-98 inline-flex items-center gap-2"
        >
          <Award size={18} className="text-amber-600" />
          <span>{hasPassedFinal ? 'Volver a presentar examen' : 'Presentar Examen de Certificación A2'}</span>
        </button>
      </motion.div>

      {/* Active Modals */}
      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={() => {
            // Modal shows completion internally
          }}
        />
      )}

      {activeExam && (
        <ExamModal
          exam={activeExam}
          onClose={() => setActiveExam(null)}
          onComplete={() => {
            // Modal shows result internally
          }}
        />
      )}
    </div>
  )
}

