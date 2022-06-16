import { ReactNode } from "react"

interface IconButtonProps {
  children: ReactNode
  theme?: 'primary' | 'danger' | 'secondary' | 'info'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
  tooltip?:string
}
const IconButton = ({
  children,
  theme = 'primary',
  onClick = () => {},
  className = '',
  tooltip = ''
}: IconButtonProps) => {
  const themeStyle = (() => {
    switch (theme) {
      case 'primary':
        return 'bg-primary-500 text-white hover:shadow-primary-500/[.5]'
      case 'danger':
        return 'bg-danger-500 text-white hover:shadow-danger-500/[.5]'
      case 'info':
        return 'bg-info-500 text-white hover:shadow-info-500/[.5]'
    }
  })()
  return (
    <button
      className={`w-fit h-fit rounded text-white text-lg p-2 hover:shadow-lg active:shadow-none transition-all duration-300 ${themeStyle} ${className}`}
      onClick={onClick}
      title={tooltip}
    >
      {children}
    </button>
  )
}

export default IconButton
