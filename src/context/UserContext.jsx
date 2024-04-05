/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";

export const UserContext = createContext();

export const UserReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return {
        user: action.payload,
      };
    case "ADD_NOTE": {
      const updatedNotes = [...state.user.notes, action.payload];
      return {
        user: {
          ...state.user,
          notes: updatedNotes,
        },
      };
    }
    case "EDIT_NOTE": {
      return {
        user: {
          ...state.user,
          notes: action.payload,
        },
      };
    }
    case "DELETE_NOTE": {
      return {
        user: {
          ...state.user,
          notes: state.user.notes.filter((note) => note.id !== action.payload),
        },
      };
    }
  }
};

export const UserProvider = ({ children }) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const [state, dispatch] = useReducer(UserReducer, {
    user: storedUser || {
      uid: "",
      name: "",
      email: "",
      img: "",
      notes: [],
    },
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <UserContext.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
