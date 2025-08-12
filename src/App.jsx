import { useState } from 'react'
import './App.css'
import Note from './Components/Note'
import { Modal, TextInput, Textarea, Group, Button } from '@mantine/core';
import dayjs from 'dayjs'

function App() {
  const [notes, setNotes] = useState([]);
  const [text, setText] = useState("");
  const [title, setTitle] = useState("");

  const [opened, setOpened] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const [editTitle, setEditTitle] = useState('');
  const [editText, setEditText] = useState('');


  const createNote = () => {
    const trimmed = text.trim();
    const trimmedTitle = title.trim();
    if (!trimmed) return;

    const newNote = {
      id: crypto.randomUUID?.() ?? String(Date.now()),
      title: trimmedTitle || null,
      text: trimmed,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setNotes(prev => [...prev, newNote]);
    setTitle("");
    setText("");
  };

  const deleteNote = (id) => {
    setNotes(prev => prev.filter(note => note.id !== id));

    if (selectedNote?.id === id) {
      setOpened(false);
      setSelectedNote(null);
    }
  };

  const openNote = (note) => {
    setSelectedNote(note);
    setEditTitle(note.title || '');
    setEditText(note.text || '');
    setOpened(true);
  };
  const applyAndClose = () => {
    if (selectedNote) {
      setNotes(prev =>
        prev.map(n =>
          n.id === selectedNote.id
            ? {
              ...n,
              title: editTitle.trim() ? editTitle.trim() : null,
              text: editText,
              updatedAt: new Date().toISOString()
            }
            : n
        )
      );
    }
    setOpened(false);
    setSelectedNote(null);
  };

  return (
    <>

      <div className="notes">
        <div className="note-form">
          <textarea
            className="title-field"
            placeholder="Title (optional)"
            rows={1}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="body-field"
            placeholder="My Note"
            rows={6}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="add-btn" onClick={createNote}>Add</button>
        </div>
      </div>


      <div className='note-container'>
        {notes.map((note) => (
          <Note
            key={note.id}
            id={note.id}
            text={note.text}
            createdAt={note.createdAt}
            updatedAt={note.updatedAt}
            onDelete={deleteNote}
            title={note.title}
            onOpen={() => openNote(note)}
          />
        ))}
      </div>


      <Modal
        opened={opened}
        onClose={applyAndClose}
        title={selectedNote ? dayjs(selectedNote.createdAt).format('DD/MM/YYYY HH:mm') : ''}
        centered
        size="xs"
        radius="md"
        overlayProps={{ opacity: 0.25, blur: 2 }}
      >{selectedNote && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ fontSize: 12, opacity: 0.6 }}>
            Created: {dayjs(selectedNote.createdAt).format('DD/MM/YYYY HH:mm')}
          </div>
          {selectedNote.updatedAt &&
            selectedNote.updatedAt !== selectedNote.createdAt && (
              <div style={{ fontSize: 12, opacity: 0.6 }}>
                Updated: {dayjs(selectedNote.updatedAt).format('DD/MM/YYYY HH:mm')}
              </div>
            )
          }
          <TextInput
            label="Title"
            placeholder="(optional)"
            value={editTitle}
            onChange={(e) => setEditTitle(e.currentTarget.value)}
          />
          <Textarea
            label="Note"
            minRows={6}
            autosize
            value={editText}
            onChange={(e) => setEditText(e.currentTarget.value)}
            styles={{
              input: {
                backgroundColor: '#fafafa',
                fontSize: 14,
                fontFamily: 'inherit',
              },
            }}
          />
          <Group justify="flex-end" mt="xs">
            <Button variant="default" onClick={applyAndClose}>
              Save & Close
            </Button>
          </Group>
        </div>
      )}
      </Modal>
    </>
  )
}

export default App
