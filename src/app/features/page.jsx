'use client'
import styled from 'styled-components'
import { motion } from 'framer-motion'
import { FaGraduationCap, FaChalkboardTeacher, FaMicroscope, FaRunning, 
  FaBook, FaBusAlt, FaWifi, FaShieldAlt, FaUserTie } from 'react-icons/fa'

const PageContainer = styled.div`
  padding-top: 80px;
  min-height: 100vh;
  background: linear-gradient(135deg, #f6f8fc 0%, #ffffff 100%);
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
  max-width: 1400px;
  margin: 0 auto;
`

const FeatureCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #2563eb, #4f46e5);
    transform: scaleX(0);
    transition: transform 0.3s ease;
  }

  &:hover::before {
    transform: scaleX(1);
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  }
`

const IconWrapper = styled.div`
  font-size: 3rem;
  color: #2563eb;
  margin-bottom: 1.5rem;
  background: rgba(37, 99, 235, 0.1);
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;

  ${FeatureCard}:hover & {
    transform: scale(1.1);
    background: #2563eb;
    color: white;
  }
`

const Title = styled.h1`
  text-align: center;
  font-size: 2.5rem;
  font-weight: bold;
  margin: 2rem 0;
  background: linear-gradient(90deg, #2563eb, #4f46e5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`

const FeatureTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin: 1rem 0;
  color: #1f2937;
`

const FeatureDescription = styled.p`
  color: #6b7280;
  line-height: 1.6;
`

const features = [
  {
    icon: FaGraduationCap,
    title: "Academic Excellence",
    description: "Comprehensive curriculum designed to foster critical thinking and academic achievement."
  },
  {
    icon: FaChalkboardTeacher,
    title: "Expert Faculty",
    description: "Highly qualified and experienced teachers dedicated to student success."
  },
  {
    icon: FaMicroscope,
    title: "Modern Labs",
    description: "State-of-the-art science and computer labs for practical learning."
  },
  {
    icon: FaRunning,
    title: "Sports Facilities",
    description: "Extensive sports infrastructure for physical development and recreation."
  },
  {
    icon: FaBook,
    title: "Library",
    description: "Well-stocked library with digital resources and quiet study areas."
  },
  {
    icon: FaBusAlt,
    title: "Transportation",
    description: "Safe and reliable transportation service covering major areas."
  },
  {
    icon: FaWifi,
    title: "Smart Classrooms",
    description: "Technology-enabled classrooms with interactive learning tools."
  },
  {
    icon: FaShieldAlt,
    title: "Safety & Security",
    description: "24/7 campus security with CCTV surveillance and strict safety protocols."
  },
  {
    icon: FaUserTie,
    title: "Career Guidance",
    description: "Professional counseling and career development programs."
  }
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const cardVariants = {
  hidden: { 
    opacity: 0,
    y: 20
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
}

export default function Features() {
  return (
    <PageContainer>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Title>Our Key Features</Title>
      </motion.div>
      
      <FeatureGrid
        as={motion.div}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <FeatureCard
            key={feature.title}
            variants={cardVariants}
            whileHover={{ scale: 1.02 }}
          >
            <IconWrapper>
              <feature.icon />
            </IconWrapper>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
          </FeatureCard>
        ))}
      </FeatureGrid>
    </PageContainer>
  )
}
