import React, { useEffect } from "react";
import { Container } from "./container";
import { auth, signInUser, signOut } from "../services/Firestore";

const SignIn = ({ currentUser, updateUser }) => {
  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      updateUser(userAuth);
    });
  }, []);
  return (
    <Container style={{ marginTop: 0, marginBottom: 0 }}>
      {currentUser ? (
        <button type='button' onClick={signOut}>
          SIGN OUT
        </button>
      ) : (
        <button type='button' onClick={signInUser}>
          SIGN IN
        </button>
      )}
    </Container>
  );
};

export default SignIn;
