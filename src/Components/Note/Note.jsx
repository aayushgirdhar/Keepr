import "./Note.css";
import delete_icon from "../../assets/delete.png";

const Note = ({ note, dlt }) => {
  return (
    <div className="note">
      <div className="note-body">
        <h2 className="note-title">{note.title}</h2>
        <p className="note-content">{note.note}</p>
      </div>
      <div className="note-footer">
        <p>{note.date}</p>
        <button className="note-btn" onClick={dlt}>
          <img src={delete_icon} className="note-icon" />
        </button>
      </div>
    </div>
  );
};
export default Note;
