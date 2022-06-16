import { ReactNode } from 'react'
interface NoteListProps {
    children: ReactNode
  }
const NoteList = ({children}:NoteListProps) => {
  return (
    <ul className='columns-1 sm:columns-2 gap-4 pr-2'>{children}</ul>
  )
}

export default NoteList