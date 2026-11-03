import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Square, Mic, CheckCircle2, RotateCcw, Volume2, ChevronRight, Lightbulb } from 'lucide-react'
import { clsx } from 'clsx'
import { useSpeechSynthesis } from '@/hooks/useSpeechSynthesis'
import { useVoiceRecorder }   from '@/hooks/useVoiceRecorder'
import WaveformVisualizer     from './WaveformVisualizer'

// ── Static exercises ──────────────────────────────────────────────────────────
const EXERCISES = [
  {
    id:         '1',
    title:      'At the Tube Station',
    transcript: 'Could I have a day travelcard, please? How much is it to zone two?',
    difficulty: 'A1' as const,
    category:   'Transport',
    tip:        'Notice how "Could I" sounds like "COOD-eye" — the d and I blend together.',
  },
  {
    id:         '2',
    title:      'Ordering at a Café',
    transcript: "I'd like a flat white and a bacon bap, please. To take away, thanks.",
    difficulty: 'A2' as const,
    category:   'Food & Drink',
    tip:        '"I\'d like" is softer than "I want" — always prefer it to sound polite.',
  },
  {
    id:         '3',
    title:      'At the University',
    transcript: "Excuse me, I'm looking for the computer science department. Could you point me in the right direction?",
    difficulty: 'A2' as const,
    category:   'University',
    tip:        '"point me in the right direction" is a common British idiom.',
  },
  {
    id:         '4',
    title:      'Tech Talk – GPON Networks',
    transcript: 'Our project uses passive optical network technology to deliver fibre to the home.',
    difficulty: 'B1' as const,
    category:   'Technical',
    tip:        'In British English, "fibre" is spelled with -re (not -er as in American English).',
  },
]

type Step = 'listen' | 'record' | 'review'

const diffColor = { A1: 'text-emerald-400 bg-emerald-500/15', A2: 'text-amber-400 bg-amber-500/15', B1: 'text-red-400 bg-red-500/15' }

