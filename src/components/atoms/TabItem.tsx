import { MouseEventHandler } from 'react'
interface TabItemProps {
  active?: boolean
  value: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}
const TabItem = ({
  active = false,
  value,
  onClick = () => {},
}: TabItemProps) => {
  return (
    <button
      type="button"
      className={`px-4 py-3 md:px-7 rounded select-none ${
        active
          ? 'bg-primary-500 text-white'
          : 'bg-transparent text-gray-600 hover:bg-gray-200'
      } transition-all duration-300`}
      onClick={onClick}
    >
      {value}
    </button>
  )
}

export default TabItem
