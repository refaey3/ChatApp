import React from "react";
import styled from "styled-components";
const Container = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isMine ? "flex-end" : "flex-start")};
`;
const Buuble = styled.div`
  background-color: ${(props) =>
    props.$isMine ? "var(--color-primary)" : "var(--bubble-color)"};
  color: white;
  padding: 10px 15px;
  border-radius: 15px;
  max-width: 60%;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;
export default function Message({ msg, currentUser }) {
  const isMine = msg.senderId === currentUser.uid;
  return (
    <Container $isMine={isMine}>
      <Buuble $isMine={isMine}>{msg.text}</Buuble>
    </Container>
  );
}