export default function ShadowingModule() {
  const [selectedIdx, setSelectedIdx] = useState(0)
  const [step,        setStep]        = useState<Step>('listen')
  const [isPlaying,   setIsPlaying]   = useState(false)
  const [recordData,  setRecordData]  = useState<Float32Array | null>(null)

  const exercise = EXERCISES[selectedIdx]

  const { speak, stop } = useSpeechSynthesis()
  const { recordingState, audioLevel, startRecording, stopRecording, cancelRecording } =
    useVoiceRecorder()

  const playOriginal = useCallback(() => {
    setIsPlaying(true)
    speak(exercise.transcript, 0.8)
    // Simulate finish
    const dur = exercise.transcript.length * 65
    setTimeout(() => setIsPlaying(false), dur)
  }, [exercise, speak])

  const stopOriginal = useCallback(() => {
    stop()
    setIsPlaying(false)
  }, [stop])

  const handleStopRecording = useCallback(async () => {
    const blob = await stopRecording()
    if (!blob) return
    // Simulate waveform data
    const fake = new Float32Array(200).map(() => (Math.random() - 0.5) * 0.8)
    setRecordData(fake)
    setStep('review')
  }, [stopRecording])

  const reset = () => {
    setStep('listen')
    setRecordData(null)
    cancelRecording()
    stop()
    setIsPlaying(false)
  }

  return (
    <div className="h-full overflow-y-auto scrollbar-hide">
      <div className="p-4 space-y-4 max-w-lg mx-auto pb-6">

        {/* Header */}
        <div className="pt-2">
          <h1 className="text-xl font-bold">Shadowing</h1>
          <p className="text-sm text-white/50 mt-0.5">Listen → Shadow → Compare</p>
        </div>

        {/* Exercise picker */}
        <div className="space-y-2">
          {EXERCISES.map((ex, i) => (
            <button
              key={ex.id}
              onClick={() => { setSelectedIdx(i); reset() }}
              className={clsx(
                'w-full glass text-left p-3.5 transition-all active:scale-[0.98]',
                i === selectedIdx && 'border-brand-500/40 bg-brand-500/10'
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate">{ex.title}</p>
                  <p className="text-[11px] text-white/50 mt-0.5">{ex.category}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className={clsx('badge', diffColor[ex.difficulty])}>{ex.difficulty}</span>
                  {i === selectedIdx && <CheckCircle2 size={14} className="text-brand-400" />}
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Active exercise */}
        <motion.div
          key={exercise.id + step}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass p-4 space-y-4"
        >
          {/* Transcript */}
          <div className="bg-white/5 rounded-xl p-4">
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold mb-2">Transcript</p>
            <p className="text-sm text-white/90 leading-relaxed font-medium">{exercise.transcript}</p>
          </div>

          {/* Tip */}
          <div className="flex items-start gap-2 bg-brand-500/10 rounded-xl p-3">
            <Lightbulb size={16} className="text-brand-300 shrink-0 mt-0.5" />
            <p className="text-xs text-brand-300 leading-relaxed">{exercise.tip}</p>
          </div>

          {/* Step controls */}
          {step === 'listen' && (
            <div className="space-y-3">
              <p className="text-xs text-white/50 text-center">Step 1 — Listen to the native audio</p>
              <button
                onClick={isPlaying ? stopOriginal : playOriginal}
                className={clsx(
                  'w-full py-3.5 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm transition-all active:scale-[0.98]',
                  isPlaying
                    ? 'bg-red-500/20 text-red-300 border border-red-500/30'
                    : 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white'
                )}
              >
                {isPlaying ? <><Square size={16} className="fill-red-300" /> Stop</> : <><Volume2 size={16} /> Play Native Audio</>}
              </button>
              {!isPlaying && (
                <button
                  onClick={() => setStep('record')}
                  className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold text-sm bg-white/[0.07] hover:bg-white/[0.12] transition-all active:scale-[0.98]"
                >
                  I'm ready to shadow <ChevronRight size={14} />
                </button>
              )}
            </div>
          )}

          {step === 'record' && (
            <div className="space-y-4">
              <p className="text-xs text-white/50 text-center">Step 2 — Now you speak! Try to copy the accent exactly.</p>

              {/* Audio level visualizer (live) */}
              <div className="bg-white/5 rounded-xl p-3 h-16 flex items-center justify-center">
                {recordingState === 'recording' ? (
                  <div className="flex items-end gap-1 h-10">
                    {Array.from({ length: 20 }).map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{ scaleY: recordingState === 'recording' ? 0.3 + audioLevel * (0.5 + Math.random() * 0.5) : 0.1 }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatType: 'reverse' }}
                        className="w-2 bg-brand-400 rounded-full origin-bottom"
                        style={{ height: '100%' }}
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-white/30">Press the mic to start recording</p>
                )}
              </div>

              <div className="flex items-center justify-center gap-4">
                {recordingState === 'idle' ? (
                  <button
                    onClick={startRecording}
                    className="w-16 h-16 rounded-full bg-red-500 flex items-center justify-center shadow-lg shadow-red-500/30 active:scale-90 transition-transform"
                  >
                    <Mic size={26} className="text-white" />
                  </button>
                ) : (
                  <>
                    <button
                      onClick={cancelRecording}
                      className="btn-ghost text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleStopRecording}
                      className="w-16 h-16 rounded-full bg-surface-3 border-2 border-red-500 flex items-center justify-center active:scale-90 transition-transform"
                    >
                      <Square size={20} className="text-red-400 fill-red-400" />
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-4">
              <p className="text-xs text-white/50 text-center">Step 3 — Compare your recording</p>

              <WaveformVisualizer
                audioData={null}
                color="#3b82f6"
                label="Native speaker"
                height={56}
              />
              <WaveformVisualizer
                audioData={recordData}
                color="#10b981"
                label="Your recording"
                height={56}
              />

              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3">
                <p className="text-xs text-emerald-300 font-semibold mb-1">Keep practising</p>
                <p className="text-xs text-white/60">
                  Focus on rhythm and connected speech. Words often blend together in natural British English.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button onClick={reset} className="btn-ghost flex items-center justify-center gap-2 text-sm">
                  <RotateCcw size={14} /> Try again
                </button>
                <button
                  onClick={() => {
                    const next = (selectedIdx + 1) % EXERCISES.length
                    setSelectedIdx(next)
                    reset()
                  }}
                  className="btn-primary flex items-center justify-center gap-2 text-sm"
                >
                  Next <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}
