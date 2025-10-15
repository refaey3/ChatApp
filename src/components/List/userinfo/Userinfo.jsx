import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/FireBase";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: var(--color-secondry);
  border-radius: 10px;
  margin: 10px;
  position: relative;
`;

const Info = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 5px;
  h2 {
    color: #fff;
    font-size: 13px;
    font-weight: 600;
  }
`;

const MyPhoto = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Edit = styled.div`
  cursor: pointer;
  color: #bbb;
  transition: 0.3s;
  &:hover {
    color: #fff;
  }
`;

const Modal = styled.div`
  position: absolute;
  top: 70px;
  left: 50%;
  transform: translateX(-50%);
  background-color: #202c33;
  padding: 15px;
  border-radius: 10px;
  width: 220px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 10;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);

  input {
    padding: 8px;
    border-radius: 6px;
    border: none;
    outline: none;
    background-color: #2a3942;
    color: #fff;
  }
`;
const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 8px;
`;

const ModalButton = styled.button`
  flex: 1;
  background-color: ${(props) => props.bg || "var(--color-primary)"};
  border: none;
  border-radius: 6px;
  color: white;
  padding: 8px 0;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`;

export default function Userinfo() {
  const navigate = useNavigate();
  const [me, setMe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMe(user);
        setNewName(user.displayName || "");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateName = async () => {
    if (!newName.trim() || !me) return;
    try {
      const auth = getAuth();
      await updateProfile(auth.currentUser, { displayName: newName });
      const userRef = doc(db, "users", me.uid);
      await updateDoc(userRef, { username: newName });
      setMe({ ...me, displayName: newName });
      setShowModal(false);
      toast.success("Name updated successfully!");
    } catch (error) {
      toast.error(`${error}`);
    }
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  if (!me) {
    return (
      <UserInfo>
        <Info>
          <MyPhoto src="/profile-image.jpg" alt="Profile" />
          <h2>Loading...</h2>
        </Info>
      </UserInfo>
    );
  }

  return (
    <UserInfo>
      <Info>
        <MyPhoto src={me.photoURL || "/profile-image.jpg"} alt="Profile" />
        <h2>{me.displayName}</h2>
      </Info>

      <ToastContainer position="top-center" theme="dark" autoClose={500} />

      <Edit onClick={() => setShowModal(true)}>
        <FaPen />
      </Edit>

      {showModal && (
        <Modal>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Enter a new name"
          />
          <Buttons>
            <ModalButton onClick={handleUpdateName}>Save</ModalButton>
            <ModalButton bg="#555" onClick={() => setShowModal(false)}>
              Close
            </ModalButton>
            <ModalButton bg="#d9534f" onClick={handleLogout}>
              Logout
            </ModalButton>
          </Buttons>
        </Modal>
      )}
    </UserInfo>
  );
}
