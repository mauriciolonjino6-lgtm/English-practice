import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MessageCircle, Mic2, BookOpen, ChevronRight, Zap, Lightbulb } from 'lucide-react'
import { useAppStore } from '@/store/useAppStore'
import { getUserProgress, getDueCards } from '@/services/api'
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
  const navigate    = useNavigate()
  const { userId, progress, dueCards, setProgress, setDueCards } = useAppStore()

  useEffect(() => {
    getUserProgress(userId).then(setProgress).catch(console.error)
    getDueCards(userId).then(setDueCards).catch(console.error)
  }, [userId])

  const actions = [
    { label: 'Continue Chat',  sub: 'Practice with Mr. Davies', icon: MessageCircle, path: '/chat',       color: 'from-brand-600 to-indigo-600' },
    { label: 'Shadowing',      sub: 'British accent training',  icon: Mic2,          path: '/shadowing',  color: 'from-emerald-600 to-teal-600'  },
    { label: 'Flashcards',     sub: `${dueCards.length} cards due`, icon: BookOpen, path: '/flashcards', color: 'from-amber-600 to-orange-600'   },
  ]

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="p-4 pb-6 space-y-4 max-w-lg mx-auto"
      >
        {/* Header */}
        <motion.div variants={item} className="pt-2">
          <p className="text-white/50 text-sm">Good day</p>
          <h1 className="text-2xl font-bold mt-0.5">
            <span className="text-gradient">FluentAI</span>
          </h1>
        </motion.div>

        {/* Stats row */}
        <motion.div variants={item} className="grid grid-cols-3 gap-3">
          <StreakCard  streak={progress?.streak ?? 0} />
          <ProgressCard level={progress?.level ?? 'A1'} xp={progress?.xp ?? 0} />
          <VocabCard   count={progress?.totalWords ?? 0} />
        </motion.div>

        {/* Due cards alert */}
        {dueCards.length > 0 && (
          <motion.div variants={item}>
            <button
              onClick={() => navigate('/flashcards')}
              className="w-full glass flex items-center gap-3 p-4 active:scale-[0.98] transition-transform"
            >
              <div className="p-2 rounded-xl bg-amber-500/20">
                <Zap size={18} className="text-amber-400" />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold text-amber-300">Review due!</p>
                <p className="text-xs text-white/50">{dueCards.length} cards waiting for review</p>
              </div>
              <ChevronRight size={16} className="text-white/30" />
            </button>
          </motion.div>
        )}

        {/* Quick actions */}
        <motion.div variants={item}>
          <p className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Quick Start</p>
          <div className="space-y-3">
            {actions.map(({ label, sub, icon: Icon, path, color }) => (
              <button
                key={path}
                onClick={() => navigate(path)}
                className="w-full glass flex items-center gap-4 p-4 active:scale-[0.98] transition-transform group"
              >
                <div className={`p-3 rounded-xl bg-gradient-to-br ${color} shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-sm">{label}</p>
                  <p className="text-xs text-white/50 mt-0.5">{sub}</p>
                </div>
                <ChevronRight size={16} className="text-white/30 group-hover:translate-x-0.5 transition-transform" />
              </button>
            ))}
          </div>
        </motion.div>

        {/* Today's tip */}
        <motion.div variants={item} className="glass p-4">
          <div className="flex items-center gap-1.5 mb-2">
            <Lightbulb size={14} className="text-brand-400" />
            <p className="text-xs font-semibold text-brand-400 uppercase tracking-wider">Today's Tip</p>
          </div>
          <p className="text-sm text-white/80 leading-relaxed">
            When riding the Tube, practice saying <span className="text-brand-300 font-medium">"Excuse me, could I get past, please?"</span> — very British and polite.
          </p>
        </motion.div>
      </motion.div>
    </div>
  )
}
