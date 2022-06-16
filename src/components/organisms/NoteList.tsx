import ZeroNoteMessage from 'components/atoms/text/ZeroNoteMessage'
import React, { ReactNode, useEffect, useState } from 'react'
interface NoteListProps {
  children: ReactNode
}
const NoteList = ({ children }: NoteListProps) => {
  const [hasChildren, setHasChildren] = useState(false)
  useEffect(() => {
    setHasChildren(React.Children.count(children) > 0)
  }, [children])
  return (
    <ul
      className={`${
        hasChildren
          ? 'columns-1 sm:columns-2 gap-4 pr-2'
          : 'grid place-items-center h-full'
      }`}
    >
      {hasChildren ? children : <ZeroNoteMessage value='Tidak ada catatan' />}
    </ul>
  )
}

export default NoteList
