import React, { useEffect, useState, useContext, useRef } from "react";

const groupContext = React.createContext();

export const GroupContext = ({ children }) => {
  return (
    <groupContext.Provider value={"hello"}>{children}</groupContext.Provider>
  );
};

export const useGroupContext = () => {
  return useContext(groupContext);
};
