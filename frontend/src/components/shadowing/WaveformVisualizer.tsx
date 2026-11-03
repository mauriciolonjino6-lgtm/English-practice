import { useEffect, useRef } from 'react'

interface Props {
  audioData:   Float32Array | null
  color?:      string
  height?:     number
  label?:      string
}

export default function WaveformVisualizer({ audioData, color = '#3b82f6', height = 60, label }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx    = canvas.getContext('2d')
    if (!ctx) return

    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    if (!audioData || audioData.length === 0) {
      // Draw flat line placeholder
      ctx.strokeStyle = color + '40'
      ctx.lineWidth   = 1.5
      ctx.beginPath()
      ctx.moveTo(0, h / 2)
      ctx.lineTo(w, h / 2)
      ctx.stroke()
      return
    }

    const sliceW = w / audioData.length
    ctx.strokeStyle = color
    ctx.lineWidth   = 2
    ctx.shadowColor  = color
    ctx.shadowBlur   = 4
    ctx.lineJoin     = 'round'
    ctx.beginPath()

    audioData.forEach((v, i) => {
      const x = i * sliceW
      const y = ((v + 1) / 2) * h
      if (i === 0) ctx.moveTo(x, y)
      else         ctx.lineTo(x, y)
    })

    ctx.stroke()
  }, [audioData, color])

  return (
    <div className="space-y-1">
      {label && <p className="text-[10px] text-white/40 font-semibold uppercase tracking-wider">{label}</p>}
      <div className="bg-white/5 rounded-xl p-2">
        <canvas
          ref={canvasRef}
          width={400}
          height={height}
          className="w-full rounded-lg"
          style={{ height: `${height}px` }}
        />
      </div>
    </div>
  )
}
