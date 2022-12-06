import React, { useState } from "react";
import styled from "styled-components";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineFire,
  AiFillFire,
} from "react-icons/ai";
import {
  BsHandThumbsUpFill,
  BsHandThumbsUp,
  BsHandThumbsDownFill,
  BsHandThumbsDown,
} from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import { CgMailForward, CgMailReply } from "react-icons/cg";
import { FiEdit3 } from "react-icons/fi";
import { useUserContext } from "../context/UserContext";

import { motion, AnimatePresence } from "framer-motion";

function ContextMenu() {
  const {
    globalCoords,
    height,
    width,
    handleEmoji,
    msgDocId,
    handleDelete,
    isEmojiVisible,
    handleReply,
    handleForward,
    handleEdit,
    currentUser,
    showContextMenu,
  } = useUserContext();

  const {
    uid,
    docID,
    heart,
    thumbsUp,
    thumbsDown,
    fire,
    displayName,
    msg,
    photoURL,
  } = msgDocId;

  const { x, y } = globalCoords;
  // console.log(uid === currentUser.uid);

  let xAdjusted = x + 130 >= width ? x - 130 : x;
  let yAdjusted = y + 130 >= height ? y - 130 : y;
  // console.log(heart);

  return (
    <AnimatePresence>
      {showContextMenu && (
        <Wrapper
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          exit={{ opacity: 0 }}
          style={{ left: xAdjusted, top: yAdjusted - 35 }}
        >
          <EmojiesWrapper visible={isEmojiVisible ? "visible" : "hidden"}>
            <div className="emotions-container">
              <StyledContainer
                active={heart.includes(currentUser.uid) ? "#e60000" : "black"}
              >
                <AiOutlineHeart
                  className="svg active"
                  onClick={() => handleEmoji("heart")}
                />
              </StyledContainer>

              <StyledContainer
                active={fire.includes(currentUser.uid) ? "#e60000" : "black"}
              >
                <AiOutlineFire
                  className="svg active"
                  onClick={() => handleEmoji("fire")}
                />
              </StyledContainer>

              <StyledContainer
                active={
                  thumbsUp.includes(currentUser.uid) ? "#e6ac00" : "black"
                }
              >
                <BsHandThumbsUp
                  className="svg active"
                  onClick={() => handleEmoji("thumbsUp")}
                />
              </StyledContainer>

              <StyledContainer
                active={
                  thumbsDown.includes(currentUser.uid) ? "#e6ac00" : "black"
                }
              >
                <BsHandThumbsDown
                  className="svg active"
                  onClick={() => handleEmoji("thumbsDown")}
                />
              </StyledContainer>
            </div>
          </EmojiesWrapper>
          <div className="options-container">
            <p className="option" onClick={() => handleForward()}>
              <CgMailForward /> <span>forward</span>
            </p>

            <p
              className="option"
              onClick={() =>
                handleReply(uid, docID, displayName, msg, photoURL)
              }
            >
              <CgMailReply /> <span>reply</span>
            </p>

            {
              uid === currentUser.uid ? (
                <p className="option" onClick={() => handleEdit()}>
                  <FiEdit3 /> <span>edit</span>
                </p>
              ) : null
              // <p></p>
              // <p style={styleForEditButton}>
              //   <FiEdit3 /> <span>edit</span>
              // </p>
            }

            <p className="option red" onClick={() => handleDelete(uid, docID)}>
              <MdDeleteOutline /> <span>delete</span>
            </p>
          </div>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default ContextMenu;

const EmojiesWrapper = styled(motion.div)`
  visibility: ${(props) => props.visible};
`;

const Wrapper = styled(motion.div)`
  position: absolute;
  display: flex;
  flex-direction: column;
  width: 130px;

  /* ==================== */
  .emotions-container {
    height: 23px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-bottom: 0.5rem;
    background: #8b8da9;
    border-radius: 15px;
    padding: 0.9rem 0.5rem;

    .svg {
      /* color: ${(props) => props.active}; */
      /* color: red; */
      font-size: 1.25rem;
      font-weight: 800;
      cursor: pointer;

      &:hover {
        font-size: 1.45rem;
        transition: all 0.3s;
        color: black;
        font-weight: 1000;
      }
    }
  }

  /* ==================== */

  .options-container {
    display: flex;
    flex-direction: column;
    background: #8b8da9;
    border-radius: 15px;
    justify-content: space-around;
    align-items: start;
    padding: 0.5rem 1rem 0.5rem 1rem;
    /* height: 110px; */
    font-size: 1.1rem;
    font-weight: 800;

    svg {
      margin-right: 0.8rem;
      font-size: 1.1rem;
    }

    .option {
      height: 1.2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      margin: 0.3rem;

      &:hover {
        font-size: 1.2rem;
        transition: all 0.2s;
      }
    }

    .red {
      color: #e60000;
    }
  }
`;

const StyledContainer = styled.div`
  color: ${(props) => props.active};
  display: flex;
`;
