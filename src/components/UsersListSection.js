import React from "react";
import { useUserContext } from "../context/UserContext";
import styled from "styled-components";

function UsersListSection() {
  const { handleAddUser, searchedUser } = useUserContext();
  const { displayName, email, photoURL, uid } = searchedUser;

  const style1 = {
    color: "#737291",
    fontSize: "1.3rem",
    fontFamily: "Catamaran",
  };

  if (searchedUser.length > 0) {
    return searchedUser.map((user) => {
      return (
        <Wrapper>
          <div>
            <img src={user.photoURL} alt="person face" />
          </div>
          <div className="text-flexSection">
            <p>{user.displayName}</p>
            <p style={{ color: "#8b8da9" }}>last received message will</p>
          </div>
          <button
            className="contact-btn"
            onClick={() =>
              handleAddUser(
                user.displayName,
                user.email,
                user.photoURL,
                user.uid
              )
            }
          >
            add user
          </button>
        </Wrapper>
      );
    });
  }
  return <h1 style={{ ...style1 }}>no users here</h1>;
}

export default UsersListSection;

const Wrapper = styled.div`
  font-family: "Catamaran", Tahoma, Verdana, sans-serif;
  font-size: 1rem;
  line-height: 1.2;
  font-weight: 400;
  color: #ffffff;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem 0.5rem 0.5rem 0.5rem;
  width: 95%;

  .text-flexSection {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  img {
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
  }
`;
