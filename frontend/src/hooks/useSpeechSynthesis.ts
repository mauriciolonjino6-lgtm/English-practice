import { useCallback, useEffect, useState, useRef } from 'react'

let activeAudio: HTMLAudioElement | null = null

export function useSpeechSynthesis() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])
  const isPlayingRef = useRef(false)

  useEffect(() => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    const loadVoices = () => {
      const available = window.speechSynthesis.getVoices()
      if (available && available.length > 0) {
        setVoices(available)
      }
    }

    loadVoices()
    window.speechSynthesis.onvoiceschanged = loadVoices
  }, [])

  const findBritishFemaleVoice = useCallback((voiceList: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined => {
    if (!voiceList || voiceList.length === 0) return undefined

    // 1. Known high quality British English female voices
    const highQualityFemaleNames = [
      'google uk english female',
      'microsoft libby online',
      'microsoft sonia online',
      'microsoft maisie online',
      'microsoft susan',
      'microsoft hazel',
      'microsoft mia',
      'serena',
      'stephanie',
      'martha',
      'alice',
      'victoria',
      'kate',
      'fiona',
    ]

    for (const pattern of highQualityFemaleNames) {
      const match = voiceList.find((v) =>
        (v.lang.toLowerCase().startsWith('en-gb') || v.lang.toLowerCase() === 'en_gb' || v.name.toLowerCase().includes('uk') || v.name.toLowerCase().includes('british')) &&
        v.name.toLowerCase().includes(pattern)
      )
      if (match) return match
    }

    // 2. Any en-GB voice explicitly labeled as female
    const femaleRegex = /female|woman|girl/i
    const gbFemale = voiceList.find((v) =>
      (v.lang.toLowerCase().startsWith('en-gb') || v.lang.toLowerCase() === 'en_gb') &&
      (femaleRegex.test(v.name) || femaleRegex.test(v.voiceURI))
    )
    if (gbFemale) return gbFemale

    // 3. Any en-GB voice not explicitly male
    const maleRegex = /male|man|george|david|daniel|oliver|ryan|guy/i
    const gbNeutral = voiceList.find((v) =>
      (v.lang.toLowerCase().startsWith('en-gb') || v.lang.toLowerCase() === 'en_gb') &&
      !maleRegex.test(v.name)
    )
    if (gbNeutral) return gbNeutral

    // 4. Any en-GB voice
    const anyGb = voiceList.find((v) =>
      v.lang.toLowerCase().startsWith('en-gb') || v.lang.toLowerCase() === 'en_gb'
    )
    if (anyGb) return anyGb

    // 5. English female fallback
    return voiceList.find((v) => v.lang.toLowerCase().startsWith('en') && (femaleRegex.test(v.name) || /samantha|jenny|zira/i.test(v.name)))
  }, [])

  const stop = useCallback(() => {
    if (activeAudio) {
      try {
        activeAudio.pause()
        activeAudio.currentTime = 0
      } catch {}
      activeAudio = null
    }
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
    isPlayingRef.current = false
    setIsPlaying(false)
  }, [])

  const speakWebSpeech = useCallback((text: string, rate = 0.88, pitch = 1.08) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    window.speechSynthesis.cancel()
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }

    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = rate
    utter.pitch = pitch
    utter.volume = 1

    const currentList = window.speechSynthesis.getVoices().length > 0
      ? window.speechSynthesis.getVoices()
      : voices

    const chosen = findBritishFemaleVoice(currentList)
    if (chosen) {
      utter.voice = chosen
      utter.lang = chosen.lang
    } else {
      utter.lang = 'en-GB'
    }

    utter.onstart = () => {
      isPlayingRef.current = true
      setIsPlaying(true)
    }
    utter.onend = () => {
      isPlayingRef.current = false
      setIsPlaying(false)
    }
    utter.onerror = () => {
      isPlayingRef.current = false
      setIsPlaying(false)
    }

    window.speechSynthesis.speak(utter)
  }, [voices, findBritishFemaleVoice])

  const speak = useCallback((text: string, rate = 0.92, pitch = 1.05) => {
    if (!text || !text.trim()) return

    // Stop ongoing audio
    stop()

    // Clean text of non-printable or Markdown chars
    const cleanText = text
      .replace(/[*_#`~[\]]/g, '')
      .replace(/\s+/g, ' ')
      .trim()

    if (!cleanText) return

    const rawApiUrl = (import.meta as any).env?.VITE_API_URL as string | undefined
    const base = rawApiUrl ? rawApiUrl.replace(/\/$/, '') : ''
    const audioUrl = `${base}/api/tts?text=${encodeURIComponent(cleanText)}`

    try {
      const audio = new Audio(audioUrl)
      activeAudio = audio
      isPlayingRef.current = true
      setIsPlaying(true)

      audio.onended = () => {
        isPlayingRef.current = false
        setIsPlaying(false)
        if (activeAudio === audio) activeAudio = null
      }

      audio.onerror = () => {
        console.warn('[Audio Stream notice]: Falling back to local British voice')
        if (activeAudio === audio) activeAudio = null
        speakWebSpeech(cleanText, rate, pitch)
      }

      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise.catch((playErr) => {
          console.warn('[Audio Play policy notice]: Falling back to Web Speech', playErr)
          if (activeAudio === audio) activeAudio = null
          speakWebSpeech(cleanText, rate, pitch)
        })
      }
    } catch {
      speakWebSpeech(cleanText, rate, pitch)
    }
  }, [stop, speakWebSpeech])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (activeAudio) {
        try {
          activeAudio.pause()
        } catch {}
        activeAudio = null
      }
    }
  }, [])

  return { speak, stop, isPlaying }
}
