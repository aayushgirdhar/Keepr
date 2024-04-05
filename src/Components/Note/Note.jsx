/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { formatDistanceToNow } from "date-fns";

import "./Note.css";
import DoneIcon from "@mui/icons-material/Done";

import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Note = ({ note }) => {
  const { user, dispatch } = useContext(UserContext);
  const [isEdit, setEdit] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

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

  const handleChange = async () => {
    const updatedNotes = user.notes.map((n) => {
      if (n.id === note.id) {
        return { ...note, title, text, isEdit: true };
      } else {
        return n;
      }
    });
    console.log(updatedNotes);
    dispatch({ type: "EDIT_NOTE", payload: updatedNotes });
    const userRef = doc(db, "users", user.id);
    await updateDoc(userRef, {
      notes: updatedNotes,
    });
    setEdit(false);
  };

  return (
    <div className="note">
      <div className="note-body">
        <h2
          contentEditable={isEdit}
          suppressContentEditableWarning={true}
          onInput={(e) => {
            setTitle(e.currentTarget.textContent);
          }}
          className="note-title"
        >
          {note.title}
        </h2>
        <p
          className="note-content"
          contentEditable={isEdit}
          suppressContentEditableWarning={true}
          onInput={(e) => {
            setText(e.currentTarget.textContent);
          }}
        >
          {note.text}
        </p>
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
          {isEdit ? (
            <button className="note-btn" onClick={handleChange}>
              <DoneIcon />
            </button>
          ) : (
            <button className="note-btn" onClick={() => setEdit(true)}>
              <EditIcon />
            </button>
          )}

          <button className="note-btn" onClick={() => handleDelete(note)}>
            <DeleteIcon />
          </button>
        </div>
      </div>
    </div>
  );
};
export default Note;
