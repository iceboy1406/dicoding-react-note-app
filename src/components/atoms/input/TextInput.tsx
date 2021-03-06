import React, { ForwardedRef, forwardRef } from 'react'
interface TextInputProps {
  id?: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLInputElement>
  className?: string
  onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>
  required?: boolean
}
const TextInput = forwardRef(
  (
    {
      id,
      placeholder,
      value,
      onChange,
      className,
      onKeyUp,
      onKeyDown,
      required,
    }: TextInputProps,
    ref: ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <input
        ref={ref}
        type="text"
        id={id}
        className={`bg-white text-base text-gray-600 placeholder:text-gray-500 flex-grow px-5 py-2.5 rounded border border-transparent focus:border-primary-500 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={'off'}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        required={required}
      />
    )
  }
)

export default TextInput
export type { TextInputProps }
