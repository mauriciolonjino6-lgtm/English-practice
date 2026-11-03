interface Props { level: string; xp: number }

export default function ProgressCard({ level, xp }: Props) {
  return (
    <div className="glass p-3 flex flex-col items-center gap-1">
      <span className="text-xl font-bold text-brand-400">{level}</span>
      <span className="text-[10px] text-white/50 font-medium">Level</span>
      <div className="w-full bg-white/10 rounded-full h-1 mt-1">
        <div
          className="bg-brand-400 h-1 rounded-full transition-all duration-500"
          style={{ width: `${Math.min(100, (xp % 100))}%` }}
        />
      </div>
    </div>
  )
}
