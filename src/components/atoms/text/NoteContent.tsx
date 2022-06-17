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
      setContent(value.split(' ').slice(0, 65).join(' '))
    }
  }, [showMore,value])
  return (
    <p className="text-base text-gray-600 font-normal leading-5">
      {content}
      {value.split(' ').length > 65 ? (
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
