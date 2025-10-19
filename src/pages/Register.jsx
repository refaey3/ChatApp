import React, { useState } from "react";
import {
  Body,
  Left,
  Logo,
  LoginCard,
  Title,
  Form,
  Divider,
  Input,
  Button,
  Footer,
  Right,
} from "./Login";
import styled from "styled-components";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import app from "../lib/FireBase";
import { db } from "../lib/FireBase";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { updateProfile } from "firebase/auth";
export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const singup = async (e) => {
    e.preventDefault();
    try {
      const user = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      await sendEmailVerification(user.user);
      await updateProfile(user.user, {
        displayName: userName,
        photoURL: "/profile-image.jpg",
      });
      await user.user.reload();
      await getAuth().updateCurrentUser(user.user);
      await setDoc(doc(db, "users", user.user.uid), {
        uid: user.user.uid,
        photoURL: "/profile-image.jpg",
        username: userName,
        online: true,
        chats: [],
        createdAt: serverTimestamp(),
        lastSeen: serverTimestamp(),
      });
      navigate("/");
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          setErrorMessage("An account with this email already exists.");
          break;
        case "auth/weak-password":
          setErrorMessage("The password is weak. ");
          break;
        case "auth/invalid-credential":
          setErrorMessage("The password or email is incorrect.");
          break;
        default:
          setErrorMessage("Something went wrong.");
      }
    }
  };
  const ErrorText = styled.p`
    color: #ff4d4f;
    font-size: 16px;
    margin: 4px 0 8px;
  `;
  return (
    <Body>
      <Left>
        <Logo>
          <img src="/Chat.png" alt="chatLogo" />
          <p>Connect</p>
        </Logo>
        <LoginCard>
          <Title>
            <h3>Create Account</h3>
            <p>Register to get started with your new account.</p>
          </Title>
          <Form onSubmit={singup}>
            {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
            <Input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              autoComplete="off"
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="off"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="off"
            />
            <Button type="submit" >Create your account</Button>
          </Form>

          <Footer>
            Already have an account?
            <a onClick={() => navigate("/Login")} style={{ cursor: "pointer" }}>
              Login
            </a>
          </Footer>
        </LoginCard>
      </Left>
      <Right>
        <Loader />
        <p>
          Connect helps you stay in touch with your friends and manage
          conversations easily. Start your journey now and experience smooth
          chatting.
        </p>
      </Right>
    </Body>
  );
}
