import "./App.css";
import SignInPage from "./pages/SignInPage";
import MainChatPage from "./pages/MainChatPage";
import { useUserContext } from "../src/context/UserContext";
import styled from "styled-components";

function App() {
  const { isLoggedIn } = useUserContext();
  return (
    <body className="container-centred">
      {isLoggedIn ? <MainChatPage /> : <SignInPage />}
    </body>
  );
}

export default App;
