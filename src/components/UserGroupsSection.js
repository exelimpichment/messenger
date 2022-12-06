import React from "react";
import SearchGropuSection from "../components/sideSectionTabs/SearchGropuSection";
import GroupListSection from "../components/GroupListSection";

function UserGroupsSection() {
  return (
    <div>
      <SearchGropuSection></SearchGropuSection>
      <GroupListSection></GroupListSection>
    </div>
  );
}

export default UserGroupsSection;
