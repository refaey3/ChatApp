import React from "react";
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

export default function Messages({ messages }) {
  return (
    <Container>
      {messages.map((msg) => (
        <Message key={msg.id} msg={msg} />
      ))}
    </Container>
  );
}
