import React, { createContext, useEffect, useState } from 'react'
import { onAuthStateChanged, signInWithPopup, signOut, } from "firebase/auth";
import auth from "../firebase/firebase.init"
export const AuthContext=createContext();

function AuthContextProvider({children}) {
    const[user,setUser]=useState(null);
    const[loading,setLoading]=useState(true);
     // Sign up with Google
  const googleLogin=(provider)=>{
    setLoading(true)  
    return signInWithPopup(auth,provider)
  }
  // Auth observer
  useEffect(()=>{
    const unsubscribe=onAuthStateChanged(auth, (currentUser) => {
   setLoading(false)   
   setUser(currentUser);
  

    });
    return ()=>{
      return unsubscribe()
    }
  },[]);
  // Logout
  const logOutUser = () => {
    return signOut(auth)
      .then(() => {
        setLoading(false)  
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

    const authInfo={
    user,
    setUser,
    loading,
    googleLogin,
    logOutUser 
    }
  return (
   <AuthContext.Provider value={authInfo}>
        {children}
   </AuthContext.Provider>
  )
}

export default AuthContextProvider
