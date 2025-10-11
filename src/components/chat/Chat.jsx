import React, { useState } from "react";
import ChatHeader from "./ChatHeader";
import styled from "styled-components";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--chat-background);
  height: 100vh;
`;
export default function Chat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "السلام عليكم", sender: "me" },
    { id: 2, text: "وعليكم السلام خير ", sender: "other" },
    { id: 3, text: "عامل إيه؟", sender: "me" },
    { id: 4, text: "تمام الحمد لله", sender: "other" },
  ]);
  const handleSendMessage = (newMessage) => {
    const messageObj = {
      id: Date.now(),
      text: newMessage,
      sender: "me",
    };
    setMessages((prev) => [...prev, messageObj]);
  };
  return (
    <Container>
      <ChatHeader />
      <Messages messages={messages} />
      <MessageInput onSend={handleSendMessage} />
    </Container>
  );
}
