/* eslint-disable react/prop-types */
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { formatDistanceToNow } from "date-fns";

import "./Note.css";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Note = ({ note }) => {
  const { user, dispatch } = useContext(UserContext);

  const handleDelete = async (note) => {
    dispatch({ type: "DELETE_NOTE", payload: note.id });
    if (user.id !== "") {
      // delete note from the database
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        notes: arrayRemove(note),
      });
    }
  };

  return (
    <div className="note">
      <div className="note-body">
        <h2 className="note-title">{note.title}</h2>
        <p className="note-content">{note.text}</p>
      </div>
      <div className="note-footer">
        <div className="left">
          <div className="date-time">
            {formatDistanceToNow(new Date(note.date), {
              addSuffix: true,
            })}
            {note.isEdit && <span className="edit"> (edited) </span>}
          </div>
        </div>
        <div className="right">
          <button className="note-btn">
            <EditIcon />
          </button>
          <button className="note-btn" onClick={() => handleDelete(note)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Note;
