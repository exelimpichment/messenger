import React from "react";
import { useUserContext } from "../context/UserContext";

function TempButton() {
  const { handleSignOut } = useUserContext();
  return (
    <button>
      <button onClick={handleSignOut}>log out</button>
    </button>
  );
}

export default TempButton;
