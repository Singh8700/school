"use client";

import styled from "styled-components";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaBookReader, FaUsers, FaGraduationCap } from "react-icons/fa";

// Main container for the Academics page
const AcademicsContainer = styled.div`
width:100vw;
  background-color: #121212; /* Black background for dark theme */
  color: #f4f4f4;
  margin:0 auto;
  min-height: 100vh;
  padding-top:8rem;
  font-family: 'Poppins', sans-serif;
  transition: all 0.3s ease;
`;

// Section for the introduction of the Academics page
const IntroSection = styled.section`
width:100%;
  text-align: center;
  margin-bottom: 60px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
//   background:red;
  & h1 {
    font-size: 3rem;
    color: rgba(${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 255},0.8);
    font-weight: 700;
    margin-bottom: 20px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);
    @media (max-width:768px){
        font-size:2rem;
        padding:0 2rem;
    }
  }

  & p {
     width:80%;
    font-size: 1.1rem;
    color: #e0e0e0;
    // background:blue;
    line-height: 1.6;
  }
`;

// Grade container for each grade section
const GradeSection = styled.section`
 width:100vw;
//  background:red;
  display: flex;
  flex-wrap: wrap;
  align-items:center;
  justify-content: center;
  gap: 30px;
  margin-bottom: 50px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

// Card container for each individual grade level
const GradeCard = styled(motion.div)`
  background-color: #000; /* Dark card background */
  padding: 40px 10px;
  width: 280px;
  border-radius: 15px;
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  text-align: center;
  backdrop-filter: blur(10px); /* Subtle blur effect for a modern touch */

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5);
  }

  & h3 {
    color: rgba(${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 255},${()=>  Math.random() * 1});
    text-shadow: 0px 0px 1px #fff;
    font-size: 1.5rem;
    margin-bottom: 15px;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding:0 10px;
  }

  & p {
    font-size: 1rem;
    color: #b0b0b0;
    line-height: 1.6;
    margin-bottom: 15px;
    padding:0 20px;
  }

  @media (max-width: 768px) {
    width: 90%;
    padding: 0;
  }
`;

// Icons for each grade section
const GradeIcon = styled.div`
padding:20px 0 0 0;
  font-size: 2rem;
  color: #ff6f61; /* Red for icons to make them pop */
  margin-bottom: 20px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: rotate(360deg);
    color: #ffcc00; /* Change color on hover */
  }
`;

// Animations for each section
const SectionAnimation = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: "easeOut" },
};

// Academics page component
const AcademicsPage = () => {
  return (
    <AcademicsContainer>
      {/* Introduction Section */}
      <IntroSection>
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Academics at KD Public School
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          At KD Public School, we provide a holistic education that focuses on academic excellence,
          creative development, and emotional growth from Nursery to Grade 8.
        </motion.p>
      </IntroSection>

      {/* Grade Sections */}
      <GradeSection>
        <GradeCard
          initial={SectionAnimation.initial}
          animate={SectionAnimation.animate}
          transition={SectionAnimation.transition}
        >
          <GradeIcon>
            <FaChalkboardTeacher />
          </GradeIcon>
          <h3>Nursery & Kindergarten</h3>
          <p>
            Our early childhood education focuses on foundational skills through play-based
            learning, ensuring every child gets a strong start.
          </p>
        </GradeCard>

        <GradeCard
          initial={SectionAnimation.initial}
          animate={SectionAnimation.animate}
          transition={{ ...SectionAnimation.transition, delay: 0.2 }}
        >
          <GradeIcon>
            <FaBookReader />
          </GradeIcon>
          <h3>Grades 1 to 3</h3>
          <p>
            Children learn essential skills in Language Arts, Mathematics, and Science, with a
            focus on creativity and developing critical thinking.
          </p>
        </GradeCard>

        <GradeCard
          initial={SectionAnimation.initial}
          animate={SectionAnimation.animate}
          transition={{ ...SectionAnimation.transition, delay: 0.4 }}
        >
          <GradeIcon>
            <FaUsers />
          </GradeIcon>
          <h3>Grades 4 to 6</h3>
          <p>
            In these grades, students engage with more complex subjects, while continuing to
            develop their skills in leadership and teamwork through extracurriculars.
          </p>
        </GradeCard>

        <GradeCard
          initial={SectionAnimation.initial}
          animate={SectionAnimation.animate}
          transition={{ ...SectionAnimation.transition, delay: 0.6 }}
        >
          <GradeIcon>
            <FaGraduationCap />
          </GradeIcon>
          <h3>Grades 7 & 8</h3>
          <p>
            Students prepare for their future academic pursuits with more advanced topics in
            various subjects, fostering a sense of responsibility and leadership.
          </p>
        </GradeCard>
      </GradeSection>
    </AcademicsContainer>
  );
};

export default AcademicsPage;
