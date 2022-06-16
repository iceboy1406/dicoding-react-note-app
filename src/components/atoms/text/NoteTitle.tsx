interface NoteTitleProps {
  value: string
}
const NoteTitle = ({ value }: NoteTitleProps) => {
  return (
    <h1 className="text-2xl text-gray-700 font-semibold">{value}</h1>
  )
}

export default NoteTitle
