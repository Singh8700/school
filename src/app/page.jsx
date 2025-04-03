'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaGraduationCap, FaBook, FaChalkboardTeacher, FaSchool, FaPhone } from 'react-icons/fa'
import TeachersPage from './Tearchers/page'
import FacilitiesPage from './facilities/page'

const MainContainer = styled(motion.div)`
  min-height: 100vh;
  color: white;
`

const HeroContainer = styled.div`
  position: relative;
  height: 100vh;
  width: 100%;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
 
`

const ImageContainer = styled(motion.div)`
  position: absolute;

  inset: 0;
`

const ContentOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  padding: 0 4rem;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  text-align:center;
  backdrop-filter: blur(10px);
`

const HeroContent = styled.div`
  max-width: 800px;
`

const Title = styled(motion.h1)`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`

const Subtitle = styled(motion.p)`
  font-size: 1.25rem;
  margin-bottom: 2rem;
`

const Button = styled(motion.button)`
  background: #2563eb;
  color: white;
  padding: 1rem 2rem;
  border-radius: 0.5rem;
  font-weight: 600;
  border: none;
  cursor: pointer;
  font-size: 1.125rem;
  
  &:hover {
    background: #1d4ed8;
  }
`

const Section = styled.section`
  padding: 5rem 2rem;
  background: ${props => props.background || '#000'};
  color: white;
`

const SectionContent = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 3rem;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const GridItem = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  p {
    color: #e5e7eb;
    line-height: 1.6;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
`

const FeatureCard = styled(motion.div)`
  text-align: center;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 1rem;
  backdrop-filter: blur(10px);

  svg {
    font-size: 3rem;
    color: #2563eb;
    margin-bottom: 1rem;
  }

  h3 {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  p {
    color: #e5e7eb;
  }
`

const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`

const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    
    svg {
      color: #2563eb;
    }
  }
`

const ContactForm = styled(motion.form)`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  input, textarea {
    padding: 0.75rem;
    border-radius: 0.5rem;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.1);
    color: white;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  textarea {
    height: 8rem;
  }
`

const heroImages = [
  '/images/school1.png',
  '/images/school2.png',
  '/images/school3.png',
  '/images/school4.jpg',
]

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === heroImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <MainContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <HeroContainer id="home-section">
        <AnimatePresence mode='wait'>
          {heroImages.map((image, index) => (
            index === currentImageIndex && (
              <ImageContainer
                key={image}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <Image
                  src={image}
                  alt={`School Image ${index + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={index === 0}
                />
              </ImageContainer>
            )
          ))}
        </AnimatePresence>
        
        <ContentOverlay>
          <HeroContent >
            <Title
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Welcome to Design Of Fashion Art School
            </Title>
            <Subtitle
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Nurturing Excellence, Building Future Leaders
            </Subtitle>
            <Button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Explore More
            </Button>
          </HeroContent>
        </ContentOverlay>
      </HeroContainer>

      {/* About Section */}
      <Section id="about-section">
        <SectionContent
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
         >
          <SectionTitle>About Our School</SectionTitle>
          <Grid>
            <GridItem>
              <h3>Our Vision</h3>
              <p>
                To create a nurturing environment where students can develop their full potential
                and become responsible global citizens.
              </p>
            </GridItem>
            <GridItem>
              <h3>Our Mission</h3>
              <p>
                To provide quality education that develops intellectual curiosity, creativity,
                and moral values in our students.
              </p>
            </GridItem>
          </Grid>
        </SectionContent>
      </Section>

      {/* Features Section */}
      <Section background="#111">
        <SectionContent
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <SectionTitle>Why Choose Us?</SectionTitle>
          <FeatureGrid>
            {[
              { icon: FaGraduationCap, title: "Academic Excellence", desc: "Outstanding academic programs" },
              { icon: FaChalkboardTeacher, title: "Expert Faculty", desc: "Experienced teaching staff" },
              { icon: FaSchool, title: "Modern Facilities", desc: "State-of-the-art infrastructure" },
            ].map((feature, index) => (
              <FeatureCard
                key={feature.title}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <feature.icon />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </FeatureCard>
            ))}
          </FeatureGrid>
        </SectionContent>
      </Section>
      <TeachersPage/>
      <FacilitiesPage/>
    </MainContainer>
  )
}
