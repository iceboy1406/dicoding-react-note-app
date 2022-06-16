interface ZeroNoteMessageProps {
    value:string
}
const ZeroNoteMessage = ({value}:ZeroNoteMessageProps) => {
  return (
    <p className="text-lg text-gray-700 font-normal">{value}</p>
  )
}

export default ZeroNoteMessage