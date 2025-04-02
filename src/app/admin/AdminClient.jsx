'use client';


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
  max-width: 500px;
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

const Content = styled.p`
  font-size: 18px;
  color: #e0e0e0;
`;

export default function AdminPage() {

  return (
    <Container>
      <Card>
        <Title>Admin Dashboard</Title>
        <Content>Welcome to the admin panel. Manage your application here.</Content>
      </Card>
    </Container>
  );
}
