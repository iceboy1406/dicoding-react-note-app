import React, { ReactNode } from 'react'
interface ModalCardProps {
  children: ReactNode
  visible: boolean
}
const ModalCard = ({ children, visible }: ModalCardProps) => {
  return (
    <div
      className={`w-full max-w-[420px] bg-gray-50 p-6 rounded ${
        visible ? ' flex flex-col gap-4 animate-fadeDown' : 'hidden'
      }`}
    >
      {children}
    </div>
  )
}

export default ModalCard
