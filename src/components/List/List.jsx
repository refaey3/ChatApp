import React, { useState } from "react";
import Search from "./chatList/Search/Search";
import ChatItem from "./chatList/ChatItem/ChatItem";
import styled from "styled-components";
import Userinfo from "./userinfo/Userinfo";

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  background-color: var(--background-color);
  border-right: 1px solid var(--border-color);
  height: 100vh; 
  overflow-y: auto;
 @media (max-width: 1000px) {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100vh;
    transform: ${({ show }) => (show ? "translateX(0)" : "translateX(-100%)")};
    transition: transform 0.3s ease;
    border-right: none;
  }
`;
export default function List({ onSelectChat, show = true }) {
  const [searchName, setSearchName] = useState("");
  return (
    <ListContainer show={show}>
      <Userinfo onSelectChat={onSelectChat} />
      <Search onSearch={setSearchName} />
      <ChatItem searchName={searchName} onSelectChat={onSelectChat} />
    </ListContainer>
  );
}
