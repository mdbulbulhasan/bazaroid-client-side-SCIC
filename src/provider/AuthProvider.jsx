import React, { useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  // User Information
  const [user, setUser] = useState();
  // Loading Feature
  const [loading, setLoading] = useState(true);
  // Creating or Register user
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // LogIn User
  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // Google SignIn
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  // Update User Profile
  const updateUserProfile = (profileInfo) => {
    return updateProfile(auth.currentUser, profileInfo);
  };

  // LogOut User
  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  // Set an Observer
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (curretUser) => {
      setUser(curretUser);
      console.log("user in the auth State chnage", curretUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  // Sharing auth information to all component
  const authInfo = {
    user,
    loading,
    createUser,
    signIn,
    signInWithGoogle,
    updateUserProfile,
    logOut,
  };
  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;
