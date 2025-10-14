import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { FaPen } from "react-icons/fa";
import { getAuth, onAuthStateChanged } from "firebase/auth";
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
  background-color: var(--color-secondry);
  border-radius: 10px;
  margin: 10px;
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

export default function Userinfo() {
  const [me, setMe] = useState(null);
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setMe(user);
      }
    });
    return () => unsubscribe();
  }, []);
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
        <MyPhoto src="/profile-image.jpg" alt="Profile" />
        <h2>{me.displayName}</h2>
      </Info>
      <Edit>
        <FaPen />
      </Edit>
    </UserInfo>
  );
}
