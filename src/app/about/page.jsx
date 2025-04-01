"use client";

import styled from 'styled-components';
import { motion } from 'framer-motion';

// Main container with black background theme
const AboutContainer = styled.div`
  width:100vw;
  display: flex;
  overflow-x:hidden;
  flex-direction: column;
  align-items: center;
  dispaly:flex;
  justify-content:center;
  flex-direction-clumns;
  flex-wrap:wrap;
  align-items:center;
  padding: 50px 20px;
  background-color: #121212; /* Black background */
  color: white;
  min-height: 100vh;
  text-align: center;
`;

// Section for general content with dark background
const AboutSection = styled.section`
  width: 80%;
  dispaly:flex;
  justify-content:center;
  align-items:center;
  max-width: 1200px;
  margin: 30px auto;
//   padding: 40px;
  background-color: #1f1f1f; /* Dark background for sections */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
   transform: scale(0.9);
  &:hover {
    transform: scale(1);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  }

  & h2 {
    font-size: 2.5rem;
    color: #ffcc00; /* Highlight title color */
    margin-bottom: 20px;
    transition: all 0.3s ease-in-out;
  }

  & p {
    font-size: 1.2rem;
    color: #ddd;
    line-height: 1.8;
    margin: 20px 0;
    transition: opacity 0.3s ease-in-out;
    opacity: 0.8;
  }

  @media (max-width: 768px) {
    padding: 20px;
    margin: 20px;
    & h2 {
      font-size: 2rem;
    }
    & p {
      font-size: 1rem;
    }
  }
`;

// Container for Vision and Mission sections with flexbox
const VisionMissionContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items:center;
  gap: 30px;
  flex-wrap: wrap;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

// Section for Vision and Mission with dark background
const VisionMissionSection = styled.div`
  flex: 1;
  min-width: 280px;
  max-width: 400px;
  background-color: #333;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.5);
  }

  & h3 {
    color: #ffcc00;
    font-size: 1.8rem;
    margin-bottom: 15px;
  }

  & p {
    font-size: 1.1rem;
    color: #ccc;
    line-height: 1.7;
  }

  @media (max-width: 768px) {
    padding: 20px;
    & h3 {
      font-size: 1.5rem;
    }
    & p {
      font-size: 1rem;
    }
  }
`;

// AboutPage component with motion animation
const AboutPage = () => {
  return (
    <AboutContainer>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <AboutSection>
          <h2>About KD Public School</h2>
          <p>
            KD Public School, established in 2000, has been a beacon of quality
            education, committed to shaping young minds into responsible global citizens. We focus on
            providing a holistic learning experience that nurtures academic excellence and personal growth.
          </p>
        </AboutSection>

        <VisionMissionContainer>
          <VisionMissionSection
            as={motion.div}
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>Our Vision</h3>
            <p>
              Our vision is to cultivate a nurturing environment where every student is inspired to reach
              their full potential. We aim to foster critical thinking, creativity, and a love for lifelong learning.
            </p>
          </VisionMissionSection>
          <VisionMissionSection
            as={motion.div}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h3>Our Mission</h3>
            <p>
              Our mission is to provide a challenging academic environment that emphasizes holistic development,
              preparing our students for future challenges, both in academics and life.
            </p>
          </VisionMissionSection>
        </VisionMissionContainer>

        <AboutSection>
          <h2>Our Faculty</h2>
          <p>
            Our dedicated and experienced faculty is the heart of KD Public School. They are passionate educators
            who strive to bring out the best in every student through innovative teaching practices and a personal
            commitment to their growth.
          </p>
        </AboutSection>

        <AboutSection>
          <h2>School History</h2>
          <p>
            Founded with the aim of delivering high-quality education, KD Public School has been a trusted institution
            for over two decades. With continuous growth and development, we have expanded our curriculum and 
            extracurricular activities, providing a well-rounded education.
          </p>
        </AboutSection>
      </motion.div>
    </AboutContainer>
  );
};

export default AboutPage;
