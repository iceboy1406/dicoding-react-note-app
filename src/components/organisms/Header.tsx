import { ReactNode } from 'react'
interface HeaderProps {
  children: ReactNode
}
const Header = ({ children }: HeaderProps) => {
  return (
    <header className="w-full bg-white p-4 rounded flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
      {children}
    </header>
  )
}

export default Header
