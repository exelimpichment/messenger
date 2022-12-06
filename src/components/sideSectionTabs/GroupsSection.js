import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import styled from "styled-components";
import { useUserContext } from "../../context/UserContext";
import defaultGroupPicture from "../../repo/defaultGroupPicture.jpg";

function GroupsSection() {
  const { activeGroups, handleGroupClick } = useUserContext();

  // console.log(groupPicture);

  // console.log(activeGroups.length > 0);
  // if (activeGroups.length > 0)
  return (
    <>
      {activeGroups.map((group) => {
        const { displayName, photoURL, docID, groups } = group;
        // console.log(groups);

        return (
          <Wrapper animate={{ scale: 1 }} initial={{ scale: 0.5 }}>
            <div
              className="container"
              onClick={() =>
                handleGroupClick(displayName, photoURL, docID, groups)
              }
            >
              <div className="picture-container">
                <img className="img" src={defaultGroupPicture} alt="" />
              </div>
              <div className="text-container">
                <div>{displayName}</div>
                <div className="last-received-msg" style={{ color: "#8b8da9" }}>
                  last received msg will be here
                </div>
              </div>
            </div>
          </Wrapper>
        );
      })}
    </>
  );
}

export default GroupsSection;

const Wrapper = styled(motion.div)`
  display: flex;
  margin: 1.5rem 0.5rem 0.5rem 0.5rem;
  font-family: "Catamaran", Tahoma, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 400;
  color: #ffffff;
  width: 95%;
  cursor: pointer;

  .text-container {
    justify-content: space-around;
    display: flex;
    flex-direction: column;
  }

  .container {
    justify-content: start;
    display: flex;
    transition: all 0.3s;
    /* flex-direction: row; */

    &:hover {
      transform: translateX(20px);
    }
  }

  .img {
    margin-left: 1rem;
    margin-right: 1rem;
    max-width: 55px;
    max-height: 55px;
    border-radius: 50%;
  }
`;
