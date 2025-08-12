import './Note.css';
import dayjs from 'dayjs';

function Note({ id, title, text, createdAt, updatedAt, onDelete, onOpen }) {
  const created = dayjs(createdAt).format('DD/MM/YYYY HH:mm');
  const hasUpdate = updatedAt && updatedAt !== createdAt;
  const updated = hasUpdate ? dayjs(updatedAt).format('DD/MM/YYYY HH:mm') : null;

  const handleDelete = (e) => {
    e.stopPropagation();
    if (confirm("Are you sure you want to delete your note?")) {
      onDelete(id);
    }
  };

  return (
    <div className="note-card" onClick={onOpen} role="button" tabIndex={0}>
      <div className="date-delete">
        <div className="dates">
          <small className="note-date">Created: {created}</small>
          <br></br>
          {hasUpdate && (
            <small className="note-updated">Updated: {updated}</small>
          )}
        </div>
        <button className="delete-btn" onClick={handleDelete}>&times;</button>
      </div>

      {title && <h3 className="note-title">{title}</h3>}
      <p>{text}</p>
    </div>
  );
}

export default Note;
