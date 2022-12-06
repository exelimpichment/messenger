import React, { useEffect } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useUserContext } from "../../context/UserContext";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { MdAddCircleOutline, MdAddCircle } from "react-icons/md";
import GroupCreationSection from "../GroupCreationSection";
import { TiTickOutline } from "react-icons/ti";

function SearchGropuSection() {
  const {
    openedConversations,
    setOpenedConversation,
    setIsGroupCreationSectionOpen,
    groupCreationCollection,
    setGroupCreationCollection,
    handleGroupUsrAdd,
    groupUsersArray,
    currentUser,
  } = useUserContext();

  // let newArray = [];
  // openedConversations.forEach((object) => {
  //   newArray.push({ ...object, clicked: false });
  // });

  // console.log(newArray);

  // setGroupCreationCollection(newArray);

  // useEffect(() => {
  //   openedConversations.forEach((conversation) => {
  //     let temp = { ...conversation, clicked: true };
  //     console.log(temp);
  //     setGroupCreationCollection([...groupCreationCollection, temp]);
  //   });
  // }, []);

  const { uid: uID } = currentUser;

  let availableConversations = [];
  openedConversations.forEach((item) => {
    let tempItem = item[uID];
    let tempId = item.docID;
    availableConversations.push({ ...tempItem, tempId });
  });

  return (
    <Wrapper animate={{ scale: 1 }} initial={{ scale: 0.5 }}>
      {availableConversations.map((conversation) => {
        const { displayName, email, photoURL, uid } = conversation;
        const myArray = displayName.split(" ");
        const [name, familyName] = myArray;
        // console.log(typeof uid);
        // console.log(groupUsersArray);
        // console.log(groupUsersArray.includes(uid));

        return (
          <div
            key={uid}
            className="conversation-container"
            onClick={() => handleGroupUsrAdd(displayName, email, photoURL, uid)}
          >
            <div className="img-container">
              <img src={photoURL} alt="face" />

              {groupUsersArray.includes(uid) && (
                <div className="svg-container">
                  <TiTickOutline></TiTickOutline>
                </div>
              )}
            </div>
            <div className="text-container">
              <p>{name}</p>
              <p>{familyName}</p>
              {/* <p>add to group</p> */}
            </div>
            {/* {groupUsersArray.includes(uid) && (
              <div>
                <TiTickOutline></TiTickOutline>
              </div>
            )} */}
          </div>
        );
      })}
    </Wrapper>
  );
}

export default SearchGropuSection;

const Wrapper = styled(motion.div)`
  display: flex;
  padding: 2rem 1rem;
  flex-wrap: wrap;
  justify-content: start;
  overflow: hidden;
  /* align-self: flex-start; */
  /* position: relative; */
  align-content: stretch;

  /* .container {
    display: flex;
    align-items: center;
  } */

  .tickIcon-container {
    position: relative;
  }

  .tickIcon {
    position: absolute;
    top: 110;
    left: 0;
  }

  .conversation-container {
    padding: 0.5rem 0rem;
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      /* font-size: 0.9rem; */
      transform: translateY(-4px);
    }
  }

  .text-container {
    padding-top: 0.3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #8b8da9;
    font-family: "Catamaran", Tahoma, Verdana, sans-serif;
    flex-wrap: wrap;
  }

  svg {
    font-size: 2rem;
    color: white;
  }

  .img-container {
    position: relative;
  }

  .svg-container {
    position: absolute;
    top: -7px;
    left: 9px;
  }

  img {
    margin-left: 1rem;
    margin-right: 1rem;
    max-width: 60px;
    max-height: 60px;
    border-radius: 50%;
  }
`;
