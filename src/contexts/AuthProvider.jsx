/* eslint-disable react/prop-types */
import React, { useContext } from 'react';
import { createContext } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { useState } from 'react';
import { useEffect } from 'react';
import { loginRequest, verityTokenRequest } from '../api/auth';

export const AuthContext = createContext();
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be ussed within an AutProvider");
  }
  return context;
};
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const signIn = async (user) => {
    const res = await loginRequest(user);
    console.log(res.data);
    if (res.data) {
      console.log(res);
      localStorage.setItem("token", res.data.token);
      const resverify = await verityTokenRequest(res.data.token);
      console.log(resverify);
      setIsAuthenticated(true);
      setUser(res.data);
    } else {
      setErrors([[res.response.data.message]]);
    }
  };


  useEffect(() => {
    async function checkLogin() {
      const Token = localStorage.getItem("token");
      if (!Token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      } else {
        try {
          const res = await verityTokenRequest(Token);
          console.log(res.data);
          if (!res.data) {
            setIsAuthenticated(false);
            setLoading(false);
            return;
          } else {
            setIsAuthenticated(true);
            setUser(res.data);
            setLoading(false);
          }
        } catch (error) {
          console.log(error);
          setIsAuthenticated(false);
          setUser(null);
          setLoading(false);
        }
      }
    }
    checkLogin();
  }, [isAuthenticated]);

  const logOut = () => {
    localStorage.removeItem('genius-token');
    return signOut(auth);
  }

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      isAuthenticated,
      setUser,
      signIn,
      createUser,
      logOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;