import React, { useRef, useLayoutEffect } from "react";
import SideSection from "../components/SideSection";
import ActiveChatSection from "../components/ActiveChatSection";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import ContextMenu from "../components/ContextMenu";
import { useGroupContext } from "../context/GroupContext";
import SettingsMenu from "../components/SettingsMenu";
import GroupCreationSection from "../components/GroupCreationSection";

function MainChatPage() {
  const ref = useRef(null);

  const { setWidth, setHeight } = useUserContext();

  useLayoutEffect(() => {
    setWidth(ref.current.offsetWidth);
    setHeight(ref.current.offsetHeight);
  });

  return (
    <Wrapper ref={ref}>
      <SideSection></SideSection>
      <ActiveChatSection></ActiveChatSection>
      <ContextMenu></ContextMenu>
      <SettingsMenu></SettingsMenu>
      <GroupCreationSection></GroupCreationSection>
    </Wrapper>
  );
}

export default MainChatPage;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 31fr 69fr;
  overflow: hidden;
  height: 100vh;
  background: #ebeafd;
  position: relative;
  font-family: "Catamaran", Tahoma, Verdana, sans-serif;
`;
