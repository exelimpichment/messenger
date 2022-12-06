import React from "react";
import styled from "styled-components";
import { useUserContext } from "../context/UserContext";
import { FaPaperclip } from "react-icons/fa";
import { FaPaperPlane } from "react-icons/fa";
import ReplySection from "../components/ReplySection";

function ChatFooter() {
  const { message, setMessage, handleSent, isEditSectionOpen, msgDocId } =
    useUserContext();

  const { msg } = msgDocId;

  return (
    <Wrapper>
      <div>
        <textarea
          value={message}
          placeholder="Write your message here"
          name=""
          id=""
          cols="100"
          rows="1"
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        ></textarea>
      </div>

      <div className="buttons-container">
        <button className="button">
          <span button__icon>
            <FaPaperclip></FaPaperclip>
          </span>
        </button>

        <button type="submit" className="button">
          <span button__icon>
            <FaPaperPlane
              onClick={() => {
                handleSent();
              }}
            ></FaPaperPlane>
          </span>
        </button>
      </div>
    </Wrapper>
  );
}

export default ChatFooter;

const Wrapper = styled.div`
  /* position: relative; */
  bottom: 0px;
  background: #ffffff;
  display: flex;
  width: auto;
  justify-content: center;
  padding: 1.8rem 2.9rem;
  overflow: scroll;

  textarea {
    resize: none;
    /* caret-color: transparent; */
    overflow: scroll;
    border: none;

    /* max-height: 100px; */
    /* max-width: 1100px; */
    font-family: "Catamaran", Tahoma, Verdana, sans-serif;
    font-size: 1rem;
    line-height: 1.2;
    font-weight: 400;
    width: 80%;
  }

  .button {
    cursor: pointer;
    border: none;
    outline: none;
    background: #ffffff;
    margin: auto 0.5rem;
    overflow: hidden;
    padding: 0.3rem;
  }

  svg {
    color: #261c46;
    width: 1.5rem;
    height: 1.5rem;
  }

  .buttons-container {
    min-width: 100px;
  }
`;
