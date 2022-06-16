import NoteContent from 'components/atoms/text/NoteContent'
import NoteDate from 'components/atoms/text/NoteDate'
import NoteTitle from 'components/atoms/text/NoteTitle'

interface NoteProps {
  title: string
  date: string
  content: string
}
const Note = ({ content, date, title }: NoteProps) => {
  return (
    <article className="flex flex-col gap-3">
      <div className="flex flex-col gap-1">
        <NoteTitle value={title} />
        <NoteDate value={date} />
      </div>
      <NoteContent value={content} />
    </article>
  )
}

export default Note
