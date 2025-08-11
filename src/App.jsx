import { useState } from 'react'
import './App.css'
import Note from './Components/Note';

function App() {

  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const createNote = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const newNote = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      text: trimmed,
      createdAt: new Date().toISOString()
    };

    setNotes(prev => [...prev, newNote]);
    setText("");
  };
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  return (
    <>
      <div className="notes">
        <textarea placeholder='My Note' rows={10} value={text} onChange={(e) => { setText(e.target.value) }}> </textarea>
        <button onClick={createNote}>Add</button>
      </div>
      <div className='note-container'>{notes.map((note, index) => (<Note
        key={note.id}                
        id={note.id}
        text={note.text}
        createdAt={note.createdAt}
        onDelete={deleteNote}
      />))}</div>

    </>
  )
}

export default App
