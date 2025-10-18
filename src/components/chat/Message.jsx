import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: ${(props) => (props.$isMine ? "flex-end" : "flex-start")};
  margin: 4px 0;
`;

const Bubble = styled.div`
  position: relative;
  background-color: ${(props) =>
    props.$isMine ? "var(--color-primary)" : "var(--bubble-color)"};
  color: white;
  padding: 6px 40px 12px 12px; 
  border-radius: 8px;
  max-width: 60%;
  font-size: 14px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  word-wrap: break-word;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    ${(props) => (props.$isMine ? "right: -7px;" : "left: -7px;")}
    width: 0;
    height: 0;
    border: 7px solid transparent;
    border-top-color: transparent;
    border-bottom: none;
    ${(props) =>
      props.$isMine
        ? "border-left-color: var(--color-primary);"
        : "border-right-color: var(--bubble-color);"}
  }
`;

const Time = styled.span`
  position: absolute;
  bottom: 1px;
  right: 8px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.8);
  padding-top: 5px;
`;

export default function Message({ msg, currentUser }) {
  const formattedTime = msg.createdAt?.toDate
    ? msg.createdAt.toDate().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  const isMine = msg.senderId === currentUser.uid;

  return (
    <Container $isMine={isMine}>
      <Bubble $isMine={isMine}>
        {msg.text}
        <Time>{formattedTime}</Time>
      </Bubble>
    </Container>
  );
}
