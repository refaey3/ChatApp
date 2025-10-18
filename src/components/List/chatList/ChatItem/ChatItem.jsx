import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { onSnapshot, collection, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../../lib/FireBase";

function useUserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (!currentUser) {
      setLoading(false);
      return;
    }

    const fetchUserData = async () => {
      try {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUserInfo(userSnap.data());
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return { userInfo, loading };
}

const Header = styled.h2`
  color: var(--color-primary);
  font-size: 20px;
  font-weight: 600;
  margin-top: -10px;
  margin-bottom: 10px;
  padding-left: 5px;
  margin-left: 5px;
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

export default function ChatItem({ searchName, onSelectChat }) {
  const [chats, setChats] = useState([]);
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const { userInfo } = useUserInfo();

  useEffect(() => {
    if (!currentUser) return;

    const userChatsRef = collection(db, "userChats", currentUser.uid, "chats");

    const unsubscribe = onSnapshot(userChatsRef, (snapshot) => {
      const chatsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setChats(chatsData);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const filteredChats =
    searchName.trim() === ""
      ? chats
      : chats.filter((chat) =>
          chat.username.toLowerCase().startsWith(searchName.toLowerCase())
        );

  return (
    <div>
      <Header>Chats</Header>
      {filteredChats.length > 0 ? (
        filteredChats.map((chat) => (
          <Container key={chat.id} onClick={() => onSelectChat(chat)}>
            <ProfilePhoto
              src={chat.photoUrl || "/profile-image.jpg"}
              alt={chat.name}
            />
            <Info>
              <Name>{chat.username || userInfo?.username || "User"}</Name>
              <LastMsg>{chat.lastMsg || "Start new conversation"}</LastMsg>
            </Info>
          </Container>
        ))
      ) : (
        <p style={{ color: "#aaa", textAlign: "center" }}>No users found</p>
      )}
    </div>
  );
}
