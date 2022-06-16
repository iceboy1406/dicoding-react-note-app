import React, { useState } from 'react'
import { FiSearch } from 'react-icons/fi'
interface SearchInputProps {
  id: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  className?:string
}
const SearchInput = ({
  id,
  placeholder = '',
  value,
  onChange,
  className = ''
}: SearchInputProps) => {
  const [isFocus, setIsFocus] = useState(false)
  return (
    <label
      className={`flex gap-2.5 items-center px-5 py-3 h-fit bg-white rounded cursor-text border ${
        isFocus ? 'border-primary-500' : 'border-transparent'
      } transition-all duration-300 ${className}`}
      htmlFor={id}
    >
      <FiSearch className="text-gray-600 text-xl" />
      <input
        type="search"
        id={id}
        className="bg-transparent text-base text-gray-600 placeholder:text-gray-500 flex-grow"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        autoComplete={'off'}
      />
    </label>
  )
}

export default SearchInput
