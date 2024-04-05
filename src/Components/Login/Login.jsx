import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import { UserContext } from "../../context/UserContext";

import GoogleIcon from "@mui/icons-material/Google";
import "./Login.css";

const UserMenu = () => {
  const { user, dispatch } = useContext(UserContext);
  const [isHover, setHover] = useState(false);
  return (
    <div className="user-menu-container">
      <img
        src={user.img}
        alt="profile"
        className="user-img"
        onClick={() => setHover((prev) => !prev)}
      />
      {isHover && (
        <div
          className="user-menu"
          onMouseLeave={() =>
            setTimeout(() => {
              setHover(false);
            }, 500)
          }
        >
          <p>{user.name}</p>
          <button
            onClick={() => {
              dispatch({
                type: "SET_USER",
                payload: {
                  uid: "",
                  name: "",
                  email: "",
                  img: "",
                  notes: [],
                },
              });
            }}
            className="user-logout"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};
const Login = () => {
  const { user: localUser, dispatch } = useContext(UserContext);
  const handleLogin = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth(app);

    try {
      const db = getFirestore(app);
      const { user } = await signInWithPopup(auth, provider);

      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
          notes: localUser.notes || [],
        };
        await setDoc(userRef, userData);
        dispatch({ type: "SET_USER", payload: userData });
      } else {
        const mergedNotes = [...localUser.notes, ...userDoc.data().notes];
        await setDoc(userRef, { notes: mergedNotes }, { merge: true });
        dispatch({
          type: "SET_USER",
          payload: { ...userDoc.data(), notes: mergedNotes },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return localUser.email !== "" ? (
    <UserMenu />
  ) : (
    <button onClick={handleLogin} className="user-login">
      <GoogleIcon /> Login
    </button>
  );
};
export default Login;
