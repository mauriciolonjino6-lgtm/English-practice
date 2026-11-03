import { BookOpen } from 'lucide-react'

interface Props { count: number }

export default function VocabCard({ count }: Props) {
  return (
    <div className="glass p-3 flex flex-col items-center gap-1">
      <BookOpen size={20} className="text-emerald-400" />
      <span className="text-xl font-bold">{count}</span>
      <span className="text-[10px] text-white/50 font-medium">Words</span>
    </div>
  )
}
