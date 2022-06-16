import { ReactNode } from 'react'
interface TabBarProps {
  children: ReactNode
}
const TabBar = ({ children }: TabBarProps) => {
  return <div className='grid grid-cols-2 gap-1'>{children}</div>
}

export default TabBar
