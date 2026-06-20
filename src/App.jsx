import Navbar from './Component/Navbar'
import './App.css'
import { useEffect, useState } from 'react'
import Card from './Component/Card'

function App() {

  const [notes, setNotes] = useState([])
  const [currentNote, setcurrentNote] = useState({ title: "", desc: "" })

  useEffect(() => {
    console.log("I am use effect")
    let localNotes = localStorage.getItem("notes")
    if (localNotes) {
      setNotes(JSON.parse(localNotes))
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setNotes([...notes, currentNote])
    setcurrentNote({ title: "", desc: "" })
    localStorage.setItem("notes", JSON.stringify([...notes, currentNote]))
  }

  const deleteNote = (title) => {
    setNotes(notes.filter(item => item.title !== title))
    localStorage.setItem("notes", JSON.stringify(notes.filter(item => item.title !== title)))
  }

  const handleChange = (e) => {
    setcurrentNote({ ...currentNote, [e.target.name]: e.target.value })
  }

  return (
    <>
      <Navbar />
      <main>
        <h1>Create your note</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="title">Title</label>
            <input value={currentNote.title} onChange={handleChange} type="text" name="title" id="title" placeholder='Title' />
          </div>
          <div>
            <label htmlFor="desc">Description</label>
            <textarea name="desc" id="desc" onChange={handleChange} value={currentNote.desc} placeholder='Start writing...' ></textarea>
          </div>
          <button>Submit</button>
        </form>
      </main>

      <section className='noteSection'>
        <h2 className='ynTxt'>Your Notes</h2>
        <div className='container'>
          {notes && notes.map(note => {
            return <Card key={note.title} deleteNote={deleteNote} title={note.title} desc={note.desc} />
          })}
          {notes.length == 0 && <div>Add a note to continue</div>}
        </div>
      </section>
      <footer>
        <div className='copySec'>
          &copy; {new Date().getFullYear()} NoteX. All rights reserved. <br />
        </div>
        <div className='devBy'>
          Created with 💗 By Yagnik
        </div>
        <div className='contacts'>
          <ul>
            <li>
              <a href="https://github.com/YagnikUkani" target="_blank" rel="noopener noreferrer">GitHub</a>
            </li>
            <li>
              <a href="mailto:ukanicommunis@gmail.com">Email</a>
            </li>
            <li>
              <a href="https://linktr.ee/yagnikukani" target="_blank" rel="noopener noreferrer">LinkTree </a>
            </li>
          </ul>
        </div>
      </footer>
    </>
  )
}

export default App
