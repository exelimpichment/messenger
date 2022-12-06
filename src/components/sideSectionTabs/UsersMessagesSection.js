import React from "react";
import { useUserContext } from "../../context/UserContext";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

function UsersMessagesSection() {
  const style1 = {
    color: "#737291",
    fontSize: "1.3rem",
    fontFamily: "Catamaran",
    textAlign: "center",
    marginTop: "2rem",
  };
  // selectConversation
  let { openedConversations, selectConversation, usersMsg, currentUser } =
    useUserContext();
  const { uid: uID } = currentUser;
  // const { docID } = openedConversation
  // console.log(docID);

  let availableConversations = [];
  openedConversations.forEach((item) => {
    let tempItem = item[uID];
    let tempId = item.docID;
    availableConversations.push({ ...tempItem, tempId });
  });

  if (availableConversations.length > 0) {
    return (
      <AnimatePresence>
        {usersMsg && (
          <Wrapper
            key="msgSection"
            animate={{ scale: 1 }}
            initial={{ scale: 0.5 }}
            // exit={{ scale: 0.5 }}
          >
            {availableConversations.map((conversation) => {
              // console.log(conversation.tempId);
              const { tempId: id } = conversation;
              return (
                <div
                  className="section-container"
                  key={conversation.uid}
                  onClick={() => {
                    selectConversation(
                      conversation.displayName,
                      conversation.email,
                      conversation.photoURL,
                      conversation.uid,
                      id
                    );
                  }}
                >
                  <div>
                    <img src={conversation.photoURL} alt="person face" />
                  </div>
                  <div className="text-flexSection">
                    <p>{conversation.displayName}</p>
                    <p style={{ color: "#8b8da9" }}>
                      last received message will be here
                    </p>
                  </div>
                </div>
              );
            })}
          </Wrapper>
        )}
      </AnimatePresence>
    );

    // console.log(conversation);
  }
  return (
    usersMsg && (
      <Wrapper>
        <h1 className="emptyList" style={{ ...style1 }}>
          you have no chats
        </h1>
      </Wrapper>
    )
  );
}

export default UsersMessagesSection;

const Wrapper = styled(motion.div)`
  overflow: scroll;

  .section-container {
    font-family: "Catamaran", Tahoma, Verdana, sans-serif;
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 400;
    color: #ffffff;
    display: flex;
    flex-direction: row;
    justify-content: start;
    margin: 1.5rem 0.5rem 0.5rem 0.5rem;
    width: 95%;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      transform: translateX(20px);
    }
  }

  .emptyList {
    margin: auto;
  }

  .text-flexSection {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  img {
    margin-left: 1rem;
    margin-right: 1rem;
    max-width: 55px;
    max-height: 55px;
    border-radius: 50%;
  }

  .contact-btn {
    margin: auto 1rem;
    padding: 0.3rem;
    border-radius: 10px;
    background-color: transparent;
    border: transparent;
    color: #ffffff;
    cursor: pointer;
  }
`;
