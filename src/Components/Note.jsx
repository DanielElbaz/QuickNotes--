import './Note.css'

function Note({ text }) {

    
    return (
        <>
            <div className="note-card">
                
                <p>{text}</p>
                
            </div>
        </>
    )
}

export default Note;