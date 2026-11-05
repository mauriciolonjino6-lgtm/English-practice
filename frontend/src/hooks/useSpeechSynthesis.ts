import { useCallback, useEffect, useState } from 'react'

export function useSpeechSynthesis() {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

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

    // 1. Top Tier: Specific known British English female voices (Edge / Windows / Chrome / Apple / Android)
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
      'fiona'
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

    // 3. Any en-GB voice that does not contain male keywords
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

    // 5. High-quality English female fallback
    const anyEnFemale = voiceList.find((v) =>
      v.lang.toLowerCase().startsWith('en') &&
      (femaleRegex.test(v.name) || /samantha|jenny|zira/i.test(v.name))
    )
    if (anyEnFemale) return anyEnFemale

    // 6. Generic English voice
    return voiceList.find((v) => v.lang.toLowerCase().startsWith('en'))
  }, [])

  const speak = useCallback((text: string, rate = 0.88, pitch = 1.08) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return

    window.speechSynthesis.cancel()
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume()
    }

    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = rate
    utter.pitch = pitch // Warm, melodious British feminine pitch
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

    window.speechSynthesis.speak(utter)
  }, [voices, findBritishFemaleVoice])

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel()
    }
  }, [])

  return { speak, stop }
}
