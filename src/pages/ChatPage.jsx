import React from "react";
import styled from "styled-components";
import List from "../components/List/List";
import Chat from "../components/chat/Chat";
const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  height: 100vh;
  background-color: #f8f9fa;
  @media (max-width: 1000px) {
    grid-template-columns: 0 100%;
  }
`;
export default function ChatPage() {
  return (
    <ChatContainer>
      <List />
      <Chat />
    </ChatContainer>
  );
}
