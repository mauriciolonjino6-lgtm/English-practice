import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Mail, Award, Target, Sparkles, Check } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAppStore } from '@/store/useAppStore'
import { authLogin } from '@/services/api'

const LEVELS = [
  { id: 'A1', name: 'A1 · Principiante', desc: 'Empezando desde cero' },
  { id: 'A2', name: 'A2 · Básico', desc: 'Frases y preguntas cotidianas' },
  { id: 'B1', name: 'B1 · Intermedio', desc: 'Conversaciones fluidas de viajes y trabajo' },
  { id: 'B2', name: 'B2 · Avanzado', desc: 'Debates, modismos y temas complejos' },
  { id: 'C1', name: 'C1 · Dominio Eficaz', desc: 'Inversión sintáctica, oraciones hendidas y diplomacia' },
  { id: 'C2', name: 'C2 · Maestría Oxford', desc: 'Retórica de élite, atenuación y precisión nativa' },
]

const GOALS = [
  'Conversación Diaria',
  'Viajes y Aeropuertos',
  'Trabajo y Entrevistas',
  'Estudio y Certificaciones',
]

export default function AuthModal() {
  const { isAuthModalOpen, setAuthModalOpen, user, setUser, logout } = useAppStore()
  const [name, setName] = useState(user?.name || 'Mauricio')
  const [email, setEmail] = useState(user?.email || 'mauricio@fluent.ai')
  const [level, setLevel] = useState(user?.level || 'A1')
  const [goal, setGoal] = useState(user?.goal || 'Conversación Diaria')
  const [loading, setLoading] = useState(false)

  if (!isAuthModalOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) {
      toast.error('Por favor escribe tu nombre')
      return
    }

    setLoading(true)
    try {
      const res = await authLogin({ name: name.trim(), email: email.trim(), level, goal })
      setUser(res.user)
      toast.success(`¡Bienvenido, ${res.user.name}! Nivel ${res.user.level}`)
      setAuthModalOpen(false)
    } catch {
      // Fallback local if server has network issue
      const localUser = {
        id: user?.id || 'local_' + Math.random().toString(36).substring(2, 9),
        name: name.trim(),
        email: email.trim() || undefined,
        level,
        goal,
        xp: user?.xp || 20,
        streak: user?.streak || 1,
      }
      setUser(localUser)
      toast.success(`¡Perfil guardado, ${localUser.name}!`)
      setAuthModalOpen(false)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          className="w-full max-w-md glass p-6 rounded-3xl relative border border-white/20 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Close button */}
          <button
            onClick={() => setAuthModalOpen(false)}
            className="absolute top-5 right-5 p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-brand-600 to-indigo-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <Sparkles size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold">{user ? 'Mi Perfil de Aprendizaje' : 'Iniciar Sesión / Registro'}</h2>
              <p className="text-xs text-white/60">Configura tu nivel para adaptar las lecciones con Mr. Davies</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Tu Nombre o Apodo
              </label>
              <div className="relative">
                <User size={18} className="absolute left-3.5 top-3.5 text-white/40" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ej. Mauricio"
                  className="input-field pl-10"
                  required
                />
              </div>
            </div>

            {/* Email (Optional) */}
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5">
                Correo Electrónico <span className="text-white/40 font-normal">(Opcional para guardar progreso)</span>
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-3.5 text-white/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com"
                  className="input-field pl-10"
                />
              </div>
            </div>

            {/* Level selection */}
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Award size={14} className="text-brand-400" />
                Tu Nivel Actual de Inglés
              </label>
              <div className="grid grid-cols-2 gap-2">
                {LEVELS.map((lvl) => {
                  const selected = level === lvl.id
                  return (
                    <button
                      type="button"
                      key={lvl.id}
                      onClick={() => setLevel(lvl.id)}
                      className={`p-3 rounded-2xl text-left border transition-all duration-200 ${
                        selected
                          ? 'border-brand-400 bg-brand-500/20 shadow-sm'
                          : 'border-white/10 hover:border-white/20 bg-white/5'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-brand-300">{lvl.id}</span>
                        {selected && <Check size={14} className="text-brand-400" />}
                      </div>
                      <p className="text-[11px] text-white/60 mt-1 line-clamp-1">{lvl.desc}</p>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Goal selection */}
            <div>
              <label className="block text-xs font-semibold text-white/70 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                <Target size={14} className="text-emerald-400" />
                Tu Meta Principal
              </label>
              <div className="grid grid-cols-2 gap-2">
                {GOALS.map((g) => {
                  const selected = goal === g
                  return (
                    <button
                      type="button"
                      key={g}
                      onClick={() => setGoal(g)}
                      className={`p-2.5 rounded-xl text-left text-xs font-medium border transition-all ${
                        selected
                          ? 'border-emerald-400/80 bg-emerald-500/15 text-emerald-300'
                          : 'border-white/10 hover:border-white/20 bg-white/5 text-white/70'
                      }`}
                    >
                      {g}
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Submit */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="btn-primary flex-1 py-3 text-center text-sm font-bold flex items-center justify-center gap-2"
              >
                {loading ? 'Guardando...' : user ? 'Actualizar Perfil' : 'Entrar y Comenzar'}
              </button>

              {user && (
                <button
                  type="button"
                  onClick={() => {
                    logout()
                    setAuthModalOpen(false)
                    toast('Sesión cerrada')
                  }}
                  className="px-4 py-3 rounded-2xl bg-red-500/20 text-red-300 hover:bg-red-500/30 text-xs font-semibold transition-colors"
                >
                  Cerrar Sesión
                </button>
              )}
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}

