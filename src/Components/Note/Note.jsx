import "./Note.css";
import delete_icon from "../../assets/delete.png";
import edit_icon from "../../assets/edit.png";

const Note = ({ note, dlt, edit }) => {
  return (
    <div className="note">
      <div className="note-body">
        <h2 className="note-title">{note.title}</h2>
        <p className="note-content">{note.note}</p>
      </div>
      <div className="note-footer">
        <div className="left">
          <div className="date-time">
            <span className="month-span">{note.dateTime.month}</span>
            <span>{note.dateTime.time}</span>
            {note.isEdit && <span className="edit">(edited)</span>}
          </div>
        </div>
        <div className="right">
          <button className="note-btn" onClick={edit}>
            <img src={edit_icon} alt="" className="note-edit" />
          </button>
          <button className="note-btn" onClick={dlt}>
            <img src={delete_icon} className="note-icon" />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Note;
