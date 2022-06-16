import React, { ReactNode } from 'react'
interface NoteActionProps {
    children: ReactNode
}
const NoteAction = ({children}:NoteActionProps) => {
  return (
    <div className='flex gap-1'>{children}</div>
  )
}

export default NoteAction