import React, { useState, useEffect } from "react";
import styled from "styled-components";
import List from "../components/List/List";
import Chat from "../components/chat/Chat";
import { useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";

const ChatContainer = styled.div`
  display: grid;
  grid-template-columns: 20% 80%;
  background-color: #f8f9fa;
  @media (max-width: 1000px) {
    grid-template-columns: ${({ showList }) =>
      showList ? "100% 0" : "100% 100%"};
  }
  height: 100vh;
  overflow: hidden;
`;
const Button = styled.button`
  width: 30px;
  border-radius: 20px;
  height: 30px;
  background: color;
  color: white;
  cursor: pointer;
  position: absolute;
  background: green;
  bottom: 10px;
  width: 102px;
  border: none;
  left: 10px;
`;
export default function ChatPage() {
  const navigate = useNavigate();
  const [showList, setShowList] = useState(true);
  const [selectedChat, setSelectedChat] = useState(null);

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log("User logged out successfully");
      navigate("/");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    if (window.innerWidth <= 1000) setShowList(false);
  };
  return (
    <ChatContainer showList={showList}>
      <List onSelectChat={handleSelectChat} show={showList} />
      <Chat selectedChat={selectedChat} onBack={() => setShowList(true)} />
      <Button onClick={handleLogout}>Logout</Button>
    </ChatContainer>
  );
}
