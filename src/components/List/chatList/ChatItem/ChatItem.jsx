import React from "react";
import styled from "styled-components";
const Header = styled.h2`
  color: var(--color-primary);
  font-size: 20px;
  font-weight: 600;
  margin-top: -10px;
  margin-bottom: 10px;
  padding-left: 5px;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.3s;
  &:hover {
    background-color: #309700ff;
  }
`;

const ProfilePhoto = styled.img`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  object-fit: cover;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  overflow: hidden;
`;

const Name = styled.h3`
  color: white;
  font-weight: 600;
  font-size: 15px;
`;

const LastMsg = styled.p`
  color: #aaa;
  font-size: 13px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export default function ChatItem({ searchName }) {
  const chats = [
    {
      id: 1,
      name: "7mada",
      lastMsg: "علي فرحه الحرمين",
      src: "/profile-image.jpg",
    },
    {
      id: 2,
      name: "Anoos",
      lastMsg: "حبيبي يشيخ",
      src: "/profile-image.jpg",
    },
    {
      id: 3,
      name: "Manoo",
      lastMsg: "الوووووووووووو",
      src: "/profile-image.jpg",
    },
    {
      id: 4,
      name: "moSalah",
      lastMsg: "مش فاضي النهارده",
      src: "/profile-image.jpg",
    },
    {
      id: 5,
      name: "OsamaElzer",
      lastMsg: "رافض العرض يهندسه",
      src: "/profile-image.jpg",
    },
  ];
  const filteredChats =
    searchName.trim() === ""
      ? chats
      : chats.filter((chat) =>
          chat.name.toLowerCase().startsWith(searchName.toLowerCase())
        );
  return (
    <div>
      <Header>Chats</Header>
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <Container key={chat.id}>
            <ProfilePhoto src={chat.src} alt={chat.name} />
            <Info>
              <Name>{chat.name}</Name>
              <LastMsg>{chat.lastMsg}</LastMsg>
            </Info>
          </Container>
        ))
      ) : (
        <p style={{ color: "#aaa", textAlign: "center" }}>No users found</p>
      )}
    </div>
  );
}
