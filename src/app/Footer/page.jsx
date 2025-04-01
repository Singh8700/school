"use client";

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { FaHeart, FaCoffee } from "react-icons/fa";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Link from "next/link";


const FooterContainer = styled(motion.footer)`
  width: 100%;
  color: white;
  padding: 40px 5px 0px 20px;
  text-align: left;
  position: relative;
  bottom: 0;
  left: 0;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: 'Poppins', sans-serif;
  box-shadow: 0px -5px 10px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const SectionsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
  width: 100%;
  max-width: 1200px;
  margin-bottom: 3.5rem;
`;

const Section = styled.div`
  flex: 1;
  min-width: 200px;
  max-width: 250px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 15px;
  color: rgb(${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 255});
`;

const SectionItem = styled.p`
  margin: 5px 0;
  color: #f8f9fa;
`;

const FooterBottom = styled.div`
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 20px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.p`
  margin: 0;
  display:flex;
  justify-content:center;
  color: #f8f9fa;
`;

const IconContainer = styled.span`
  color: #ffcc70;
  margin: 0 5px;
`;
const Tagline = styled.p`
  font-size: 1rem;
  font-style: italic;
  opacity: 0.8;
  margin-bottom: 1rem;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;


const SocialIcons = styled(motion.div)`
  display: flex;
  justify-content:center;
  align-item:center;
  gap: 15px;
  margin-top: 1rem;

  a {
    color: white;
    font-size: 1.8rem;
    transition: transform 0.3s ease, color 0.3s ease;

    &:hover {
      color: #ffcc00;
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    gap: 10px;
    a {
      font-size: 1.5rem;
    }
  }
`;


const FooterPage = () => {
  return (
    <FooterContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <SectionsContainer>
      <Section>
          <SectionTitle>About KD Public School</SectionTitle>
          <SectionItem>Providing quality education since 2000, nurturing students for a better future.</SectionItem>
        </Section>
        <Section>
          <SectionTitle>Quick Links</SectionTitle>
          <SectionItem>Home</SectionItem>
          <SectionItem>About Us</SectionItem>
          <SectionItem>Contact</SectionItem>
        </Section>
        <Section>
          <SectionTitle>Academics</SectionTitle>
          <SectionItem>Primary Education</SectionItem>
          <SectionItem>Secondary Education</SectionItem>
          <SectionItem>Extracurricular Activities</SectionItem>
        </Section>
        <Section>
          <SectionTitle>Contact Info</SectionTitle>
          <SectionItem><FaPhone /> +91 98765 43210</SectionItem>
          <SectionItem><FaEnvelope /> contact@kdpublicschool.com</SectionItem>
          <SectionItem><FaMapMarkerAlt /> 123, School Road, Delhi, India</SectionItem>
        </Section>
        <br></br>
        <Section>
        <Tagline>"Empowering young minds for a brighter future."</Tagline>
      <SocialIcons
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="#" aria-label="Facebook"><FaFacebook /></Link>
        <Link href="#" aria-label="Twitter"><FaTwitter /></Link>
        <Link href="#" aria-label="Instagram"><FaInstagram /></Link>
        <Link href="#" aria-label="LinkedIn"><FaLinkedin /></Link>
      </SocialIcons>
        </Section>
      </SectionsContainer>
      <FooterBottom>
        <FooterText>
          Made with
          <IconContainer>
            <FaHeart />
          </IconContainer>
          and
          <IconContainer>
            <FaCoffee />
          </IconContainer>
        </FooterText>
        <FooterText>© 2025 rohit.singh8700. All rights reserved.</FooterText>
      </FooterBottom>
    </FooterContainer>
  );
};

export default FooterPage;
