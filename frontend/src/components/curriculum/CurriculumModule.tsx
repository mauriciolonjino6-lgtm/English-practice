import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, CheckCircle2, Play, Award, ChevronRight, Trophy, Headphones, Mic, PenTool } from 'lucide-react'
import { clsx } from 'clsx'
import { ALL_LEVELS_DATA, type Lesson, type Exam, type Unit, type CEFRLevel } from '@/data/curriculumA2'
import { useAppStore } from '@/store/useAppStore'
import LessonPlayer from './LessonPlayer'
import ExamModal from './ExamModal'

const LEVELS_LIST: CEFRLevel[] = ['A2', 'B1', 'B2', 'C1', 'C2']

export default function CurriculumModule() {
  const { levelProgress, setCurrentLevel } = useAppStore()
  const [selectedLevel, setSelectedLevel] = useState<CEFRLevel>(levelProgress.currentLevel || 'A2')
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null)
  const [activeExam, setActiveExam] = useState<Exam | null>(null)

  const activeDescriptor = ALL_LEVELS_DATA[selectedLevel] || ALL_LEVELS_DATA['A2']

  // Progress for the currently viewed level
  const allCurrentLessons = activeDescriptor.units.flatMap((u) => u.lessons)
  const completedCount = allCurrentLessons.filter((l) => levelProgress.completedLessons.includes(l.id)).length
  const totalLessons = allCurrentLessons.length
  const progressPercent = totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0
  const hasPassedFinal = levelProgress.passedExams.includes(activeDescriptor.finalExam.id)

  return (
    <div className="h-full overflow-y-auto scrollbar-hide p-4 sm:p-6 pb-24 max-w-3xl mx-auto space-y-6">
      {/* Level Selector Tabs (A2 -> C2) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {LEVELS_LIST.map((lvl) => {
          const isSelected = selectedLevel === lvl
          const isUserCurrent = levelProgress.currentLevel === lvl
          const descriptor = ALL_LEVELS_DATA[lvl]
          const isCertified = levelProgress.passedExams.includes(descriptor.finalExam.id)

          return (
            <button
              key={lvl}
              onClick={() => {
                setSelectedLevel(lvl)
                setCurrentLevel(lvl)
              }}
              className={clsx(
                'flex items-center gap-2 px-4 py-2.5 rounded-2xl border text-xs font-bold transition-all shrink-0 select-none shadow-sm',
                isSelected
                  ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white border-transparent shadow-brand-500/25 scale-[1.02]'
                  : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-white/10 hover:border-brand-400'
              )}
            >
              <span className={clsx(
                'px-1.5 py-0.5 rounded-lg text-[10px] font-black',
                isSelected ? 'bg-white/20 text-white' : 'bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300'
              )}>
                {lvl}
              </span>
              <span>{descriptor.title}</span>
              {isCertified && (
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
              )}
              {isUserCurrent && !isCertified && (
                <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-ping" />
              )}
            </button>
          )
        })}
      </div>

      {/* Header Level Banner */}
      <motion.div
        key={selectedLevel}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className={clsx(
          'relative overflow-hidden rounded-3xl p-6 text-white shadow-xl bg-gradient-to-br',
          activeDescriptor.accentColor
        )}
      >
        <div className="relative z-10">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-black uppercase tracking-wider flex items-center gap-1.5">
              <GraduationCap size={15} />
              {activeDescriptor.title} • {activeDescriptor.subtitle}
            </span>
            <div className="flex items-center gap-1 text-amber-300 font-extrabold text-xs">
              <Trophy size={14} />
              <span>{hasPassedFinal ? 'Certified Level' : 'In Progress'}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black mt-1">
            {activeDescriptor.title}: {activeDescriptor.badgeText}
          </h1>
          <p className="text-xs sm:text-sm text-white/90 mt-1 max-w-lg leading-relaxed">
            {activeDescriptor.description}
          </p>

          {/* Progress Bar inside Banner */}
          <div className="mt-5 bg-white/15 p-3.5 rounded-2xl backdrop-blur-md border border-white/15">
            <div className="flex items-center justify-between text-xs font-bold mb-1.5">
              <span>{activeDescriptor.title} Progress</span>
              <span>{completedCount} of {totalLessons} lessons ({progressPercent}%)</span>
            </div>
            <div className="w-full h-3 bg-black/25 rounded-full overflow-hidden">
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
        {activeDescriptor.units.map((unit: Unit) => {
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
                    Unit {unit.unitNumber} • {unit.topic}
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
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300">
                                <Headphones className="w-2.5 h-2.5" /> Listening
                              </span>
                            )}
                            {lesson.type === 'speaking' && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300">
                                <Mic className="w-2.5 h-2.5" /> Speaking
                              </span>
                            )}
                            {lesson.type === 'grammar' && (
                              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
                                <PenTool className="w-2.5 h-2.5" /> Grammar
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
                        {unit.exam.description} (Pass mark: {unit.exam.passingScore}%)
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
        key={`exam-${selectedLevel}`}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white shadow-2xl relative overflow-hidden text-center space-y-4"
      >
        <div className="w-16 h-16 mx-auto rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
          <GraduationCap size={36} />
        </div>

        <div>
          <span className="px-3 py-1 rounded-full bg-black/20 text-xs font-black uppercase tracking-wider inline-block mb-1">
            Evaluación Periódica • {activeDescriptor.title}
          </span>
          <h2 className="text-2xl sm:text-3xl font-black">
            {activeDescriptor.finalExam.title}
          </h2>
          <p className="text-xs sm:text-sm text-amber-100 max-w-md mx-auto mt-1">
            {activeDescriptor.finalExam.description}
          </p>
        </div>

        {hasPassedFinal ? (
          <div className="bg-white/20 backdrop-blur-md p-4 rounded-2xl max-w-sm mx-auto border border-white/20">
            <p className="text-xs font-bold text-white uppercase flex items-center justify-center gap-1.5">
              <Award size={16} /> ¡Certificado {selectedLevel} Obtenido!
            </p>
            <p className="text-[11px] text-amber-100 mt-1">
              Congratulations! You have demonstrated verified Oxford proficiency at this level.
            </p>
          </div>
        ) : null}

        <button
          onClick={() => setActiveExam(activeDescriptor.finalExam)}
          className="px-8 py-4 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-amber-50 transition-all active:scale-98 inline-flex items-center gap-2"
        >
          <Award size={18} className="text-amber-600" />
          <span>{hasPassedFinal ? `Retake ${selectedLevel} Certification Exam` : `Take ${selectedLevel} Certification Exam`}</span>
        </button>
      </motion.div>

      {/* Active Modals */}
      {activeLesson && (
        <LessonPlayer
          lesson={activeLesson}
          onClose={() => setActiveLesson(null)}
          onComplete={() => {}}
        />
      )}

      {activeExam && (
        <ExamModal
          exam={activeExam}
          onClose={() => setActiveExam(null)}
          onComplete={() => {}}
        />
      )}
    </div>
  )
}
