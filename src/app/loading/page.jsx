"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import styled from "styled-components";

const LoadingOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction:column;
  z-index: 9999;
`;

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction:column;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0px 4px 20px rgba(255, 255, 255, 0.2);
  text-align: center;
`;

const Loader = styled.div`
display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #ffffff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled(motion.p)`
text-align:center;
  color: #fff;
  font-size: 18px;
  margin-top: 15px;
  font-weight: bold;
`;

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 5000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <LoadingOverlay
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <LoaderContainer>
        <Loader />
        <LoadingText
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ repeat: Infinity, duration: 1.5, repeatType: "reverse" }}
        >
          Loading, please wait...
        </LoadingText>
      </LoaderContainer>
    </LoadingOverlay>
  );
}
