import React from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";

function ChatHeader() {
  const { upperSectionChatUserInformation } = useUserContext();
  const { displayName, email, photoURL, uid, groups } =
    upperSectionChatUserInformation;
  // console.log(upperSectionChatUserInformation);

  if (groups) {
    return (
      <Wrapper>
        <div>
          <img src={photoURL} className="mainPicture" alt="person face" />
        </div>
        <div className="text-flexSection">
          <p style={{ color: "black" }}>{displayName}</p>
          <p style={{ color: "#8b8da9" }}>mood message will be here</p>
        </div>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper>
        <div>
          <img src={photoURL} className="mainPicture" alt="person face" />
        </div>
        <div className="text-flexSection">
          <p style={{ color: "black" }}>{displayName}</p>
          <p style={{ color: "#8b8da9" }}>mood message will be here</p>
        </div>
      </Wrapper>
    );
  }
}

export default ChatHeader;

const Wrapper = styled.div`
  /* grid-template-rows: 200px, auto, 200px; */
  background: #ffffff;
  display: flex;
  font-family: "Catamaran", Tahoma, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 400;
  color: #ffffff;

  justify-content: start;
  text-align: start;

  .mainPicture {
    border-radius: 50%;
    margin: 1rem 2rem 1rem 3rem;
    max-width: 60px;
    max-height: 60px;
  }

  .text-flexSection {
    display: flex;
    flex-direction: column;
    text-align: start;
    justify-content: center;
  }

  p {
    margin: 0.25rem 0 0.25rem 0;
  }
`;
