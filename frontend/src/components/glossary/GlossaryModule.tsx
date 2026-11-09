import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Search,
  BookOpen,
  Volume2,
  Star,
  Plus,
  X,
  Info,
  Trash2,
} from 'lucide-react'
import { clsx } from 'clsx'
import { useAppStore } from '@/store/useAppStore'
import { INITIAL_GLOSSARY, type GlossaryWord, type GlossaryCategory, type CEFRLevel } from '@/data/glossaryData'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'

interface Props {
  isModal?: boolean
  onClose?: () => void
}

const CATEGORIES: ('All' | GlossaryCategory)[] = [
  'All',
  'Cinema & Reviews',
  'British Slang & Culture',
  'Grammar & Connectives',
  'False Friends & Pitfalls',
  'School & Exams',
  'Daily Life & Dining',
  'Travel & Directions',
]

const LEVELS: ('All' | CEFRLevel)[] = ['All', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2']

export default function GlossaryModule({ isModal = false, onClose }: Props) {
  const {
    starredGlossaryWordIds,
    customGlossaryWords,
    toggleStarGlossaryWord,
    addCustomGlossaryWord,
    removeCustomGlossaryWord,
  } = useAppStore()

  const { speak } = useSpeechSynthesis()

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<'All' | GlossaryCategory>('All')
  const [selectedLevel, setSelectedLevel] = useState<'All' | CEFRLevel>('All')
  const [onlyStarred, setOnlyStarred] = useState(false)
  const [isAddingWord, setIsAddingWord] = useState(false)

  // Form state for adding custom word
  const [newWord, setNewWord] = useState('')
  const [newPhonetic, setNewPhonetic] = useState('')
  const [newPos, setNewPos] = useState<GlossaryWord['pos']>('noun')
  const [newLevel, setNewLevel] = useState<CEFRLevel>('A2')
  const [newCategory, setNewCategory] = useState<GlossaryCategory>('Daily Life & Dining')
  const [newDefinition, setNewDefinition] = useState('')
  const [newMeaningEs, setNewMeaningEs] = useState('')
  const [newExample, setNewExample] = useState('')
  const [newNotes, setNewNotes] = useState('')

  // Combined list of initial glossary and user custom words
  const allWords = useMemo(() => {
    return [...customGlossaryWords, ...INITIAL_GLOSSARY]
  }, [customGlossaryWords])

  // Filtered list based on search and filters
  const filteredWords = useMemo(() => {
    const q = searchTerm.toLowerCase().trim()
    return allWords.filter((w) => {
      // Starred filter
      if (onlyStarred && !starredGlossaryWordIds.includes(w.id)) {
        return false
      }
      // Level filter
      if (selectedLevel !== 'All' && w.level !== selectedLevel) {
        return false
      }
      // Category filter
      if (selectedCategory !== 'All' && w.category !== selectedCategory) {
        return false
      }
      // Search term
      if (q) {
        const matchesWord = w.word.toLowerCase().includes(q)
        const matchesDef = w.definition.toLowerCase().includes(q)
        const matchesEs = w.meaningEs.toLowerCase().includes(q)
        const matchesExample = w.example.toLowerCase().includes(q)
        const matchesNotes = w.notes?.toLowerCase().includes(q)
        return matchesWord || matchesDef || matchesEs || matchesExample || matchesNotes
      }
      return true
    })
  }, [allWords, searchTerm, selectedLevel, selectedCategory, onlyStarred, starredGlossaryWordIds])

  const handleCreateWord = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newWord.trim() || !newDefinition.trim()) return

    addCustomGlossaryWord({
      word: newWord.trim(),
      phonetic: newPhonetic.trim() || `/${newWord.toLowerCase()}/`,
      pos: newPos,
      level: newLevel,
      category: newCategory,
      definition: newDefinition.trim(),
      meaningEs: newMeaningEs.trim(),
      example: newExample.trim() || `I learned the word "${newWord}" in my English lesson.`,
      notes: newNotes.trim() || undefined,
    })

    // Reset form
    setNewWord('')
    setNewPhonetic('')
    setNewDefinition('')
    setNewMeaningEs('')
    setNewExample('')
    setNewNotes('')
    setIsAddingWord(false)
  }

  const content = (
    <div className={clsx(
      'flex flex-col',
      isModal ? 'h-[85vh] sm:h-[80vh]' : 'h-full'
    )}>
      {/* Header Bar */}
      <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-white/10 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl shrink-0 space-y-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-brand-500/20">
              <BookOpen size={20} />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                Oxford English Glossary
              </h2>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Essential vocabulary, idioms, false friends, and grammar connectives
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsAddingWord(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
              title="Add a custom word to your glossary"
            >
              <Plus size={14} />
              <span className="hidden sm:inline">Add Word</span>
            </button>

            {isModal && onClose && (
              <button
                onClick={onClose}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                title="Close Glossary"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search word, meaning, or rule (e.g. plot, cuppa, while, impressive)..."
            className="w-full pl-9 pr-9 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-white p-0.5"
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Level & Starred Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5 text-xs">
          <button
            onClick={() => setOnlyStarred((v) => !v)}
            className={clsx(
              'flex items-center gap-1 px-3 py-1 rounded-lg font-bold shrink-0 transition-all border',
              onlyStarred
                ? 'bg-amber-500 text-white border-amber-500 shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-amber-400'
            )}
          >
            <Star size={12} className={onlyStarred ? 'fill-current' : 'text-amber-500'} />
            <span>Saved ({starredGlossaryWordIds.length})</span>
          </button>

          <div className="h-4 w-px bg-slate-300 dark:bg-slate-700 shrink-0 mx-1" />

          {LEVELS.map((lvl) => {
            const active = selectedLevel === lvl
            return (
              <button
                key={lvl}
                onClick={() => setSelectedLevel(lvl)}
                className={clsx(
                  'px-2.5 py-1 rounded-lg font-bold shrink-0 transition-all border text-[11px]',
                  active
                    ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10 hover:border-brand-400'
                )}
              >
                {lvl === 'All' ? 'All Levels' : lvl}
              </button>
            )
          })}
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-hide py-0.5">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={clsx(
                  'px-2.5 py-1 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 transition-all',
                  active
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                )}
              >
                {cat}
              </button>
            )
          })}
        </div>
      </div>

      {/* Words List */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 scrollbar-hide">
        {filteredWords.length === 0 ? (
          <div className="py-12 text-center space-y-3 max-w-sm mx-auto">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
              <Search size={22} />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              No matching words found
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Try searching with another word, changing the level filter, or click "Add Word" to define a new entry.
            </p>
            <button
              onClick={() => {
                setSearchTerm('')
                setSelectedLevel('All')
                setSelectedCategory('All')
                setOnlyStarred(false)
              }}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 hover:bg-brand-200 transition-colors"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          filteredWords.map((item) => {
            const isStarred = starredGlossaryWordIds.includes(item.id)

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all space-y-2.5"
              >
                {/* Word Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white tracking-tight">
                        {item.word}
                      </h3>
                      <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                        {item.phonetic}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-brand-100 dark:bg-brand-950/60 text-brand-700 dark:text-brand-300 uppercase">
                        {item.pos}
                      </span>
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-extrabold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 uppercase">
                        {item.level}
                      </span>
                      {item.isCustom && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300">
                          Custom
                        </span>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium block">
                      {item.category}
                    </span>
                  </div>

                  {/* Actions: Audio & Star */}
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => speak(item.word)}
                      className="p-2 rounded-xl bg-slate-100 hover:bg-brand-100 dark:bg-slate-700/60 dark:hover:bg-brand-900/40 text-brand-600 dark:text-brand-300 transition-colors active:scale-95"
                      title="Listen to British pronunciation"
                    >
                      <Volume2 size={16} />
                    </button>
                    <button
                      onClick={() => toggleStarGlossaryWord(item.id)}
                      className={clsx(
                        'p-2 rounded-xl transition-colors active:scale-95',
                        isStarred
                          ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-500'
                          : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 text-slate-400 hover:text-amber-500'
                      )}
                      title={isStarred ? 'Remove from saved' : 'Save word'}
                    >
                      <Star size={16} className={isStarred ? 'fill-current' : ''} />
                    </button>
                    {item.isCustom && (
                      <button
                        onClick={() => removeCustomGlossaryWord(item.id)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-rose-100 dark:bg-slate-700/60 text-slate-400 hover:text-rose-600 transition-colors"
                        title="Delete custom word"
                      >
                        <Trash2 size={15} />
                      </button>
                    )}
                  </div>
                </div>

                {/* English Definition */}
                <div className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed font-normal">
                  {item.definition}
                </div>

                {/* Spanish Meaning & Context */}
                <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-white/5 space-y-1">
                  <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Meaning & Usage Note:
                  </div>
                  <div className="text-xs font-medium text-slate-700 dark:text-slate-300 leading-relaxed">
                    {item.meaningEs}
                  </div>
                </div>

                {/* Example Sentence with Audio */}
                <div className="flex items-center justify-between gap-3 p-2.5 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200/70 dark:border-indigo-900/40">
                  <div className="text-xs font-medium text-indigo-950 dark:text-indigo-200 italic">
                    "{item.example}"
                  </div>
                  <button
                    onClick={() => speak(item.example)}
                    className="p-1 rounded-lg text-indigo-600 dark:text-indigo-300 hover:bg-indigo-200/50 dark:hover:bg-indigo-900/50 transition-colors shrink-0"
                    title="Listen to full example"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>

                {/* Pedagogical Tip / Note */}
                {item.notes && (
                  <div className="flex items-start gap-1.5 text-[11px] text-amber-700 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200 dark:border-amber-900/50">
                    <Info size={13} className="shrink-0 mt-0.5" />
                    <span>{item.notes}</span>
                  </div>
                )}
              </motion.div>
            )
          })
        )}
      </div>

      {/* Add Custom Word Modal */}
      <AnimatePresence>
        {isAddingWord && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="px-5 py-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Plus size={18} className="text-brand-600 dark:text-brand-400" />
                  <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white">
                    Add New Word to Glossary
                  </h3>
                </div>
                <button
                  onClick={() => setIsAddingWord(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleCreateWord} className="p-5 space-y-3.5 overflow-y-auto">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Word or Expression *
                  </label>
                  <input
                    type="text"
                    required
                    value={newWord}
                    onChange={(e) => setNewWord(e.target.value)}
                    placeholder="e.g. Incongruous, Put off, Fancy..."
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      Part of Speech
                    </label>
                    <select
                      value={newPos}
                      onChange={(e) => setNewPos(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="noun">Noun</option>
                      <option value="verb">Verb</option>
                      <option value="adjective">Adjective</option>
                      <option value="adverb">Adverb</option>
                      <option value="idiom">Idiom</option>
                      <option value="phrasal verb">Phrasal Verb</option>
                      <option value="connective">Connective</option>
                      <option value="expression">Expression</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                      CEFR Level
                    </label>
                    <select
                      value={newLevel}
                      onChange={(e) => setNewLevel(e.target.value as any)}
                      className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                    >
                      <option value="A1">A1 - Beginner</option>
                      <option value="A2">A2 - Elementary</option>
                      <option value="B1">B1 - Intermediate</option>
                      <option value="B2">B2 - Upper Intermediate</option>
                      <option value="C1">C1 - Advanced</option>
                      <option value="C2">C2 - Mastery</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  >
                    <option value="Cinema & Reviews">Cinema & Reviews</option>
                    <option value="British Slang & Culture">British Slang & Culture</option>
                    <option value="Grammar & Connectives">Grammar & Connectives</option>
                    <option value="False Friends & Pitfalls">False Friends & Pitfalls</option>
                    <option value="School & Exams">School & Exams</option>
                    <option value="Daily Life & Dining">Daily Life & Dining</option>
                    <option value="Travel & Directions">Travel & Directions</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    English Definition *
                  </label>
                  <textarea
                    required
                    rows={2}
                    value={newDefinition}
                    onChange={(e) => setNewDefinition(e.target.value)}
                    placeholder="Clear definition of what this word means in English..."
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Spanish Meaning & Context
                  </label>
                  <input
                    type="text"
                    value={newMeaningEs}
                    onChange={(e) => setNewMeaningEs(e.target.value)}
                    placeholder="Spanish meaning and memory notes..."
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase mb-1">
                    Example Sentence
                  </label>
                  <input
                    type="text"
                    value={newExample}
                    onChange={(e) => setNewExample(e.target.value)}
                    placeholder="An example sentence using this word naturally..."
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>

                <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-200 dark:border-white/10">
                  <button
                    type="button"
                    onClick={() => setIsAddingWord(false)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-md shadow-brand-500/20 active:scale-95 transition-all"
                  >
                    Save Word to Glossary
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )

  if (isModal) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
        <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col">
          {content}
        </div>
      </div>
    )
  }

  return content
}
