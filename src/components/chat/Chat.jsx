import React, { useEffect, useState } from "react";
import ChatHeader from "./ChatHeader";
import styled from "styled-components";
import Messages from "./Messages";
import MessageInput from "./MessageInput";
import { getAuth } from "firebase/auth";
import { generateChatId } from "../../lib/chatUtils.js";
import { db } from "../../lib/FireBase.js";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  doc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: var(--chat-background);
  height: 100vh;
`;
const NoChat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  height: 100%;
  color: #c7d0d6;
  text-align: center;
  padding: 24px;

  h3 {
    margin: 0;
    font-size: 28px;
    color: white;
    font-weight: 700;
    letter-spacing: 0.2px;
  }

  img {
    width: 120px;
    height: 120px;
    object-fit: contain;
  }
`;
export default function Chat({ selectedChat, onBack}) {
  const [messages, setMessages] = useState([]);
  const auth = getAuth();

  const currentUser = auth.currentUser;
  useEffect(() => {
    if (!currentUser || !selectedChat) return;
    const chatId = generateChatId(currentUser.uid, selectedChat.id);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const q = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [currentUser, selectedChat]);

  const handleSendMessage = async (text) => {
    if (!text.trim() || !selectedChat || !currentUser) return;
    const chatId = generateChatId(currentUser.uid, selectedChat.id);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const senderRef = doc(
      db,
      "userChats",
      currentUser.uid,
      "chats",
      selectedChat.id
    );
    const receiverRef = doc(
      db,
      "userChats",
      selectedChat.id,
      "chats",
      currentUser.uid
    );
    await addDoc(messagesRef, {
      text,
      senderId: currentUser.uid,
      createdAt: serverTimestamp(),
    });

    const lastMsgData = {
      lastMsg: text,
      senderId: currentUser.uid,
      updatedAt: serverTimestamp(),
    };

    await Promise.all([
      setDoc(senderRef, { ...selectedChat, ...lastMsgData }, { merge: true }),
      updateDoc(receiverRef, { ...lastMsgData }, { merge: true }),
    ]);
  };
  return (
    <Container>
      {selectedChat ? (
        <>
          <ChatHeader selectedChat={selectedChat} onBack={onBack} />
          <Messages messages={messages} currentUser={currentUser} />
          <MessageInput onSend={handleSendMessage} />
        </>
      ) : (
        <NoChat>
          <h3>Welcome to the world of chat!</h3>
          <img src="/Chat.png" alt="" />
        </NoChat>
      )}
    </Container>
  );
}
