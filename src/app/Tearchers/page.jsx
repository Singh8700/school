"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

// Updated teacher data with online image links
const teachers = [
  { name: "Mr. Arjun Sharma", subject: "Mathematics", image: "https://randomuser.me/api/portraits/men/1.jpg" },
  { name: "Ms. Neha Verma", subject: "Science", image: "https://randomuser.me/api/portraits/women/2.jpg" },
  { name: "Mr. Rajesh Kapoor", subject: "English", image: "https://randomuser.me/api/portraits/men/3.jpg" },
  { name: "Ms. Pooja Malhotra", subject: "Social Studies", image: "https://randomuser.me/api/portraits/women/4.jpg" },
  { name: "Mr. Aman Saxena", subject: "Computer Science", image: "https://randomuser.me/api/portraits/men/5.jpg" },
];

// Page container
const TeachersContainer = styled.div`
  background: url("https://source.unsplash.com/1600x900/?classroom,education") center/cover no-repeat;
  color: #f4f4f4;
  padding: 60px 20px;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  text-align: center;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

// Page heading
const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  color: #ffcc00;
  margin-bottom: 20px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Teacher grid container
const TeachersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  margin-top: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

// Individual teacher card
const TeacherCard = styled(motion.div)`
  background: rgba(28, 28, 28, 0.8);
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.3);
  width: 250px;
  text-align: center;
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  backdrop-filter: blur(10px);

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

// Teacher image
const TeacherImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  border: 3px solid #ffcc00;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: rotate(10deg);
  }
`;

// Teacher name
const TeacherName = styled.h3`
  color: #ffcc00;
  font-size: 1.5rem;
  margin-bottom: 5px;
`;

// Teacher subject
const TeacherSubject = styled.p`
  font-size: 1rem;
  color: #b0b0b0;
`;

const TeachersPage = () => {
  return (
    <TeachersContainer id="teachers-section">
      <PageTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Meet Our Teachers
      </PageTitle>

      <TeachersGrid>
        {teachers.map((teacher, index) => (
          <TeacherCard
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <TeacherImage src={teacher.image} alt={teacher.name} />
            <TeacherName>{teacher.name}</TeacherName>
            <TeacherSubject>{teacher.subject}</TeacherSubject>
          </TeacherCard>
        ))}
      </TeachersGrid>
    </TeachersContainer>
  );
};

export default TeachersPage;
