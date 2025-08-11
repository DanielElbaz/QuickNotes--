import './Note.css'
import dayjs from 'dayjs';

function Note({ id,text, createdAt, onDelete }) {
    const dateLabel = dayjs(createdAt).format('DD/MM/YYYY HH:mm');

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete your note?")) {
            onDelete(id);
        }
    };
    return (
        <>
            <div className="note-card">
                <div className='date-delete'>
                    <small className="note-date">{dateLabel}</small>
                    <button className='delete-btn' onClick={handleDelete}>&times;</button>
                </div>

                <p>{text}</p>

            </div>
        </>
    )
}

export default Note;