import React, { ForwardedRef, forwardRef } from 'react'
interface TextAreaProps {
  id?: string
  placeholder?: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
  className?: string
  onKeyUp?: React.KeyboardEventHandler<HTMLTextAreaElement>
  onKeyDown?: React.KeyboardEventHandler<HTMLTextAreaElement>
  required?: boolean
  rows?: number
}
const TextArea = forwardRef(
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
      rows = 5
    }: TextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>
  ) => {
    return (
      <textarea
        ref={ref}
        id={id}
        className={`bg-white text-base text-gray-600 placeholder:text-gray-500 flex-grow px-5 py-2.5 rounded border border-transparent focus:border-primary-500 ${className}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={'off'}
        onKeyUp={onKeyUp}
        onKeyDown={onKeyDown}
        rows={rows}
        required={required}
      ></textarea>
    )
  }
)

export default TextArea
