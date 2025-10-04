import React, { useState } from "react";
import styled from "styled-components";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";
import app from "../lib/FireBase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
export const Body = styled.div`
  height: 100vh;
  display: grid;
  grid-template-columns: 40% 60%;
  @media (max-width: 1100px) {
    grid-template-columns: 100% 0;
  }
`;

export const Left = styled.div`
  background-color: var(--background-color);
  position: relative;
`;

export const Right = styled.div`
  position: relative;
  overflow: hidden;
  background-color: #f1f0ee;
  p {
    position: relative;
    max-width: 687px;
    font-size: 18px;
    font-weight: 500;
    margin: 90px auto;

    color: #65654d;
    @media (min-width: 1200px) {
      margin-top: -38px;
    }
  }
  @media (max-width: 1100px) {
    display: none;
  }
`;

export const LoginCard = styled.div`
  margin: 147px auto;
  width: 400px;
  min-height: 400px;
  border: 1px solid var(--border-color);
  padding: 20px;
  padding-top: 30px;

  background-color: var(--background-color);
  border-radius: 10px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
  text-align: center;
  margin: 74px auto;
  @media (max-width: 1024px) {
    width: 350px;
    min-height: 320px;
  }

  @media (max-width: 800px) {
    width: 80%;
    min-height: auto;
  }

  @media (max-width: 500px) {
    width: 100%;
    border-radius: 8px;
    padding: 20px;
  }
`;
export const Logo = styled.div`
  display: flex;
  justify-content: center;
  gap: 103px;
  align-items: center;
  position: relative;
  top: 59px;

  p {
    color: white;
    font-size: 27px;
    font-weight: 700;
  }
  img {
    width: 66px;
  }
`;
export const Title = styled.div`
  margin-bottom: 25px;
  h3 {
    color: white;
    font-size: 28px;
    font-weight: 600;
  }

  h3 {
    color: white;
    font-size: 31px;
    font-weight: 400;
    letter-spacing: 3.5px;
    margin-bottom: 3px;
  }
  p {
    color: #07ab3d;
  }
`;
export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const Input = styled.input`
  padding: 12px;
  border-radius: 6px;
  border: none;
  outline: none;
  background-color: var(--color-secondry, #222);
  color: white;
  font-size: 14px;
`;

export const Button = styled.button`
  padding: 12px;
  border: none;
  border-radius: 6px;
  background-color: #07ab3d;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;
  &:hover {
    background-color: #069233;
  }
`;

export const Divider = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;
  color: #aaa;
  font-size: 14px;
  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: #333;
  }
  &::before {
    margin-right: 10px;
  }
  &::after {
    margin-left: 10px;
  }
`;

export const Footer = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #aaa;
  a {
    color: #07ab3d;
    text-decoration: none;
    margin-left: 5px;
  }
`;
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const submit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("يرجى ادخال جميع البيانات");
      return;
    }
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(getAuth(app), email, password);
      navigate("/");
    } catch (e) {
      switch (e.code) {
        case "auth/user-disabled":
          alert("تم حظر هذا الحساب");
          break;
        case "auth/wrong-password":
          alert("كلمة السر غير صحيح");
          break;
        case "auth/invalid-credential":
          alert("كلمة السر او البريد غير صحيحة");
          break;
        case "auth/user-not-found":
          alert("هذا المستخدم غير موجود");
          break;
        default:
          alert("حدث خطأ ما.");
      }
    } finally {
      setIsLoading(false);
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
            <h3>Welcome Back</h3>
            <p>Login to continue to your account.</p>
          </Title>
          <Form onSubmit={submit}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "loding..." : "Login"}
            </Button>
          </Form>

          <Footer>
            Don’t have an account?
            <a
              onClick={() => navigate("/Register")}
              style={{ cursor: "pointer" }}
            >
              Sign up
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
