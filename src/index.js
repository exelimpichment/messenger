import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserContext } from "../src/context/UserContext";
import { GroupContext } from "../src/context/GroupContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContext>
    <GroupContext>
      <App />
    </GroupContext>
  </UserContext>
);
