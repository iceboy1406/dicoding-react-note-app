interface NoteDateProps {
  value: string
}
const NoteDate = ({ value }: NoteDateProps) => {
  return (
    <p className="text-base text-gray-500 font-light leading-5">{value}</p>
  )
}

export default NoteDate
