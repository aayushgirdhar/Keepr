import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../../firebase";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

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
        console.log("user is not in the DB");
        const userData = {
          id: user.uid,
          name: user.displayName,
          email: user.email,
          img: user.photoURL,
          notes: localUser.notes || [],
        };
        await setDoc(userRef, userData);
        dispatch({ type: "SET_USER", payload: userData });
      } else {
        console.log("user is in the db");
        dispatch({ type: "SET_USER", payload: userDoc.data() });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return <button onClick={handleLogin}>Login with Google</button>;
};

export default Login;
