import React, { useState } from "react";
import styled from "styled-components";
import { FaRegSmile } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import EmojiPicker from "emoji-picker-react";
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 20px;
  background-color: var(--background-color);
  border-top: 1px solid var(--border-color);
  position: relative;
`;

const LeftIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  svg {
    color: #aebac1;
    font-size: 22px;
    cursor: pointer;
    transition: 0.2s ease;

    &:hover {
      color: var(--color-primary);
    }
  }
`;

const Input = styled.input`
  flex: 1;
  background-color: #202c33;
  border: none;
  outline: none;
  color: #e9edef;
  padding: 10px 15px;
  border-radius: 8px;
  font-size: 15px;

  &::placeholder {
    color: #8696a0;
  }
`;

const SendButton = styled.button`
  background-color: var(--color-primary);
  color: white;
  border: none;
  outline: none;
  padding: 9px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;
const EmojiPickerWrapper = styled.div`
  position: absolute;
  bottom: 60px;
  left: 20px;
  z-index: 10;
`;
export default function MessageInput({ onSend }) {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const handleSend = () => {
    if (!message.trim()) return;
    onSend(message);
    setMessage("");
  };
  const onEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji); 
  };
  return (
    <Container>
      <LeftIcons>
        <FaRegSmile onClick={() => setShowEmojiPicker(!showEmojiPicker)} />
        <AiOutlinePicture />
      </LeftIcons>
      {showEmojiPicker && (
        <EmojiPickerWrapper>
          <EmojiPicker onEmojiClick={onEmojiClick} />
        </EmojiPickerWrapper>
      )}

      <Input
        placeholder="Type a message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onFocus={false}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        autoComplete="off"
      />

      <SendButton onClick={handleSend}>Send</SendButton>
    </Container>
  );
}
