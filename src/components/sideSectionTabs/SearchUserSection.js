import React from "react";
import styled from "styled-components";
import SearchSection from "../SearchSection";
import UsersListSection from "../UsersListSection";
import { motion, AnimatePresence } from "framer-motion";

function SearchUserSection() {
  return (
    <Wrapper
      key="searchUserSection"
      animate={{ scale: 1 }}
      initial={{ scale: 0.5 }}
    >
      <SearchSection></SearchSection>
      <UsersListSection></UsersListSection>
    </Wrapper>
  );
}

export default SearchUserSection;

const Wrapper = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
