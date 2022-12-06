import React from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

function EditSection() {
  const { handleEditCross, msgDocId, isEditSectionOpen, widthSideSection } =
    useUserContext();

  let sectionWidth = `${widthSideSection}px`;
  const { msg } = msgDocId;

  const sliceMsg = (msg) => {
    if (msg) {
      let slicedMSG = msg.slice(0, 99);
      return slicedMSG;
    } else {
      return;
    }
  };

  let slicedMSG = sliceMsg(msg);

  return (
    <AnimatePresence>
      {isEditSectionOpen && (
        <Wrapper
          key="edit"
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <IoMdClose
            className="swg"
            onClick={() => handleEditCross()}
          ></IoMdClose>
          <div className="text-container">
            <p className="edit-word">Edit</p>
            <p>{slicedMSG}...</p>
          </div>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default EditSection;

const Wrapper = styled(motion.div)`
  background: white;
  height: 100px;
  position: absolute;
  z-index: 10;
  bottom: 90px;
  left: 0px;
  overflow: hidden;
  display: flex;
  padding: 0.4rem 2rem 0rem 2rem;
  height: 70px;
  display: flex;
  justify-content: start;
  align-items: center;
  max-height: 54.9px;
  width: 100%;

  .text-container {
    border-left: 1px red solid;
    padding-left: 0.5rem;
    display: flex;
    flex-direction: column;

    align-items: start;

    .edit-word {
      padding-bottom: 0.3rem;
      color: #261c46;
      font-weight: bold;
      font-size: 1.05rem;
    }
  }

  .swg {
    font-size: 2.2rem;
    padding-right: 1rem;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;
