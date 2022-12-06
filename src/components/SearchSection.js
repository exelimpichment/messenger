import React, { useState } from "react";
import styled from "styled-components";
import { BiSearchAlt2 } from "react-icons/bi";
import { useUserContext } from "../context/UserContext";

function SearchSection() {
  const { handleSubmit, search, setSearch } = useUserContext();

  return (
    <Wrapper onSubmit={handleSubmit}>
      <input
        placeholder="email"
        type="text"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
    </Wrapper>
  );
}

export default SearchSection;

const Wrapper = styled.form`
  width: 100%;
  input {
    background-color: #261c46;
    width: 80%;
    margin: 2rem 2rem 2rem 2rem;
    border: none;
    border-bottom: #393258 2px solid;
    opacity: 0.8;
    font-family: "Catamaran", Tahoma, Verdana, sans-serif;
    font-size: 1.5rem;
    line-height: 1.2;
    font-weight: 400;
    color: white;
  }
`;
