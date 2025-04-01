'use client'
import { useState } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(8px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`

const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #2563eb;
  cursor: pointer;
`

const MenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #2563eb;
  
  @media (max-width: 768px) {
    display: block;
  }
`

const NavLinks = styled(motion.div)`
  display: flex;
  gap: 2rem;
  
  @media (max-width: 768px) {
    display: none;
    
    &.mobile {
      display: flex;
      flex-direction: column;
      position: fixed;
      top: 70px;
      left: 0;
      right: 0;
      background: white;
      padding: 2rem;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      gap: 1rem;
    }
  }
`

const NavLink = styled(motion.a)`
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
  cursor: pointer;
  
  &:hover {
    color: #2563eb;
  }
`

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const menuItems = [
    { title: 'Home', href: '#' },
    { title: 'About', href: '/about' },
    { title: 'Academics', href: '/academics' },
    // { title: 'Facilities', href: '/facilities' },
    // { title: 'Contact', href: '/contact' }
  ]

  return (
    <HeaderContainer>
      <Nav>
        <Logo>
          <motion.span
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            KD Public School
          </motion.span>
        </Logo>

        {/* Desktop Navigation */}
        <NavLinks>
          {menuItems.map((item, index) => (
            <NavLink
              key={item.title}
              href={item.href}
              as={motion.a}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {item.title}
            </NavLink>
          ))}
        </NavLinks>

        {/* Mobile Menu Button */}
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <NavLinks
              as={motion.div}
              className="mobile"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {menuItems.map((item, index) => (
                <NavLink
                  key={item.title}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  as={motion.a}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.title}
                </NavLink>
              ))}
            </NavLinks>
          )}
        </AnimatePresence>
      </Nav>
    </HeaderContainer>
  )
}
