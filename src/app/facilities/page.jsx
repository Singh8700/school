"use client";

import styled from "styled-components";
import { motion } from "framer-motion";

// Facilities Data
const facilities = [
  {
    name: "Library",
    description: "A well-stocked library with books and resources for all subjects.",
    image: "https://source.unsplash.com/1600x900/?library",
  },
  {
    name: "Sports Complex",
    description: "A spacious sports complex for various indoor and outdoor activities.",
    image: "https://source.unsplash.com/1600x900/?sports",
  },
  {
    name: "Computer Lab",
    description: "State-of-the-art computers and software for hands-on learning.",
    image: "https://source.unsplash.com/1600x900/?computer-lab",
  },
  {
    name: "Science Lab",
    description: "Fully equipped science labs for practical learning and experiments.",
    image: "https://source.unsplash.com/1600x900/?science-lab",
  },
];

// Page Container
const FacilitiesContainer = styled.div`
  background-color: #121212;
  color: #f4f4f4;
  padding: 60px 20px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  min-height: 100vh;
  background: url("https://source.unsplash.com/1600x900/?school") center/cover no-repeat;
  backdrop-filter: blur(5px);
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    padding: 40px 10px;
  }
`;

// Page Heading
const PageTitle = styled(motion.h1)`
  font-size: 3rem;
  color: #ffcc00;
  margin-bottom: 30px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-shadow: 2px 2px 8px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

// Facilities Grid
const FacilitiesGrid = styled.div`
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

// Facility Card
const FacilityCard = styled(motion.div)`
  background: rgba(28, 28, 28, 0.8);
  padding: 25px;
  border-radius: 15px;
  width: 250px;
  text-align: center;
  box-shadow: 0px 6px 25px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
  backdrop-filter: blur(10px);
  overflow: hidden;
  cursor: pointer;
  &:hover {
    transform: scale(1.5);
    box-shadow: 0 10px 35px rgba(0, 0, 0, 0.5);
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

// Facility Image
const FacilityImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 15px;
`;

// Facility Name
const FacilityName = styled.h3`
  color: #ffcc00;
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

// Facility Description
const FacilityDescription = styled.p`
  color: #b0b0b0;
  font-size: 1rem;
`;

const FacilitiesPage = () => {
  return (
    <FacilitiesContainer id="facilities-section">
      <PageTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Our Facilities
      </PageTitle>

      <FacilitiesGrid>
        {facilities.map((facility, index) => (
          <FacilityCard
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <FacilityImage src={facility.image} alt={facility.name} />
            <FacilityName>{facility.name}</FacilityName>
            <FacilityDescription>{facility.description}</FacilityDescription>
          </FacilityCard>
        ))}
      </FacilitiesGrid>
    </FacilitiesContainer>
  );
};

export default FacilitiesPage;
