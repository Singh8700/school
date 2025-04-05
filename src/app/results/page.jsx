"use client";

import { useState, useEffect } from "react";
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
  max-width: 450px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  color: white;
  border-radius: 16px;
  text-align: center;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h1`
  font-size: 26px;
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
    background: rgba(255, 255, 255, 0.5);
    border: 2px solid #fff;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 14px;
  border-radius: 10px;
  border: none;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  outline: none;
  font-size: 16px;
  transition: 0.3s;
  &:focus {
    background: rgba(0, 0, 0, 0.5);
    border: 2px solid #fff;
  }
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

export default function ResultDownloadPage() {
  const [formData, setFormData] = useState({ rollNumber: "", class: "", captcha: "" });
  const [generatedCaptcha, setGeneratedCaptcha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message

    if (formData.captcha !== generatedCaptcha) {
      setErrorMessage("❌ CAPTCHA is wrong");
      setGeneratedCaptcha(generateCaptcha()); // CAPTCHA Change on Incorrect Attempt
      return;
    }

    console.log("✅ Form submitted successfully!");
    alert("Result downloading...");

    setGeneratedCaptcha(generateCaptcha()); // CAPTCHA Change on Every Submit
  };

  return (
    <Container>
      <Card>
        <Title>Download Your Result</Title>
        <Tagline>Enter your details to access your academic performance</Tagline>
        <Form onSubmit={handleSubmit}>
          <Input type="text" name="rollNumber" placeholder="Roll Number" value={formData.rollNumber} onChange={handleChange} required />
          
          {/* UPDATED CLASS LIST */}
          <Select name="class" value={formData.class} onChange={handleChange} required>
            <option value="">Select Class</option>
            <option value="Nursery">Nursery</option>
            <option value="LKG">LKG</option>
            <option value="UKG">UKG</option>
            <option value="1st">1st</option>
            <option value="2nd">2nd</option>
            <option value="3rd">3rd</option>
            <option value="4th">4th</option>
            <option value="5th">5th</option>
            <option value="6th">6th</option>
            <option value="7th">7th</option>
            <option value="8th">8th</option>
            <option value="9th">9th</option>
            <option value="10th">10th</option>
            <option value="11th">11th</option>
            <option value="12th">12th</option>
          </Select>

          <CaptchaContainer>
            <CaptchaBox>{generatedCaptcha}</CaptchaBox>
            <Input type="text" name="captcha" placeholder="Enter CAPTCHA" value={formData.captcha} onChange={handleChange} required />
          </CaptchaContainer>
          
          <Button type="submit">Download Result</Button>
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </Form>
      </Card>
    </Container>
  );
}
