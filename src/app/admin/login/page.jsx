'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';

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

const LinkText = styled.p`
  margin-top: 10px;
  font-size: 14px;
  color: #e0e0e0;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

export default function LoginPage() {
  const [formData, setFormData] = useState({ email: '', password: '', captcha: '' });
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const generatedCaptcha = "7X3B2";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.captcha !== generatedCaptcha) {
      setError('Incorrect CAPTCHA. Please try again.');
      return;
  }

  try {
      const response = await fetch('/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
      });

      console.log("reposne data",response)
      const data = await response.json();

      if (response.ok) {
          console.log('Login successful:', data);
          localStorage.setItem('authToken', data.token); // Store JWT Token
          router.push('/admin'); // Redirect after successful login
      } else {
          setError(data.message || 'Invalid credentials');
      }
  } catch (error) {
      console.error('Login error:', error);
      setError('An error occurred. Please try again.');
  }
  };

  return (
    <Container>
      <Card>
        <Title>Login</Title>
        <Tagline>Secure access to your admin panel</Tagline>
        <Form onSubmit={handleSubmit}>
          <Input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
          <PasswordContainer>
            <Input type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
            <ToggleButton onClick={togglePasswordVisibility}>{showPassword ? "Hide" : "Show"}</ToggleButton>
          </PasswordContainer>
          <CaptchaContainer>
            <CaptchaBox>{generatedCaptcha}</CaptchaBox>
            <Input type="text" name="captcha" placeholder="Enter CAPTCHA" value={formData.captcha} onChange={handleChange} required />
          </CaptchaContainer>
          <Button type="submit">Login</Button>
        </Form>
        <LinkText onClick={() => router.push('/admin/signup')}>Don't have an account? Sign up</LinkText>
      </Card>
    </Container>
  );
}
