'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styled from 'styled-components';


const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea, #764ba2);
  padding: 20px;
`;

const Card = styled(motion.div)`
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
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const InputWrapper = styled.div`
  width: 100%;
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

const SignupText = styled.p`
  margin-top: 12px;
  color: #e0e0e0;
  font-size: 14px;
`;

const SignupLink = styled(Link)`
  color: #ff80ab;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const CaptchaContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
`;

const CaptchaBox = styled.div`
  flex: 1;
  padding: 14px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  border-radius: 10px;
`;

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: '', password: '', captcha: '' });
  const [captcha, setCaptcha] = useState(Math.random().toString(36).substr(2, 6));
  const router = useRouter();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.captcha !== captcha) {
      alert('Invalid CAPTCHA. Please try again.');
      return;
    }
  
    try {
      const response = await fetch('https://school-6tb4.onrender.com/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
  
      console.log("Raw Response:", response);
  
      const data = await response.json();
      console.log("Parsed Response:", data);
  
      if (!response.ok) {
        throw new Error(data.error || 'Signup failed');
      }
  
      alert(data.message || 'Signup successful!')
      return router.push('/admin/login');
    } catch (error) {
      console.error("Signup Error:", error);
      alert(error.message || 'Signup failed!');
    }
  };
  

  return (
    <Container>
      <Card initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Title>KD School</Title>
        <Tagline>Join us and start learning today!</Tagline>
        <Title>Sign Up</Title>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          </InputWrapper>
          <InputWrapper>
            <Input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
          </InputWrapper>
          <CaptchaContainer>
            <CaptchaBox>{captcha}</CaptchaBox>
            <Input type="text" name="captcha" placeholder="Enter CAPTCHA" value={formData.captcha} onChange={handleChange} required />
          </CaptchaContainer>
          <Button type="submit">Sign Up</Button>
        </Form>
        <SignupText>
          Already have an account? <SignupLink href="/admin/login">Login</SignupLink>
        </SignupText>
      </Card>
    </Container>
  );
}