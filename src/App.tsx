import Header from 'components/organisms/Header'
import NavBrand from 'components/atoms/NavBrand'
import TabBar from 'components/molecules/TabBar'
import TabItem from 'components/atoms/TabItem'
import DefaultLayout from 'components/templates/DefaultLayout'
import { LegacyRef, useEffect, useRef, useState } from 'react'
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
import ModalContainer from 'components/molecules/ModalContainer'
import TextInput from 'components/atoms/input/TextInput'
import TextArea from 'components/atoms/input/TextArea'
import ModalCard from 'components/molecules/ModalCard'
import ModalHeader from 'components/molecules/ModalHeader'
import ModalTitle from 'components/atoms/text/ModalTitle'
import ModalCloseButton from 'components/atoms/button/ModalCloseButton'
function App() {
  const [notes, setNotes] = useState<Note[]>(getInitialData)
  const [archivedNotes, setArchivedNotes] = useState<Note[]>([])
  const [activeNotes, setActiveNotes] = useState<Note[]>([])
  const [activeNoteTabSelected, setActiveNoteTabSelected] = useState(true)
  const [searchValue, setSearchValue] = useState('')

  const [activeId, setActiveId] = useState(0)
  // Modals Visibility
  const [archiveConfirmationModal, setArchiveConfirmationModal] =
    useState(false)
  const [unarchiveConfirmationModal, setUnarchiveConfirmationModal] =
    useState(false)
  const [deleteNoteConfirmationModal, setDeleteNoteConfirmationModal] =
    useState(false)
  const [addNoteModal, setAddNoteModal] = useState(false)
  const [editNoteModal, setEditNoteModal] = useState(false)

  // Field value
  const [noteTitleValue, setNoteTitleValue] = useState('')
  const [noteBodyValue, setNoteBodyValue] = useState('')

  // ref
  const noteTitleInputRef: LegacyRef<HTMLInputElement> = useRef(null)
  const noteTitleInputRef2: LegacyRef<HTMLInputElement> = useRef(null)
  useEffect(() => {
    setActiveNotes(
      notes.filter(
        (note) =>
          note.archived === false &&
          note.title.match(new RegExp(searchValue.trim(), 'gi'))
      )
    )
    setArchivedNotes(
      notes.filter(
        (note) =>
          note.archived === true &&
          note.title.match(new RegExp(searchValue.trim(), 'gi'))
      )
    )
  }, [notes, searchValue])
  const findById = (id: number) => {
    const noteIndex = notes.findIndex((note) => note.id === id)
    return { data: notes[noteIndex], index: noteIndex }
  }
  const archiveNote = () => {
    const oldNote = findById(activeId)
    const currentNotes = [...notes]
    currentNotes.splice(oldNote.index, 1, { ...oldNote.data, archived: true })
    setNotes(currentNotes)
    setArchiveConfirmationModal(false)
  }
  const unarchiveNote = () => {
    const oldNote = findById(activeId)
    const currentNotes = [...notes]
    currentNotes.splice(oldNote.index, 1, { ...oldNote.data, archived: false })
    setNotes(currentNotes)
    setUnarchiveConfirmationModal(false)
  }
  const addNote = () => {
    const newNote: Note = {
      id: +new Date(),
      archived: false,
      createdAt: new Date().toISOString(),
      title: noteTitleValue.trim(),
      body: noteBodyValue.trim(),
    }
    const currentNotes = [...notes]
    currentNotes.push(newNote)
    setNotes(currentNotes)
    setAddNoteModal(false)
  }

  const editNote = () => {
    const oldNote = findById(activeId)
    const newNote: Note = {
      ...oldNote.data,
      title: noteTitleValue.trim(),
      body: noteBodyValue.trim(),
    }
    const currentNotes = [...notes]
    currentNotes.splice(oldNote.index, 1, newNote)
    setNotes(currentNotes)
    setEditNoteModal(false)
  }
  const deleteNote = () => {
    const wantToDeleteNote = findById(activeId)
    const currentNotes = [...notes]
    currentNotes.splice(wantToDeleteNote.index, 1)
    setNotes(currentNotes)
    setDeleteNoteConfirmationModal(false)
  }

  const resetForm = () => {
    setNoteTitleValue('')
    setNoteBodyValue('')
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
          onChange={(e) =>
            setSearchValue(e.target.value.trimStart().replace(/ +(?= )/g, ''))
          }
          className="flex-grow"
        />
        <Button
          className="w-full sm:w-fit"
          onClick={() => setAddNoteModal(true)}
        >
          Buat Catatan
        </Button>
      </div>
      <main className="flex-grow overflow-y-auto">
        <NoteList>
          {activeNoteTabSelected
            ? activeNotes.map((note) => {
                return (
                  <NoteCard borderLeftNumber={note.id} key={note.id}>
                    <NoteBody
                      title={note.title}
                      date={getFormattedDate(note.createdAt)}
                      content={note.body}
                    />
                    <NoteAction>
                      <IconButton
                        theme="primary"
                        tooltip="Edit"
                        onClick={() => {
                          setActiveId(note.id)
                          setNoteTitleValue(note.title)
                          setNoteBodyValue(note.body)
                          setEditNoteModal(true)
                        }}
                      >
                        <FiEdit />
                      </IconButton>
                      <IconButton
                        theme="danger"
                        tooltip="Hapus"
                        onClick={() => {
                          setActiveId(note.id)
                          setDeleteNoteConfirmationModal(true)
                        }}
                      >
                        <FiTrash2 />
                      </IconButton>
                      <IconButton
                        theme="info"
                        tooltip="Arsipkan"
                        onClick={() => {
                          setActiveId(note.id)
                          setArchiveConfirmationModal(true)
                        }}
                      >
                        <MdArchive />
                      </IconButton>
                    </NoteAction>
                  </NoteCard>
                )
              })
            : archivedNotes.map((note) => {
                return (
                  <NoteCard borderLeftNumber={note.id} key={note.id}>
                    <NoteBody
                      title={note.title}
                      date={getFormattedDate(note.createdAt)}
                      content={note.body}
                    />
                    <NoteAction>
                      <IconButton
                        theme="primary"
                        tooltip="Edit"
                        onClick={() => {
                          setActiveId(note.id)
                          setNoteTitleValue(note.title)
                          setNoteBodyValue(note.body)
                          setEditNoteModal(true)
                        }}
                      >
                        <FiEdit />
                      </IconButton>
                      <IconButton
                        theme="danger"
                        tooltip="Hapus"
                        onClick={() => {
                          setActiveId(note.id)
                          setDeleteNoteConfirmationModal(true)
                        }}
                      >
                        <FiTrash2 />
                      </IconButton>
                      <IconButton
                        theme="info"
                        tooltip="Pindahkan Dari Arsip"
                        onClick={() => {
                          setActiveId(note.id)
                          setUnarchiveConfirmationModal(true)
                        }}
                      >
                        <MdUnarchive />
                      </IconButton>
                    </NoteAction>
                  </NoteCard>
                )
              })}
        </NoteList>
      </main>
      {/* Modals */}
      {/* Add Note Modals */}
      <ModalContainer
        visible={addNoteModal}
        onClose={() => {
          setAddNoteModal(false)
          resetForm()
        }}
        onOpen={() => {
          noteTitleInputRef.current?.focus()
        }}
      >
        <ModalCard visible={addNoteModal}>
          <ModalHeader>
            <ModalTitle value="Buat Catatan" />
            <ModalCloseButton onClick={() => setAddNoteModal(false)} />
          </ModalHeader>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              addNote()
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm text-right text-gray-600">
                {noteTitleValue.length}/50
              </p>
              <TextInput
                ref={noteTitleInputRef}
                placeholder="Judul Catatan"
                className="w-full"
                onChange={(e) => {
                  setNoteTitleValue(
                    e.target.value
                      .substring(0, 50)
                      .trimStart()
                      .replace(/ +(?= )/g, '')
                  )
                }}
                value={noteTitleValue}
                required
              />
            </div>
            <TextArea
              rows={8}
              value={noteBodyValue}
              onChange={(e) =>
                setNoteBodyValue(
                  e.target.value.trimStart().replace(/ +(?= )/g, '')
                )
              }
              placeholder="Isi Catatan"
              required
            />
            <Button type="submit">Simpan</Button>
          </form>
        </ModalCard>
      </ModalContainer>
      {/* End Add Note Modals */}
      {/* Edit Note Modals */}
      <ModalContainer
        visible={editNoteModal}
        onClose={() => {
          setEditNoteModal(false)
          resetForm()
        }}
        onOpen={() => {
          noteTitleInputRef2.current?.focus()
        }}
      >
        <ModalCard visible={editNoteModal}>
          <ModalHeader>
            <ModalTitle value="Edit Catatan" />
            <ModalCloseButton onClick={() => setEditNoteModal(false)} />
          </ModalHeader>
          <form
            className="flex flex-col gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              editNote()
            }}
          >
            <div className="flex flex-col gap-1">
              <p className="text-sm text-right text-gray-600">
                {noteTitleValue.length}/50
              </p>
              <TextInput
                ref={noteTitleInputRef2}
                placeholder="Judul Catatan"
                className="w-full"
                onChange={(e) => {
                  setNoteTitleValue(
                    e.target.value
                      .substring(0, 50)
                      .trimStart()
                      .replace(/ +(?= )/g, '')
                  )
                }}
                value={noteTitleValue}
                required
              />
            </div>
            <TextArea
              value={noteBodyValue}
              onChange={(e) =>
                setNoteBodyValue(
                  e.target.value.trimStart().replace(/ +(?= )/g, '')
                )
              }
              placeholder="Isi Catatan"
              required
              rows={8}
            />
            <Button type="submit">Simpan</Button>
          </form>
        </ModalCard>
      </ModalContainer>
      {/* End Edit Note Modals */}
      {/* Archive Note Confirmation Modals */}
      <ModalContainer
        visible={archiveConfirmationModal}
        onClose={() => {
          setArchiveConfirmationModal(false)
          resetForm()
        }}
        onOpen={() => {
          noteTitleInputRef.current?.focus()
        }}
      >
        <ModalCard visible={archiveConfirmationModal}>
          <p className="text-xl text-gray-700 ">
            Apakah anda yakin ingin mengarsipkannya?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              theme="secondary"
              onClick={() => setArchiveConfirmationModal(false)}
            >
              Batal
            </Button>
            <Button onClick={() => archiveNote()}>Yakin</Button>
          </div>
        </ModalCard>
      </ModalContainer>
      {/* End Archive Note Confirmation Modals */}
      {/* Archive Note Confirmation Modals */}
      <ModalContainer
        visible={unarchiveConfirmationModal}
        onClose={() => {
          setUnarchiveConfirmationModal(false)
          resetForm()
        }}
        onOpen={() => {
          noteTitleInputRef.current?.focus()
        }}
      >
        <ModalCard visible={unarchiveConfirmationModal}>
          <p className="text-xl text-gray-700 ">
            Apakah anda yakin ingin memindahkannya dari arsip?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              theme="secondary"
              onClick={() => setUnarchiveConfirmationModal(false)}
            >
              Batal
            </Button>
            <Button onClick={() => unarchiveNote()}>Yakin</Button>
          </div>
        </ModalCard>
      </ModalContainer>
      {/* End Archive Note Confirmation Modals */}
      {/* Delete Note Confirmation Modals */}
      <ModalContainer
        visible={deleteNoteConfirmationModal}
        onClose={() => {
          setDeleteNoteConfirmationModal(false)
          resetForm()
        }}
        onOpen={() => {
          noteTitleInputRef.current?.focus()
        }}
      >
        <ModalCard visible={deleteNoteConfirmationModal}>
          <p className="text-xl text-gray-700 ">
            Apakah anda yakin ingin menghapusnya?
          </p>
          <div className="flex justify-end gap-2">
            <Button
              theme="secondary"
              onClick={() => setDeleteNoteConfirmationModal(false)}
            >
              Batal
            </Button>
            <Button theme="danger" onClick={() => deleteNote()}>
              Yakin
            </Button>
          </div>
        </ModalCard>
      </ModalContainer>
      {/* Delete Note Confirmation Modals */}
      {/* End Modals */}
      <footer className="text-base text-gray-700 text-center">
        © Copyright (C) 2022. Created by Eko Susilo
      </footer>
    </DefaultLayout>
  )
}

export default App
