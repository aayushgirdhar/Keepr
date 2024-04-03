/* eslint-disable react/prop-types */
import { useContext } from "react";
import Note from "../Note/Note";
import "./NotesGrid.css";
import { UserContext } from "../../context/UserContext";

const NotesGrid = () => {
  const { user } = useContext(UserContext);
  return (
    <div className="notes">
      {user.notes.map((note) => {
        return <Note key={note.id} note={note} />;
      })}
    </div>
  );
};
export default NotesGrid;
