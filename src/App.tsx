import Header from 'components/organisms/Header'
import NavBrand from 'components/atoms/NavBrand'
import TabBar from 'components/molecules/TabBar'
import TabItem from 'components/atoms/TabItem'
import DefaultLayout from 'components/templates/DefaultLayout'
import { useState } from 'react'
import SearchInput from 'components/atoms/input/SearchInput'
import Button from 'components/atoms/button/Button'
import NoteCard from 'components/molecules/NoteCard'
import NoteList from 'components/organisms/NoteList'
import Note from 'components/molecules/Note'
function App() {
  const [activeNoteTabSelected, setActiveNoteTabSelected] = useState(true)
  const [searchValue, setSearchValue] = useState('')
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
          <NoteCard borderLeftNumber={0}>
            <Note
              title="Asyncronous Concepts on Javasript"
              date="Kamis, 16 Juni 2022"
              content={`Asynchronous means that things can happen independently of the main program flow. In the current consumer computers, every program runs for a specific time slot and then it stops its execution to let another program continue their execution. This thing runs in a cycle so fast that it's impossible to notice. We think our computers run many programs simultaneously, but this is an illusion (except on multiprocessor machines). Programs internally use interrupts, a signal that's emitted to the processor to gain the attention of the system. Let's not go into the internals of this now, but just keep in mind that it's normal for programs to be asynchronous and halt their execution until they need attention, allowing the computer to execute other things in the meantime. When a program is waiting for a response from the network, it cannot halt the processor until the request finishes. Normally, programming languages are synchronous and some provide a way to manage asynchronicity in the language or through libraries. C, Java, C#, PHP, Go, Ruby, Swift, and Python are all synchronous by default. Some of them handle async operations by using threads, spawning a new process.`}
            />
          </NoteCard>
          <NoteCard borderLeftNumber={0}>
            <Note
              title="WASM"
              date="Kamis, 16 Juni 2022"
              content={`WebAssembly (sometimes abbreviated Wasm) defines a portable binary-code format and a corresponding text format for executable programs as well as software interfaces for facilitating interactions between such programs and their host environment. WebAssembly.`}
            />
          </NoteCard>
        </NoteList>
      </main>
      <footer className="text-base text-gray-700 text-center">
        © Copyright (C) 2022. Created by Eko Susilo
      </footer>
    </DefaultLayout>
  )
}

export default App
