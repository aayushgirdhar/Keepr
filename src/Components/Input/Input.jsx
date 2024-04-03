import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
// import DoneIcon from "@mui/icons-material/Done";
import AddIcon from "@mui/icons-material/Add";
import { db } from "../../firebase";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

import "./Input.css";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
const Input = () => {
  const { user, dispatch } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsExpanded(false);

    const note = {
      id: uuid(),
      title,
      text,
      date: new Date().toISOString(),
      isEdit: false,
    };

    dispatch({ type: "ADD_NOTE", payload: note });
    if (user.id !== "") {
      const userRef = doc(db, "users", user.id);
      await updateDoc(userRef, {
        notes: arrayUnion(note),
      });
    }

    setTitle("");
    setText("");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      {isExpanded && (
        <input
          type="text"
          placeholder="Title"
          name="title"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
      {/* {!selectedNote && (
        <textarea
          onClick={() => setIsExpanded(true)}
          name="note"
          id="note"
          rows="4"
          placeholder="Take a note..."
        />
      )} */}
      <textarea
        onClick={() => setIsExpanded(true)}
        name="note"
        id="note"
        rows="4"
        placeholder="Take a note..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit" className="submit-btn">
        {/* {selectedNote ? <DoneIcon /> : <AddIcon />} */}
        <AddIcon />
      </button>
    </form>
  );
};
export default Input;
