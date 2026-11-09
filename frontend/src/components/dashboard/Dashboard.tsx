import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Mic2, BookOpen, ChevronRight, Zap, Lightbulb, Coffee, Plane, Briefcase, Volume2, Sparkles, GraduationCap } from 'lucide-react'
import { useAppStore, ScenarioType } from '@/store/useAppStore'
import { getUserProgress, getDueCards } from '@/services/api'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import StreakCard  from './StreakCard'
import ProgressCard from './ProgressCard'
import VocabCard   from './VocabCard'

const container = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
}
const item = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { type: 'spring', damping: 20 } },
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, userId, progress, dueCards, setProgress, setDueCards, setActiveScenario, setAuthModalOpen, levelProgress } = useAppStore()
  const { speak, stop, isPlaying } = useSpeechSynthesis()

  useEffect(() => {
    const activeId = user?.id || userId
    getUserProgress(activeId).then(setProgress).catch(console.error)
    getDueCards(activeId).then(setDueCards).catch(console.error)
  }, [user?.id, userId, setProgress, setDueCards])

  const startScenario = (scenario: ScenarioType) => {
    setActiveScenario(scenario)
    navigate('/chat')
  }

  const actions = [
    { label: 'Conversational AI Tutor', sub: 'Chat with British Tutor Emma & Mr. Davies', icon: MessageCircle, path: '/chat', scenario: 'free-talk' as const, color: 'from-brand-600 to-indigo-600' },
    { label: 'Oxford English Glossary', sub: 'Explore definitions, false friends & idioms', icon: BookOpen, path: '/glossary', color: 'from-blue-600 to-cyan-600' },
    { label: 'British Accent Training', sub: 'Shadowing with authentic RP pronunciation', icon: Mic2, path: '/shadowing', color: 'from-emerald-600 to-teal-600' },
    { label: 'Spaced Repetition Cards', sub: `${dueCards.length} review items pending in SM-2 queue`, icon: BookOpen, path: '/flashcards', color: 'from-amber-600 to-orange-600' },
  ]

  const scenarios = [
    { id: 'cafe' as const, label: 'Soho Coffee Shop', icon: Coffee, desc: 'Ordering hot tea, flat white & food in London' },
    { id: 'airport' as const, label: 'Heathrow Airport', icon: Plane, desc: 'Passport control, baggage claim & key questions' },
    { id: 'interview' as const, label: 'London Job Interview', icon: Briefcase, desc: 'Presenting experience & technical background' },
  ]

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-4 pb-8 space-y-4 max-w-xl mx-auto"
      >
        {/* Welcome Banner */}
        <motion.div variants={item} className="pt-2 flex items-center justify-between">
          <div>
            <p className="opacity-60 text-xs font-semibold uppercase tracking-wider">
              {user ? `Welcome back, ${user.name}!` : 'Welcome to your tutorial'}
            </p>
            <h1 className="text-2xl font-black mt-0.5">
              Master <span className="text-gradient">Real British English</span>
            </h1>
          </div>

          {!user && (
            <button
              onClick={() => setAuthModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-brand-500/20 text-brand-400 border border-brand-400/30 text-xs font-bold hover:bg-brand-500/30 transition-all"
            >
              Create Profile
            </button>
          )}
        </motion.div>

        {/* Stats row */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          <StreakCard  streak={progress?.streak ?? 1} />
          <ProgressCard level={levelProgress.currentLevel || user?.level || progress?.level || 'A1'} xp={user?.xp ?? progress?.xp ?? 50} />
          <VocabCard   count={progress?.totalWords ?? 0} />
        </motion.div>

        {/* Learning Path Banner */}
        <motion.div variants={item}>
          <div
            onClick={() => navigate('/learn')}
            className="p-5 rounded-3xl bg-gradient-to-r from-brand-600 via-indigo-600 to-purple-600 text-white shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all cursor-pointer relative overflow-hidden group"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md">
                <GraduationCap size={13} />
                Curriculum Path • Level {levelProgress.currentLevel || 'A1'}
              </span>
              <span className="text-xs font-bold text-amber-300">
                {levelProgress.completedLessons.length} lessons completed
              </span>
            </div>

            <h2 className="text-xl font-black mt-1">
              Continue Learning ({levelProgress.currentLevel || 'A1'})
            </h2>
            <p className="text-xs text-indigo-100 mt-0.5 line-clamp-1">
              Interactive listening, speaking, grammar exercises & periodic certifications.
            </p>

            <div className="mt-4 flex items-center justify-between gap-4">
              <div className="flex-1 bg-black/20 h-2.5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((levelProgress.completedLessons.length / 11) * 100))}%` }}
                />
              </div>
              <span className="text-xs font-extrabold flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
                Open Curriculum →
              </span>
            </div>
          </div>
        </motion.div>

        {/* Real-Life Scenarios Section */}
        <motion.div variants={item}>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-wider opacity-60 flex items-center gap-1.5">
              <Sparkles size={13} className="text-brand-400" />
              Today's Practical Scenarios
            </p>
            <span className="text-[10px] opacity-40">Tap to engage</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
            {scenarios.map(({ id, label, icon: Icon, desc }) => (
              <button
                key={id}
                onClick={() => startScenario(id)}
                className="p-3.5 glass rounded-2xl text-left hover:border-brand-400/50 hover:bg-brand-500/10 active:scale-98 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                  <Icon size={16} />
                </div>
                <h3 className="font-bold text-xs">{label}</h3>
                <p className="text-[10px] opacity-60 mt-0.5 line-clamp-1">{desc}</p>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Due cards alert */}
        {dueCards.length > 0 && (
          <motion.div variants={item}>
            <button
              onClick={() => navigate('/flashcards')}
              className="w-full glass flex items-center gap-3 p-4 active:scale-[0.98] transition-transform border-amber-500/30 bg-amber-500/10"
            >
              <div className="p-2.5 rounded-xl bg-amber-500/20">
                <Zap size={18} className="text-amber-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-bold text-amber-300">Flashcards Due for Review</p>
                <p className="text-xs opacity-70">{dueCards.length} vocabulary items waiting in your SM-2 queue</p>
              </div>
              <ChevronRight size={16} className="opacity-40" />
            </button>
          </motion.div>
        )}

        {/* Quick Start Actions */}
        <motion.div variants={item}>
          <p className="text-xs font-bold opacity-60 uppercase tracking-wider mb-2.5">
            Learning Modules
          </p>
          <div className="space-y-2.5">
            {actions.map(({ label, sub, icon: Icon, path, color, scenario }) => (
              <button
                key={path}
                onClick={() => {
                  if (scenario) setActiveScenario(scenario)
                  navigate(path)
                }}
                className="w-full glass flex items-center gap-4 p-3.5 active:scale-[0.98] transition-transform group hover:border-white/20"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shrink-0 text-white shadow-md`}>
                  <Icon size={18} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-bold text-sm">{label}</p>
                  <p className="text-xs opacity-60 mt-0.5">{sub}</p>
                </div>
                <ChevronRight size={16} className="opacity-30 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Phrase of the day with audio */}
        <motion.div variants={item} className="glass p-4 border-brand-500/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <Lightbulb size={15} className="text-brand-400" />
              <p className="text-xs font-bold text-brand-400 uppercase tracking-wider">British Phrase of the Day</p>
            </div>
            <button
              onClick={() => isPlaying ? stop() : speak("Could I have a flat white and a bacon bap, please?")}
              className="flex items-center gap-1 text-[11px] font-bold text-brand-400 hover:text-brand-300"
              title="Listen to British audio"
            >
              <Volume2 size={13} />
              <span>{isPlaying ? 'Stop' : 'Listen'}</span>
            </button>
          </div>
          <p className="text-sm font-semibold leading-relaxed">
            "Could I have a flat white and a bacon bap, please?"
          </p>
          <p className="text-xs opacity-60 mt-1">
            In the United Kingdom, <em>"Could I have..."</em> sounds far more polite and natural than <em>"I want..."</em>.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
