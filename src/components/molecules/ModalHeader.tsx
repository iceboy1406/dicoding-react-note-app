import { ReactNode } from 'react'

interface ModalHeaderProps {
  children: ReactNode
}
const ModalHeader = ({ children }: ModalHeaderProps) => {
  return (
    <div className="flex justify-between gap-2 items-center">{children}</div>
  )
}

export default ModalHeader
