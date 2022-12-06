import { logDOM } from "@testing-library/react";
import React from "react";
import { useUserContext } from "../context/UserContext";

function SignInPage() {
  const { handleSignIn, currentUser } = useUserContext();
  return (
    <>
      <h1>signInPage</h1>
      <button onClick={handleSignIn}>log in</button>;
    </>
  );
}

export default SignInPage;
