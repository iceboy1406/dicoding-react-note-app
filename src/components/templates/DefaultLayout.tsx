import { ReactNode } from 'react'
interface DefaultLayoutProps {
  children: ReactNode
}
const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  return (
    <div className="w-screen h-screen overflow-hidden  px-6 py-4 bg-gray-50 flex flex-col items-center">
      <div className='w-full h-full max-w-3xl flex flex-col gap-4'>{children}</div>
    </div>
  )
}

export default DefaultLayout
