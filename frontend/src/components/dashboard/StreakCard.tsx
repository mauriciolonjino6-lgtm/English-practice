import { Flame } from 'lucide-react'

interface Props { streak: number }

export default function StreakCard({ streak }: Props) {
  return (
    <div className="glass p-3 flex flex-col items-center gap-1">
      <Flame size={20} className="text-orange-400" />
      <span className="text-xl font-bold">{streak}</span>
      <span className="text-[10px] text-white/50 font-medium">Day streak</span>
    </div>
  )
}
