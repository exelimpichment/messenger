import React, { useMemo, useState } from "react";
import { useUserContext } from "../context/UserContext";
import styled from "styled-components";
import SingleMessage from "../components/SingleMessage";
import { useRef, useEffect } from "react";
import { motion } from "framer-motion";

function ChatBody() {
  const [scrollValue, setScrollValue] = useState(0);

  const {
    showChatSection,
    activeChat,
    currentUser,
    showContextMenu,
    updateRead,
    activeChatLength,
  } = useUserContext();

  const msgRef = useRef(null);

  let arrDocId = useMemo(() => {
    return [];
  }, [activeChat]);

  useEffect(() => {
    activeChat.forEach((i) => {
      let temp = {
        docID: i.docID,
        uid: i.uid,
        message: i.message,
        read: i.read,
      };
      arrDocId.push(temp);
    });
  }, [arrDocId, activeChat]);

  useEffect(() => {
    const triggerBottom = msgRef.current.offsetHeight;

    msgRef.current.childNodes.forEach((node, index) => {
      let bottomCoord = node.getBoundingClientRect().bottom;
      // console.log(bottomCoord);

      if (
        bottomCoord < triggerBottom &&
        arrDocId[index].uid !== currentUser.uid
      ) {
        if (!arrDocId[index].read) {
          console.log(arrDocId[index].message, "read");
          updateRead(arrDocId[index].docID);
        } else {
          return;
        }
      }
    });
  });

  useEffect(() => {
    console.log(activeChatLength);
    console.log(activeChat.length);
    if (activeChat.length <= activeChatLength) {
      activeChatLength.current = activeChat.length;
      return;
    } else {
      msgRef.current.scrollTo(0, 500);
      activeChatLength.current = activeChat.length;
    }
    console.log(activeChatLength);
  }, [activeChat.length, activeChatLength]);

  const handleScroll = (event) => {
    setScrollValue(event.target.scrollTop);
    // console.log(scrollValue);

    const triggerBottom = msgRef.current.offsetHeight;

    msgRef.current.childNodes.forEach((node, index) => {
      let bottomCoord = node.getBoundingClientRect().top;
      // console.log(bottomCoord, index);

      if (
        bottomCoord < triggerBottom &&
        arrDocId[index].uid !== currentUser.uid
      ) {
        if (!arrDocId[index].read) {
          console.log(arrDocId[index].message, "read");
          updateRead(arrDocId[index].docID);
        } else {
          return;
        }
      }
    });
  };

  // ===========READ / UNREAD llogics=================

  if (showChatSection && !activeChat) {
    return <div>chat is empty</div>;
  }

  if (showChatSection && activeChat) {
    return (
      <Wrapper
        data-docid="1234"
        ref={msgRef}
        id="my-element"
        animate={{ scale: 1 }}
        initial={{ scale: 0.5 }}
        contextMenu={showContextMenu ? "hidden" : "scroll"}
        onScroll={handleScroll}
      >
        {activeChat.map((message) => {
          return (
            <SingleMessage
              message={message}
              key={message.docID}
            ></SingleMessage>
          );
        })}
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <h2>Chat was not selected</h2>
    </Wrapper>
  );
}

export default ChatBody;

const Wrapper = styled(motion.div)`
  padding: 1.5rem 0;
  font-family: "Catamaran", Tahoma, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 400;
  position: relative;
  overflow: ${(props) => props.contextMenu};
  scroll-behavior: smooth;
`;
