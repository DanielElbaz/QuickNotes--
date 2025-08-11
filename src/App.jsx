import { useState } from 'react'
import './App.css'
import Note from './Components/Note';

function App() {

  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");

  const createNote = () => {
    setNotes(initial => [...initial, text]);
    setText(""); 

  }
  
  return (
    <>
      <div className="notes">
        <textarea placeholder='My Note' rows={10} value={text} onChange={(e) => { setText(e.target.value) }}> </textarea>
        <button onClick={createNote}>Add</button>        
      </div>
      <div className='note-container'>{notes.map((note,index)=>(<Note text={note} key={index}/>))}</div>
      
    </>
  )
}

export default App
