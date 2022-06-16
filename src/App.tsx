import Header from 'components/organisms/Header'
import NavBrand from 'components/atoms/NavBrand'
import TabBar from 'components/molecules/TabBar'
import TabItem from 'components/atoms/TabItem'
import DefaultLayout from 'components/templates/DefaultLayout'
import { useEffect, useState } from 'react'
import SearchInput from 'components/atoms/input/SearchInput'
import Button from 'components/atoms/button/Button'
import NoteCard from 'components/molecules/NoteCard'
import NoteList from 'components/organisms/NoteList'
import NoteBody from 'components/molecules/NoteBody'
import NoteAction from 'components/molecules/NoteAction'
import IconButton from 'components/atoms/button/IconButton'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { MdArchive, MdUnarchive } from 'react-icons/md'
import { getFormattedDate, getInitialData, Note } from 'utils'
function App() {
  const [notes, setNotes] = useState<Note[]>(getInitialData)
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([])
  const [activeNotes, setActiveNotes] = useState<Note[]>([])
  const [activeNoteTabSelected, setActiveNoteTabSelected] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    setActiveNotes(
      notes.filter(
        (note) =>
          note.archived === false &&
          note.title.match(new RegExp(searchValue, 'gi'))
      )
    )
    setArchivedNotes(
      notes.filter(
        (note) =>
          note.archived === true &&
          note.title.match(new RegExp(searchValue, 'gi'))
      )
    )
  }, [notes, searchValue])
  const findById = (id: number) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    return { data: notes[noteIndex], index: noteIndex }
  }
  const archiveNote = (id: number) => {
    const note = findById(id)
    note.data.archived = true
    const currentNotes = [...notes]
    currentNotes.splice(note.index, 1, note.data)
    setNotes(currentNotes)
  }
  const unarchiveNote = (id: number) => {
    const note = findById(id)
    note.data.archived = false
    const currentNotes = [...notes]
    currentNotes.splice(note.index, 1, note.data)
    setNotes(currentNotes)
  }
  return (
    <DefaultLayout>
      <Header>
        <NavBrand />
        <TabBar>
          <TabItem
            value="Catatan Aktif"
            active={activeNoteTabSelected}
            onClick={() => setActiveNoteTabSelected(true)}
          />
          <TabItem
            value="Arsip"
            active={!activeNoteTabSelected}
            onClick={() => setActiveNoteTabSelected(false)}
          />
        </TabBar>
      </Header>
      <div className="flex flex-col gap-2 sm:flex-row">
        <SearchInput
          id="search-input"
          placeholder="Cari berdasarkan judul"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="flex-grow"
        />
        <Button className="w-full sm:w-fit">Tambah Catatan</Button>
      </div>
      <main className="flex-grow overflow-y-auto">
        <NoteList>
          {activeNoteTabSelected
            ? activeNotes.map((note, index) => {
                return (
                  <NoteCard borderLeftNumber={index} key={note.id}>
                    <NoteBody
                      title={note.title}
                      date={getFormattedDate(note.createdAt)}
                      content={note.body}
                    />
                    <NoteAction>
                      <IconButton theme="primary" tooltip="Edit">
                        <FiEdit />
                      </IconButton>
                      <IconButton theme="danger" tooltip="Hapus">
                        <FiTrash2 />
                      </IconButton>
                      <IconButton
                        theme="info"
                        tooltip="Arsipkan"
                        onClick={() => archiveNote(note.id)}
                      >
                        <MdArchive />
                      </IconButton>
                    </NoteAction>
                  </NoteCard>
                )
              })
            : archivedNotes.map((note, index) => {
                return (
                  <NoteCard borderLeftNumber={index} key={note.id}>
                    <NoteBody
                      title={note.title}
                      date={getFormattedDate(note.createdAt)}
                      content={note.body}
                    />
                    <NoteAction>
                      <IconButton theme="primary" tooltip="Edit">
                        <FiEdit />
                      </IconButton>
                      <IconButton theme="danger" tooltip="Hapus">
                        <FiTrash2 />
                      </IconButton>
                      <IconButton
                        theme="info"
                        tooltip="Pindahkan Dari Arsip"
                        onClick={() => unarchiveNote(note.id)}
                      >
                        <MdUnarchive />
                      </IconButton>
                    </NoteAction>
                  </NoteCard>
                )
              })}
        </NoteList>
      </main>
      <footer className="text-base text-gray-700 text-center">
        © Copyright (C) 2022. Created by Eko Susilo
      </footer>
    </DefaultLayout>
  )
}

export default App
