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
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import app from "../lib/FireBase";
import {
  getAuth,
  sendEmailVerification,
  createUserWithEmailAndPassword,
} from "firebase/auth";
export default function Register() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

      navigate("/");
    } catch (e) {
      switch (e.code) {
        case "auth/email-already-in-use":
          alert("يوجد حساب بهذا البريد بالفعل.");
          break;
        case "auth/weak-password":
          alert("كلمة السر ضعيفة");
          break;
        case "auth/invalid-credential":
          alert("كلمة السر او البريد غير صحيحة");
          break;
        default:
          alert("حدث خطأ ما.");
      }
    }
  };
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
            <Input
              type="text"
              placeholder="UserName"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button type="submit">Create your account</Button>
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
