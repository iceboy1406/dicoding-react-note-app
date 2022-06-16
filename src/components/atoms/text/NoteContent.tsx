import { useEffect, useState } from 'react'

interface NoteContentProps {
  value: string
}
const NoteContent = ({ value }: NoteContentProps) => {
  const [content, setContent] = useState(value)
  const [showMore, setShowMore] = useState(false)
  useEffect(() => {
    if (showMore) {
      setContent(value)
    } else {
      setContent(value.split(' ').slice(0, 75).join(' '))
    }
  }, [showMore])
  return (
    <p className="text-base text-gray-600 font-normal leading-5 text-justify">
      {content}
      {value.split(' ').length > 75 ? (
        <>
          <button
            type="button"
            className="text-primary-500"
            onClick={() => setShowMore(!showMore)}
          >
            ...{showMore ? 'Lihat lebih sedikit' : 'Lihat Selengkapnya'}
          </button>
        </>
      ) : (
        ''
      )}
    </p>
  )
}

export default NoteContent
