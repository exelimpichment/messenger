import React from "react";
import { useUserContext } from "../context/UserContext";
import { BsBellFill, BsFillBellSlashFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import SwitchesSection from "../components/SwitchesSection";
import styled from "styled-components";
import { BsGear } from "react-icons/bs";

function UserInfoSection() {
  // for now silent mod or standart will use just let
  let silentMode = false;
  const { currentUser, handleGear } = useUserContext();
  const { displayName, email, photoURL, uid } = currentUser;

  return (
    <Wrapper>
      <div className="flex-section">
        <div className="pictureAndtext">
          <img src={photoURL} alt={displayName} />
          <div className="user-info">
            <p>{displayName}</p>
            <p style={{ color: "#8b8da9" }}> status will be shown here</p>
          </div>
        </div>
        {/* {silentMode ? <BsBellFill /> : <BsFillBellSlashFill />} */}
        <button className="button">
          <span className="button-icon" onClick={() => handleGear()}>
            <BsFillGearFill className="svg"></BsFillGearFill>
          </span>
        </button>
      </div>
      <SwitchesSection></SwitchesSection>
    </Wrapper>
  );
}

export default UserInfoSection;

const Wrapper = styled.div`
  .flex-section {
    padding: 2rem 3rem 2rem 2rem;

    display: flex;
    flex-direction: row;
    font-family: "Catamaran", Tahoma, Verdana, sans-serif;
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 400;
    color: #ffffff;
    justify-content: space-between;
    align-items: center;

    svg {
      height: 1.5rem;
      width: 1.5rem;
      color: #8789a0;
    }

    .pictureAndtext {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }

    .user-info {
      text-align: left;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      p {
        padding: 0.5rem 0 0 1rem;
      }
    }
  }
  img {
    max-width: 55px;
    max-height: 55px;
    border-radius: 50%;
  }

  .button {
    cursor: pointer;
    height: 50px;
    width: 4rem;
    background: #261c46;
    border: none;
    outline: none;
    border-radius: 5px;
    overflow: hidden;
    font-size: 2rem;
  }

  .svg {
    height: 2rem;
    width: 2rem;
    color: #8789a0;
    transition: all 0.3s;

    &:hover {
      height: 2rem;
      width: 2rem;
      color: #c6c7d2;
    }
  }
`;
