import { useState, useRef, useCallback } from 'react'

export type RecordingState = 'idle' | 'recording' | 'processing'

interface UseVoiceRecorderReturn {
  recordingState: RecordingState
  audioLevel:     number
  startRecording: () => Promise<void>
  stopRecording:  () => Promise<Blob | null>
  cancelRecording: () => void
}

export function useVoiceRecorder(): UseVoiceRecorderReturn {
  const [recordingState, setRecordingState] = useState<RecordingState>('idle')
  const [audioLevel,     setAudioLevel]     = useState(0)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef        = useRef<Blob[]>([])
  const analyserRef      = useRef<AnalyserNode | null>(null)
  const animFrameRef     = useRef<number>(0)
  const streamRef        = useRef<MediaStream | null>(null)

  const detectLevel = useCallback(() => {
    if (!analyserRef.current) return
    const data = new Uint8Array(analyserRef.current.fftSize)
    analyserRef.current.getByteTimeDomainData(data)
    let sum = 0
    for (const v of data) sum += Math.abs(v - 128)
    setAudioLevel(Math.min(1, (sum / data.length) / 20))
    animFrameRef.current = requestAnimationFrame(detectLevel)
  }, [])

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      // Audio level analysis
      const ctx      = new AudioContext()
      const source   = ctx.createMediaStreamSource(stream)
      const analyser = ctx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser

      const mr = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('audio/webm;codecs=opus')
          ? 'audio/webm;codecs=opus'
          : 'audio/webm',
      })
      chunksRef.current = []
      mr.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      mr.start(100)
      mediaRecorderRef.current = mr
      setRecordingState('recording')
      detectLevel()
    } catch (err) {
      console.error('Microphone error:', err)
    }
  }, [detectLevel])

  const stopRecording = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      cancelAnimationFrame(animFrameRef.current)
      setAudioLevel(0)
      const mr = mediaRecorderRef.current
      if (!mr || mr.state === 'inactive') { resolve(null); return }

      setRecordingState('processing')
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        streamRef.current?.getTracks().forEach((t) => t.stop())
        setRecordingState('idle')
        resolve(blob)
      }
      mr.stop()
    })
  }, [])

  const cancelRecording = useCallback(() => {
    cancelAnimationFrame(animFrameRef.current)
    setAudioLevel(0)
    mediaRecorderRef.current?.stop()
    streamRef.current?.getTracks().forEach((t) => t.stop())
    chunksRef.current = []
    setRecordingState('idle')
  }, [])

  return { recordingState, audioLevel, startRecording, stopRecording, cancelRecording }
}
