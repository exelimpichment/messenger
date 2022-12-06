import React, { useRef, useState, useLayoutEffect } from "react";
import SearchUserSection from "../components/sideSectionTabs/SearchUserSection";
import UserGroupsSection from "../components/UserGroupsSection";
import UserInfoSection from "../components/UserInfoSection";
import { useUserContext } from "../context/UserContext";
import styled from "styled-components";
import UsersMessagesSection from "../components/sideSectionTabs/UsersMessagesSection";
import SearchGropuSection from "../components/sideSectionTabs/SearchGropuSection";
import GroupsSection from "../components/sideSectionTabs/GroupsSection";

function SideSection() {
  const {
    usersMsg,
    searchUserMsg,
    groupSection,
    searchGroup,
    widthSideSection,
    setWidthSideSection,
    width,
  } = useUserContext();

  const ref = useRef(null);

  useLayoutEffect(() => {
    setWidthSideSection(ref.current.offsetWidth);
  }, [width, widthSideSection, setWidthSideSection]);

  return (
    <Wrapper ref={ref}>
      <UserInfoSection></UserInfoSection>
      <UsersMessagesSection></UsersMessagesSection>
      {searchUserMsg && <SearchUserSection></SearchUserSection>}
      {groupSection && <GroupsSection></GroupsSection>}
      {searchGroup && <SearchGropuSection></SearchGropuSection>}
    </Wrapper>
  );
}

export default SideSection;

const Wrapper = styled.aside`
  /* display: grid; */
  /* grid-template-rows: 1fr 4fr; */
  min-width: 400px;
  background: #261c46;
  color: white;
  height: 100vh;
`;
