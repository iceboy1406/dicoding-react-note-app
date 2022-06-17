import React, { MouseEventHandler } from 'react'
import { FiX } from 'react-icons/fi'
interface ModalCloseButtonProps {
  onClick: MouseEventHandler<HTMLButtonElement>
}
const ModalCloseButton = ({ onClick }: ModalCloseButtonProps) => {
  return (
    <button
      className="p-2.5 bg-white text-base rounded"
      onClick={onClick}
    >
      <FiX />
    </button>
  )
}

export default ModalCloseButton
