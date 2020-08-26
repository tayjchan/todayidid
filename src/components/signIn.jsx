import React, { useEffect } from "react";
import { Container } from "./container";
import { Button } from "./button";
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
        <Button type='button' onClick={signOut}>
          SIGN OUT
        </Button>
      ) : (
        <Button type='button' onClick={signInUser}>
          SIGN IN
        </Button>
      )}
    </Container>
  );
};

export default SignIn;
