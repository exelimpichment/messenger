import React from "react";
import ChatHeader from "../components/ChatHeader";
import ChatBody from "../components/ChatBody";
import ChatFooter from "../components/ChatFooter";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import ReplySection from "../components/ReplySection";
import ForwardWindow from "../components/ForwardWindow";
import EditSection from "./EditSection";

function ActiveChatSection() {
  return (
    <Wrapper>
      <ChatHeader></ChatHeader>
      <ChatBody></ChatBody>
      <ChatFooter></ChatFooter>
      <ReplySection></ReplySection>
      <ForwardWindow></ForwardWindow>
      <EditSection></EditSection>
    </Wrapper>
  );
}

export default ActiveChatSection;

const Wrapper = styled.main`
  position: relative;
  display: grid;
  grid-template-rows: 90px auto 90px;
  height: 100vh;
`;
