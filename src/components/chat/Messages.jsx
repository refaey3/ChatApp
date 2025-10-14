import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import Message from "./Message";

const Container = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Messages({ messages, currentUser }) {
  const containerRef = useRef(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);
  return (
    <Container ref={containerRef}>
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} currentUser={currentUser} />
      ))}
    </Container>
  );
}
