"use client";

import styled from "styled-components";
import { useRouter } from "next/navigation";

const RibbonContainer = styled.div`
  width: 100vw;
  background: #ff4081;
  padding: 10px 0;
  text-align: center;
  position: absolute;
  z-index:100;
  top: 60px;
  left: 0;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  animation: topSlide 0.5s ease-in-out;

  @keyframes topSlide {
    0% {
      top:0;
    }
      50%{
      top:30px;
      }
    100% {
      top:60px;
    }
  }
`;

const RibbonText = styled.span`
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  transition: 0.3s;
  &:hover {
    text-decoration: underline;
  }
`;

export default function ResultRibbon() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/results");
  };

  return (
    <RibbonContainer>
      <RibbonText onClick={handleClick}>
        🎉 Click Here to Download Your Result! 📜
      </RibbonText>
    </RibbonContainer>
  );
}
