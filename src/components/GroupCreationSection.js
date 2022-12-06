import React from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../context/UserContext";
import { IoMdClose } from "react-icons/io";
import Button from "@mui/material/Button";

function GroupCreationSection() {
  const {
    isGroupCreationSectionOpen,
    setIsGroupCreationSectionOpen,
    handleGroupCreationCross,
    widthSideSection,
    groupUsersArray,
    handleCreateGroupButton,
    createdGroupName,
    setCreatedGroupName,
    // handleGroupName,
  } = useUserContext();

  let sectionWidth = `${widthSideSection}px`;

  return (
    <AnimatePresence>
      {isGroupCreationSectionOpen && (
        <Wrapper
          style={{ width: sectionWidth }}
          key="groupCreationSection"
          animate={{ x: 0 }}
          initial={{ x: -200 }}
          exit={{ x: -470 }}
        >
          <form
            className="input-container"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              style={{ color: "white" }}
              placeholder="name your grouop"
              type="text"
              className="groupNameSection"
              value={createdGroupName}
              onChange={(e) => setCreatedGroupName(e.target.value)}
            />
          </form>
          <div className="buttonAndCrossContainer">
            <div>
              <button
                className="btn"
                onClick={() => {
                  handleCreateGroupButton();
                }}
              >
                create group
              </button>
            </div>
            <IoMdClose
              onClick={() => {
                handleGroupCreationCross();
              }}
            ></IoMdClose>
          </div>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default GroupCreationSection;

const Wrapper = styled(motion.div)`
  width: auto;
  position: absolute;
  bottom: 0px;
  left: 0px;
  background: #826dc5;
  display: flex;
  padding: 0.5rem 1rem 1.5rem 1rem;
  transition: all;
  flex-direction: column;

  .groupNameSection::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #261c46;
    opacity: 1; /* Firefox */
  }

  .input-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .groupNameSection {
    background: #826dc5;
    width: 80%;
    border: none;
    border-bottom: #393258 2px solid;
    opacity: 0.8;
    font-family: "Catamaran", Tahoma, Verdana, sans-serif;
    font-size: 1.5rem;
    line-height: 1.2;

    color: white;
    margin: 0.8rem 0 2rem 0rem;
  }

  .buttonAndCrossContainer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    height: 1.25rem;
  }

  .btn {
    font-size: 1.15rem;
    border: 2px solid;
    padding: 0.3rem;
    /* margin: 0.3rem; */
    border-radius: 5px;
    background-color: #826dc5;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      font-size: 1.25rem;
      padding: 0.3rem;
    }
  }

  svg {
    font-size: 2rem;
    cursor: pointer;

    &:hover {
      color: red;
    }
  }
`;
