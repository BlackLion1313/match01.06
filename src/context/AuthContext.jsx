import { createContext, useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

//1.create context
export const AuthContext  = createContext();

//2 define our store(we we're gonna share)

export const AuthContextProvider = (props) => {

//move here the state variables and funcs I wanna share
// const [user, setUser] = useState({
//   name: ""
// });
const [user, setUser] = useState({});

const register = async (email, password) => {
  try {
  const userCredential = await createUserWithEmailAndPassword (
    auth,
    email,
    password
    );

    const user = userCredential.user;
    setUser(user)
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log('errorMessage', errorMessage )
  }


};

  return(
    <AuthContext.Provider value={{ user, setUser, register }}>
      {props.children}
    </AuthContext.Provider>
  )
}