import React from "react";
import { TbMessageDots } from "react-icons/tb";
import { RiGroupLine } from "react-icons/ri";
// import { BsGear } from "react-icons/bs";
import { AiOutlineUserAdd } from "react-icons/ai";
import styled from "styled-components";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { RiChat4Line, RiChatNewFill } from "react-icons/ri";
import { MdChatBubble } from "react-icons/md";
import { useUserContext } from "../context/UserContext";

function SwitchesSection() {
  const {
    handleSetUserMsg,
    handleSetSearchUserMsg,
    handleSetGroupSection,
    handleSetSearchGroup,
  } = useUserContext();
  return (
    <Wrapper>
      {/* ======================= */}
      <button onClick={handleSetUserMsg} className="button">
        <span button__icon>
          <MdChatBubble className="svg-icon" />
        </span>
      </button>
      {/* ======================= */}
      <button onClick={handleSetSearchUserMsg} className="button">
        <span button__icon>
          <RiChatNewFill className="svg-icon" />
        </span>
      </button>
      {/* ======================= */}
      <button onClick={handleSetGroupSection} className="button">
        <span button__icon>
          <RiGroupLine className="svg-icon" />
        </span>
      </button>
      {/* ======================= */}
      <button onClick={handleSetSearchGroup} className="button">
        <span button__icon>
          <AiOutlineUserAdd className="svg-icon" />
        </span>
      </button>
      {/* ======================= */}
    </Wrapper>
  );
}

export default SwitchesSection;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;

  /* svg {
    height: 2rem;
    width: 2rem;
    color: #8789a0;
  } */

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
    transition: all 0.3s;
  }

  .svg-icon {
    height: 2rem;
    width: 2rem;
    color: #8789a0;
    transition: all 0.3s;

    &:hover {
      height: 2.4rem;
      width: 2.4rem;
      color: #c6c7d2;
    }
  }
`;
