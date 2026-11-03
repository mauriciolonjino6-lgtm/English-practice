import { useCallback } from 'react'

export function useSpeechSynthesis() {
  const speak = useCallback((text: string, rate = 0.85) => {
    if (!window.speechSynthesis) return
    window.speechSynthesis.cancel()

    const utter = new SpeechSynthesisUtterance(text)
    utter.rate   = rate
    utter.pitch  = 1
    utter.volume = 1

    // Prefer a British English voice
    const voices  = window.speechSynthesis.getVoices()
    const british = voices.find((v) =>
      v.lang === 'en-GB' ||
      v.name.toLowerCase().includes('british') ||
      v.name.toLowerCase().includes('uk')
    )
    if (british) utter.voice = british

    window.speechSynthesis.speak(utter)
  }, [])

  const stop = useCallback(() => {
    window.speechSynthesis.cancel()
  }, [])

  return { speak, stop }
}
