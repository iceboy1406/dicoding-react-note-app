import React from 'react'
interface ModalTitleProps {
  value: string
}
const ModalTitle = ({ value }: ModalTitleProps) => {
  return <h1 className="text-2xl text-gray-700 font-semibold">{value}</h1>
}

export default ModalTitle
