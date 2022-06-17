import { ReactNode } from 'react'
interface NoteCardProps {
  children: ReactNode
  borderLeftNumber: number
}
const NoteCard = ({ children, borderLeftNumber }: NoteCardProps) => {
  const inputNumber =
    borderLeftNumber < 0
      ? ((borderLeftNumber * -1) % 17) + 1
      : (borderLeftNumber % 17) + 1
  const borderColor = (() => {
    switch (inputNumber) {
      case 1:
        return 'border-l-red-500'
      case 2:
        return 'border-l-indigo-500'
      case 3:
        return 'border-l-sky-500'
      case 4:
        return 'border-l-emerald-500'
      case 5:
        return 'border-l-orange-500'
      case 6:
        return 'border-l-violet-500'
      case 7:
        return 'border-l-amber-500'
      case 8:
        return 'border-l-green-500'
      case 9:
        return 'border-l-yellow-500'
      case 10:
        return 'border-l-cyan-500'
      case 11:
        return 'border-l-rose-500'
      case 12:
        return 'border-l-blue-500'
      case 13:
        return 'border-l-pink-500'
      case 14:
        return 'border-l-lime-500'
      case 15:
        return 'border-l-fuchsia-500'
      case 16:
        return 'border-l-teal-500'
      case 17:
        return 'border-l-purple-500'
      default:
        return 'border-l-primary-500'
    }
  })()
  return (
    <li
      className={`w-full inline-flex flex-col gap-4 p-5 mb-4 rounded border-l-4 bg-white ${borderColor}`}
    >
      {children}
    </li>
  )
}

export default NoteCard
