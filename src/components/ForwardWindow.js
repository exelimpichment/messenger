import React from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

function ForwardWindow() {
  const {
    handleForwardCross,
    openedConversations,
    handleForwardWindowClick,
    isForwardWindowOpen,
    currentUser,
    activeGroups,
    // isGroupMsgToggleOn,
  } = useUserContext();

  const { uid: uID } = currentUser;
  let availableConversations = [];
  openedConversations.forEach((item) => {
    let tempItem = item[uID];
    let docID = item.docID;
    let groups = false;
    availableConversations.push({ ...tempItem, docID, groups });
  });

  // ====================================

  // let mergedList = isGroupMsgToggleOn
  //   ? [...availableConversations, ...activeGroups]
  //   : availableConversations;
  // console.log([...availableConversations, ...activeGroups]);

  let mergedList = [...availableConversations, ...activeGroups];

  // console.log(mergedList);

  return (
    <AnimatePresence>
      {isForwardWindowOpen && (
        <Wrapper
          key="forward"
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <IoMdClose
            className="swg"
            onClick={() => handleForwardCross()}
          ></IoMdClose>
          {mergedList.map((item) => {
            const {
              displayName,
              photoURL,
              uid,
              // docID: id,
              groups,
              docID,
            } = item;
            // console.log(displayName, photoURL, uid, id, groups, docID);
            return (
              <div
                onClick={() => {
                  // console.log(docID);
                  // docID =  2nd step document id
                  handleForwardWindowClick(
                    displayName,
                    photoURL,
                    uid,
                    // id,
                    groups,
                    docID
                  );
                }}
                className="user-container"
              >
                <div className="img-container">
                  <img src={photoURL} alt="" className="user-img" />
                </div>
                <div className="text-section">
                  <div>{displayName}</div>
                  <div>last seen will be here</div>
                </div>
              </div>
            );
          })}
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default ForwardWindow;

const Wrapper = styled(motion.div)`
  position: absolute;
  top: 20%;
  margin: auto;
  max-width: 280px;
  max-height: 400px;
  background: #826dc5;
  left: 0;
  right: 0;
  /* transform: translateY(-50%); */
  display: flex;
  flex-direction: column;
  padding: 1rem;
  overflow: scroll;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  max-height: 350px;

  .text-section {
    display: flex;
    flex-direction: column;
    padding-left: 0.7rem;
    justify-content: space-around;
  }

  .user-container {
    display: flex;
    padding: 0.3rem 1rem;
    transition: all 0.3s;
    cursor: pointer;
    border-radius: 10px;

    &:hover {
      background: #917fcc;
    }
  }

  .swg {
    cursor: pointer;
    font-size: 1.3rem;
    transition: all 0.5s;
    position: absolute;
    top: 8px;
    left: 8px;

    &:hover {
      color: red;
    }
  }

  .user-img {
    border-radius: 50%;
    height: 45px;
  }
`;
