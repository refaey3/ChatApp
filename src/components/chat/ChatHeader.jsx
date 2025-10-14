import React from "react";
import styled from "styled-components";
import { BiPhone, BiVideo, BiDotsVerticalRounded } from "react-icons/bi";
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: space-beween;
  border-bottom: 1px solid var(--border-color);
  padding: 9px;
  background-color: var(--background-color);
`;
const Left = styled.div`
  display: flex;
  gap: 8px;
`;
const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 8px;
  svg {
    color: var(--color-primary);
    font-size: 22px;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      opacity: 0.7;
    }
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
`;
const Photo = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const Name = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: white;
`;
const Status = styled.p`
  color: ${(props) => (props.$online ? "var(--color-primary)" : "#333")};
`;
const Connection = styled.div``;
export default function ChatHeader({ selectedChat }) {
  const isOnline = selectedChat?.online ? true : false;
  return (
    <Container>
      <Left>
        <Photo
          src={selectedChat?.photoURL || "/profile-image.jpg"}
          alt={selectedChat?.username || "Profile"}
        />
        <Info>
          <Name>{selectedChat?.username || "Select a chat"}</Name>
          <Status $online={isOnline}>
            {selectedChat
              ? isOnline
                ? "Online"
                : "Offline"
              : "لا يوجد محادثة مختارة"}
          </Status>
        </Info>
      </Left>
      <Right>
        <BiPhone />
        <BiVideo />
        <BiDotsVerticalRounded />
      </Right>
    </Container>
  );
}
