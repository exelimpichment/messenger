import React, { useEffect } from "react";
import { useUserContext } from "../context/UserContext";
import { TiTick } from "react-icons/ti";
import styled from "styled-components";
import { AiFillHeart, AiFillFire } from "react-icons/ai";
import { BsHandThumbsUpFill, BsHandThumbsDownFill } from "react-icons/bs";
import { motion, AnimatePresence } from "framer-motion";

function SingleMessage({ message }) {
  const {
    displayName,
    message: msg,
    photoURL,
    read,
    uid,
    docID,
    heart,
    thumbsUp,
    thumbsDown,
    fire,
    replyText,
    reply,
    repliedMsgUser,
    forward,
    forwardText,
    forwardedFrom,
    // groupName,
  } = message;

  // console.log(groupName);
  // console.log(
  // "\nname:",
  //   displayName,
  //   "\nmsg:",
  //   msg,
  //   "\nphotoURL:",
  //   photoURL,
  //   "\nread:",
  //   read,
  //   "\nuid:",
  //   uid,
  //   "\ndocID:",
  //   docID,
  //   "\nheart:",
  //   heart,
  //   "\nthumbsUp:",
  //   thumbsUp,
  //   "\nthumbsDown:",
  //   thumbsDown,
  //   "\nfire:",
  //   fire,
  //   "\nreplyText:",
  //   replyText,
  //   "\nreply:",
  //   reply,
  //   "\nrepliedMsgUser:",
  //   repliedMsgUser,
  //   "\nforward:",
  //   forward,
  //   "\nforwardText:",
  //   forwardText,
  //   "\nuserWeRepliedFrom:",
  //   userWeRepliedFrom
  // );
  const {
    currentUser,
    setShowContextMenu,
    setGlobalCoords,
    setMsgDocId,
    setIsEmojiVisible,
    upperSectionChatUserInformation,

    // groupName,
  } = useUserContext();

  return (
    <AnimatePresence>
      {docID && (
        <Wrapper
          // key={docID}
          animate={{ scale: 1 }}
          initial={{ scale: 0.5 }}
          exit={{ scale: 0.5 }}
          onContextMenu={(e) => {
            // console.log(currentUser.uid);
            // console.log(uid);
            if (currentUser.uid !== uid) {
              setIsEmojiVisible(true);
            } else {
              setIsEmojiVisible(false);
            }

            // console.log(docID);
            setMsgDocId({
              docID,
              heart,
              thumbsUp,
              thumbsDown,
              fire,
              uid,
              displayName,
              msg,
              photoURL,
              forwardText,
              forward,
              replyText,
              reply,
              repliedMsgUser,
            });
            e.preventDefault();
            setShowContextMenu(true);
            let x = e.pageX;
            let y = e.pageY;

            setGlobalCoords({ x, y });
          }}
        >
          <div
            className={
              uid === currentUser.uid ? "ownerMSG msg" : "recepientMSG msg"
            }
          >
            <div className="picture-section">
              <img src={photoURL} alt="" />
            </div>

            <div className="text-section">
              {/* <p className="name">{groupName && groupName}</p> */}
              <p className="name">{displayName}</p>

              <div className="text ">
                <div className="replied-user-and-text-section">
                  <p className="replied-msg-name">{forward && forwardedFrom}</p>
                  <p className="replied-msg-name">{forward && forwardText}</p>
                  <p className="replied-msg-name">{reply && repliedMsgUser}</p>
                  <p className="replied-msg">{reply && replyText}</p>
                </div>
                <p>{msg} </p>

                <div className="emoji-container">
                  <div>
                    {heart.length > 0 && (
                      <>
                        <div className="emoji-section">
                          <AiFillHeart className="heart svg-emoji "></AiFillHeart>

                          {heart.length > 1 ? (
                            <p
                              style={{
                                "margin-left": "6px",
                                "font-size": "1.05rem",
                              }}
                            >
                              {heart.length}
                            </p>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {fire.length > 0 && (
                      <>
                        <div className="emoji-section">
                          <AiFillFire className="fire svg-emoji"></AiFillFire>
                          {fire.length > 1 ? (
                            <p
                              style={{
                                "margin-left": "6px",
                                "font-size": "1.05rem",
                              }}
                            >
                              {fire.length}
                            </p>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {thumbsUp.length > 0 && (
                      <>
                        <div className="emoji-section">
                          <BsHandThumbsUpFill className="thumbsUp svg-emoji"></BsHandThumbsUpFill>

                          {thumbsUp.length > 1 ? (
                            <p
                              style={{
                                "margin-left": "6px",
                                "font-size": "1.05rem",
                              }}
                            >
                              {thumbsUp.length}
                            </p>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                  <div>
                    {thumbsDown.length > 0 && (
                      <>
                        <div className="emoji-section">
                          <BsHandThumbsDownFill className="thumbsDown svg-emoji"></BsHandThumbsDownFill>

                          {thumbsDown.length > 1 ? (
                            <p
                              style={{
                                "margin-left": "6px",
                                "font-size": "1.05rem",
                              }}
                            >
                              {thumbsDown.length}
                            </p>
                          ) : null}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>
              {!upperSectionChatUserInformation.groups &&
              currentUser.uid === uid &&
              read ? (
                <TiTick className="svg"></TiTick>
              ) : null}
            </div>
          </div>
        </Wrapper>
      )}
    </AnimatePresence>
  );
}

export default SingleMessage;

const Wrapper = styled(motion.div)`
  .emoji-container {
    position: absolute;
    bottom: -12px;
    left: 3px;
    display: flex;
    /* row-gap: 10px; */
    /* column-gap: -10px; */

    .emoji-section {
      display: flex;
      direction: row;
      align-items: center;
      background: transparent;
      background: #ebeafd;
      border-radius: 10px;
      /* width: 30px; */
      color: #261c46;
      padding: 0 3px 0 0;
    }
  }
  .fire {
    color: #e60000;
  }

  .heart {
    color: #e60000;
  }

  .thumbsUp {
    color: #e6ac00;
  }

  .thumbsDown {
    color: #e6ac00;
  }

  .svg-emoji {
    margin-right: -4px;
    font-size: 1.25rem;
  }

  .svg {
    position: absolute;
  }

  .msg {
    display: flex;
    margin-bottom: 0.7rem;
  }

  .name {
    margin-bottom: 0.25rem;
    padding-top: 0.3rem;
  }

  .text {
    padding: 1rem 1.5rem;
    overflow-wrap: break-word;
    max-width: 400px;
    position: relative;
    cursor: pointer;
    /* background-color: #261c46; */
    /* max-width: 40%; */
    /* overflow: hidden;
    overflow-wrap: break-word; */
  }

  .text-section {
    display: flex;
    flex-direction: column;
    position: relative;

    .replied-user-and-text-section {
      padding-left: 0.5rem;
      border-left: 1px red solid;
      font-size: 0.85rem;
      margin-bottom: 0.3rem;
    }
    .replied-msg {
      font-style: italic;
      color: black;
    }

    .replied-msg-name {
      font-weight: 1100;
      margin-bottom: 0.2rem;
    }
  }
  /* ==================== */

  .recepientMSG {
    justify-content: start;

    .svg-transparent {
      color: transparent;
    }

    .text {
      color: black;
      background: white;
      border-radius: 0rem 3rem 3rem 3rem;
    }
  }
  /* ==================== */
  .ownerMSG {
    justify-content: end;

    .replied-msg {
      color: white;
    }

    .svg {
      bottom: -3px;
      right: -5px;
    }

    .text-section {
      align-items: end;
    }

    .picture-section {
      order: 1;
    }

    .text {
      color: white;
      background: #261c46;
      border-radius: 3rem 0rem 3rem 3rem;
    }
  }
  /* ==================== */
  img {
    max-width: 60px;
    max-height: 60px;
    border-radius: 50%;
    margin: 0 1rem 0 1rem;
  }
`;
