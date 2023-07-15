import { useState, useEffect, useCallback } from "react";
import NotesGrid from "../NotesGrid/NotesGrid";
import "./Input.css";
const Input = () => {
  const monthInitials = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [notes, setNotes] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem("notes"));
    if (userNotes) {
      setNotes(userNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const getDateTime = () => {
    const today = new Date();
    const date = today.getDate().toString();
    const month = monthInitials[today.getMonth()];
    const hours = today.getHours().toString();
    const mins = today.getMinutes().toString();

    return {
      month: date + " " + month,
      time: hours + ":" + mins,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsExpanded(false);

    const formData = new FormData(e.currentTarget);
    const newNote = Object.fromEntries(formData);
    const dateTime = getDateTime();
    const finalNote = { ...newNote, dateTime, isEdit: false};

    setNotes((currentNotes) => {
      if (selectedNote) {
        finalNote.isEdit = true;
        const updatedNotes = [...currentNotes];
        updatedNotes.splice(updatedNotes.indexOf(selectedNote), 1, finalNote)
        return updatedNotes;
      } else {
        return [...currentNotes, finalNote];
      }
    });

    setSelectedNote(null);
    e.currentTarget.reset();
  };

  const handleDelete = (index) => {
    setNotes((currentNotes) => {
      const newNotes = [...currentNotes];
      newNotes.splice(index, 1);
      return newNotes;
    });
    if (selectedNote && selectedNote.index === index) {
      setSelectedNote(null);
    }
  };

  const handleEdit = (index) => {
    const note = notes[index];
    setSelectedNote(note);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="form">
        {selectedNote && (
          <>
            <input
              type="text"
              placeholder="Title"
              name="title"
              id="title"
              defaultValue={selectedNote.title}
            />
            <textarea
              name="note"
              id="note"
              rows="4"
              placeholder="Take a note..."
              defaultValue={selectedNote.note}
            />
          </>
        )}
        {!selectedNote && isExpanded && (
          <input type="text" placeholder="Title" name="title" id="title" />
        )}
        {!selectedNote && (
          <textarea
            onClick={() => setIsExpanded(true)}
            name="note"
            id="note"
            rows="4"
            placeholder="Take a note..."
          />
        )}
        <button type="submit" className="submit-btn">
          {selectedNote ? "🗸" : "+"}
        </button>
      </form>
      {notes.length === 0 ? null : (
        <NotesGrid notes={notes} delete={handleDelete} edit={handleEdit} />
      )}
    </>
  );
};
export default Input;
