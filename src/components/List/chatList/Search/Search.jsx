import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { BiPlus } from "react-icons/bi";
import styled from "styled-components";
import auth from "../../../../lib/FireBase";
import { db } from "../../../../lib/FireBase";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const SearchAddContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
  border-radius: 8px;
`;

const SearchBox = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background-color: var(--color-secondry);
  padding: 8px 12px;
  border-radius: 8px;
  flex: 1;

  svg {
    color: #aaa;
    font-size: 14px;
  }
`;

const Input = styled.input`
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 14px;
  width: 100%;

  &::placeholder {
    color: #777;
  }
`;

const Plus = styled.div`
  margin-left: 10px;
  background-color: var(--color-secondry);
  border-radius: 8px;
  padding: 7px;
  cursor: pointer;
  transition: 0.3s;

  svg {
    margin-top: 1px;
    color: #fff;
    font-size: 20px;
  }

  &:hover {
    background-color: green;
  }
`;
const PopUpOverLay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;
const PopUpContent = styled.div`
  background: var(--background-color);
  color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 320px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 10px;

  input {
    padding: 6px 8px;
    border-radius: 6px;
    border: 1px solid #444;
    background: #111;
    color: #eee;
  }
  .result {
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: space-around;
    margin-top: 10px;
    div {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 9px;
    }
    img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      object-fit: cover;
    }

    h4 {
      margin: 0;
    }
  }

  .close {
    background: #444;
  }
  button {
    background: #309700;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
  }
`;
export default function Search({ onSearch }) {
  const [popUp, setPopUp] = useState(false);
  const [searchItem, setSearchItem] = useState("");
  const [loading, setLoading] = useState(false);
  const [foundUser, setFoundUser] = useState(null);
  const togglePopUP = () => {
    setPopUp(!popUp);
    setSearchItem("");
    setFoundUser(null);
  };
  const searchInDB = async () => {
    if (!searchItem) return toast.info("enter userName");
    setLoading(true);
    try {
      const q = query(
        collection(db, "users"),
        where("username", "==", searchItem)
      );
      const snapShot = await getDocs(q);
      if (!snapShot.empty) {
        const userData = snapShot.docs[0].data();
        setFoundUser({ id: snapShot.docs[0].id, ...userData });
      } else {
        setFoundUser(null);
        toast.error("user Not found");
      }
    } catch (err) {
      console.log("this is an err", err);
    }
    setLoading(false);
  };
  const handleAddUser = async () => {
    if (!foundUser) return;
    const auth = getAuth();
    const me = auth.currentUser;
    if (!me) return alert("Login Fisrt");
    if (me.uid === foundUser.id) return toast.info("you cant add you hahahaha");
    const chatRef = doc(db, "userChats", me.uid, "chats", foundUser.id);
    await setDoc(
      chatRef,
      {
        userId: foundUser.id,
        username: foundUser.username,
        photoURL: foundUser.photoURL || "/profile-image.jpg",
        addedAt: serverTimestamp(),
      },
      { merge: true }
    );
    const meDoc = await getDocs(
      query(collection(db, "users"), where("uid", "==", me.uid))
    );
    const meData = meDoc.docs[0]?.data();

    const otherChatRef = doc(db, "userChats", foundUser.id, "chats", me.uid);
    await setDoc(
      otherChatRef,
      {
        userId: me.uid,
        username: meData?.username || "Unknown",
        photoURL: meData?.photoURL || "/profile-image.jpg",
        addedAt: serverTimestamp(),
      },
      { merge: true }
    );
    toast.success("user Added");
    togglePopUP();
  };
  return (
    <SearchAddContainer>
      <SearchBox>
        <FaSearch />
        <Input
          placeholder="Search"
          type="text"
          onChange={(e) => onSearch(e.target.value)}
        />
      </SearchBox>
      <Plus onClick={togglePopUP}>
        <BiPlus />
      </Plus>
      {popUp && (
        <PopUpOverLay>
          <PopUpContent>
            <h3>Add New Friend</h3>
            <input
              type="text"
              placeholder="UserName"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
            />
            <button onClick={searchInDB} disabled={loading}>
              {loading ? "Searching...." : "search"}
            </button>
            {foundUser && (
              <div className="result">
                <div>
                  <img
                    src={foundUser.photoURL || "/public/profile-image.jpg"}
                    alt={foundUser.username}
                  />{" "}
                  <h4>{foundUser.username}</h4>
                </div>
                <div>
                  <button onClick={handleAddUser}>Add User</button>
                </div>
              </div>
            )}
            <button className="close" onClick={togglePopUP}>
              Close
            </button>
          </PopUpContent>
        </PopUpOverLay>
      )}{" "}
      <ToastContainer position="top-center" theme="dark" autoClose={500}/>
    </SearchAddContainer>
  );
}
