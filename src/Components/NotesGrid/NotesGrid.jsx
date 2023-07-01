import { memo } from "react"
import Note from "../Note/Note";
import "./NotesGrid.css";

const NotesGrid = (props) => {
  console.log(props);
  return (
    <div className="notes">
      {props.notes.map((note, index) => {
        return <Note key={index} note={note} dlt={() => props.delete(index)} />;
      })}
    </div>
  );
};
export default memo(NotesGrid);
