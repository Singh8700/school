"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Tagline = styled.p`
  font-size: 16px;
  color: #e0e0e0;
  margin-bottom: 16px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  outline: none;
  font-size: 16px;
  transition: 0.3s;
  &:focus {
    background: rgba(255, 255, 255, 0.3);
    border: 2px solid #fff;
  }
`;

const PasswordContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
`;

const ToggleButton = styled.span`
  position: absolute;
  right: 15px;
  cursor: pointer;
  color: white;
  font-size: 14px;
  user-select: none;
`;

const CaptchaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const CaptchaBox = styled.div`
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: bold;
`;

const Button = styled.button`
  width: 100%;
  padding: 14px;
  background: #ff4081;
  border: none;
  border-radius: 10px;
  color: white;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    background: #e91e63;
  }
`;

const ErrorMessage = styled.p`
  color: #ccc;
  text-shadow: 1px 1px 1px #000;
  font-size: 14px;
  margin-top: 8px;
  font-weight: bold;
`;

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: "", password: "", captcha: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  // CAPTCHA Generator Function
  const generateCaptcha = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let captcha = "";
    for (let i = 0; i < 5; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return captcha;
  };

  // Generate CAPTCHA on Load
  useEffect(() => {
    setGeneratedCaptcha(generateCaptcha());
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    if (formData.captcha !== generatedCaptcha) {
      setErrorMessage("❌ CAPTCHA is wrong");
      setGeneratedCaptcha(generateCaptcha()); // CAPTCHA Change on Incorrect Attempt
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("✅ Login successful:", data);
        localStorage.setItem("authToken", data.token);
        router.push("/admin");
      } else {
        setErrorMessage("❌ User & Password not exist");
      }
    } catch (error) {
      setErrorMessage("❌ An error occurred. Please try again.");
    }

    setGeneratedCaptcha(generateCaptcha()); // CAPTCHA Change on Every Login Click
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <Tagline>Secure access to your admin panel</Tagline>
        <Form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <PasswordContainer>
            <Input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <ToggleButton onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</ToggleButton>
          </PasswordContainer>
          <CaptchaContainer>
            <CaptchaBox>{generatedCaptcha}</CaptchaBox>
            <Input type="text" name="captcha" placeholder="Enter CAPTCHA" value={formData.captcha} onChange={handleChange} required />
          </CaptchaContainer>
          <Button type="submit">Login</Button>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Form>
      </Card>
    </Container>
  );
}
