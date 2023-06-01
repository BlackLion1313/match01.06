import { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../config/firebaseConfig';
import { useContext } from 'react';

export const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = (props) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const register = async (email, password, name) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, { displayName: name });

      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      setUser(null);
      setIsLoggedIn(false);
    }
  };
  const login = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      setUser(user);
      setIsLoggedIn(true);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
      setUser(null);
      setIsLoggedIn(false);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setIsLoggedIn(false);
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log("errorMessage", errorMessage);
      throw error;
    }
  };

const checkIfUserLoggedIn = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log("user is logged in", user)
      setUser(user)
      setIsLoggedIn(true)
    } else {
      console.log("user is NOT logged in")
      setUser(null)
    }
  });
  
};

useEffect(() => {
  checkIfUserLoggedIn()
}, [])


const UserProfileName = () =>{
const user = auth.currentUser;
  
  if (user !== null) {
    user.providerData.forEach((profile) => {
      console.log("Sign-in provider: " + profile.providerId);
      console.log("  Provider-specific UID: " + profile.uid);
      console.log("  Name: " + profile.displayName);
      console.log("  Email: " + profile.email);
      console.log("  Photo URL: " + profile.photoURL);
    });
  }
  useEffect(() => {
    UserProfileName()
  }, [])
}
const deleteUser = () => {
  const currentUser = auth.currentUser;

  if (currentUser) {
    return currentUser.delete()
      .then(() => {
      })
      .catch((error) => {
        console.log("Error deleting user:", error);
      });
  }
};


  return (
    <AuthContext.Provider value={{ user, isLoggedIn, register, login, logout, deleteUser: deleteUser  }}>
      {props.children}
    </AuthContext.Provider>
  );
};
