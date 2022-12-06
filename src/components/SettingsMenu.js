import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import TempButton from "../components/TempButton";
import { IoMdClose } from "react-icons/io";

function SettingsMenu() {
  const { isSettingsWindowOpen, setIsSettingsWindowOpen, widthSideSection } =
    useUserContext();

  let sectionWidth = `${widthSideSection}px`;

  return (
    <AnimatePresence>
      {isSettingsWindowOpen && (
        <Wrapper
          style={{ width: sectionWidth }}
          key="modal"
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          exit={{ opacity: 0, y: -100 }}
        >
          <IoMdClose
            onClick={() => {
              setIsSettingsWindowOpen(false);
            }}
          ></IoMdClose>
          <div>
            <TempButton></TempButton>
          </div>
          <div>status change section</div>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default SettingsMenu;

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  background: #826dc5;
  width: 200px;
  height: 100px;
`;
