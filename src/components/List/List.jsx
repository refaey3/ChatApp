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
`;
export default function List({ onSelectChat }) {
  const [searchName, setSearchName] = useState("");
  return (
    <ListContainer>
      <Userinfo />
      <Search onSearch={setSearchName} />
      <ChatItem searchName={searchName} onSelectChat={onSelectChat} />
    </ListContainer>
  );
}
