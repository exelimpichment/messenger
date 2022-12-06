import React from "react";
import styled from "styled-components";
import { IoMdClose } from "react-icons/io";
import { useUserContext } from "../context/UserContext";
import { motion, AnimatePresence } from "framer-motion";

function ReplySection() {
  // const { replyWindowContent, handleReplyCross } = useProductsContext();
  const {
    replyWindowContent,
    handleReplyCross,
    msgDocId,

    isReplyWindowOpen,
  } = useUserContext();
  const { uid, docID, displayName, msg, photoURL } = replyWindowContent;

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
      {isReplyWindowOpen && (
        <Wrapper
          key="reply"
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <IoMdClose
            className="swg"
            onClick={() => handleReplyCross()}
          ></IoMdClose>
          <div className="img-container">
            <img className="user-image" src={photoURL} alt="" />
          </div>
          <div className="text-container">
            <p style={{ fontWeight: 1200 }}>{displayName}</p>
            <p>{msg ? `${slicedMSG}...` : msgDocId.forwardText}</p>
          </div>
          <div></div>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default ReplySection;

const Wrapper = styled(motion.div)`
  width: 100%;
  background: white;
  /* height: 100px; */
  position: absolute;
  z-index: 10;
  bottom: 90px;
  right: 0px;
  overflow: hidden;
  display: flex;
  padding: 0.4rem 2rem 0rem 2rem;
  align-items: center;

  .user-image {
    border-radius: 50%;
    height: 45px;
    width: 45px;
  }

  .text-container {
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding-left: 1.15rem;
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
