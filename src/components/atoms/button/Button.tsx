import { ReactNode } from "react"

interface ButtonProps {
  children: ReactNode
  theme?: 'primary' | 'danger' | 'secondary' | 'info'
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  className?: string
}
const Button = ({
  children,
  theme = 'primary',
  onClick = () => {},
  className = '',
}: ButtonProps) => {
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
      className={`h-fit rounded text-white text-base px-5 py-3 hover:shadow-lg active:shadow-none transition-all duration-300 ${themeStyle} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
