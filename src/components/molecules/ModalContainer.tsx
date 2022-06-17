import { LegacyRef, ReactNode, useEffect, useRef } from 'react'
interface ModalContainerProps {
  children: ReactNode
  onClose?: Function
  onOpen?: Function
  visible: boolean
}
const ModalContainer = ({
  children,
  visible,
  onClose = () => {},
  onOpen = () => {},
}: ModalContainerProps) => {
  const containerRef: LegacyRef<HTMLDivElement> = useRef(null)
  useEffect(() => {
    document.body.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    if (visible === true) {
      onOpen()
    }
    if (visible === false) {
      onClose()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible])
  return (
    <div
      ref={containerRef}
      onClick={(e) => {
        if (e.target === containerRef.current) {
          onClose()
        }
      }}
      className={`${
        visible ? 'grid place-items-center' : 'hidden'
      } px-6 py-8 fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-60`}
    >
      {children}
    </div>
  )
}

export default ModalContainer
