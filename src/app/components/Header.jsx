"use client"
import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

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
  justify-content: center;
  align-items: center;
  
  @media (max-width: 768px) {
    display: none;
    
    &.mobile {
      display: flex;
      justify-content: flex-start;
      align-items: flex-start;
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

const LoginButton = styled.button`
  background: #2563eb;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  font-weight: 500;
  cursor: pointer;
  line-height: 1em;
  
  &:hover {
    background: #1d4ed8;
  }
  
  a {
    text-decoration: none;
    color: #fff;
  }
`

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [logoutData, setLogoutData] = useState("")
  const pathName = usePathname()

  const menuRef = useRef(null)

  useEffect(() => {
    setLogoutData(localStorage.getItem("authToken"))

    // Close menu if clicked outside
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [pathName])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout')
      const data = await response.json()

      if (response.ok) {
        localStorage.clear()
        window.location.href = "/"
      } else {
        console.error("Logout failed:", data.message)
      }
    } catch (error) {
      console.error("Error logging out:", error)
    }
  }

  const menuItems = [
    { title: 'Home', href: '/' },
    { title: 'About', href: '/about' },
    { title: 'Academics', href: '/academics' }
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
            Design Of Fashion Art School
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
          {logoutData ? (
            <LoginButton>
              <Link href="/" onClick={handleLogout}>Logout</Link>
            </LoginButton>
          ) : (
            <LoginButton>
              <Link href="/admin/login">Login</Link>
            </LoginButton>
          )}
        </NavLinks>

        {/* Mobile Menu Button */}
        <MenuButton onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </MenuButton>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <NavLinks
              ref={menuRef} // Ref to detect outside clicks
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
                  onClick={() => setIsMenuOpen(false)} // ✅ Close menu on link click
                  as={motion.a}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {item.title}
                </NavLink>
              ))}
              {logoutData ? (
                <LoginButton>
                  <Link href="/" onClick={() => { setIsMenuOpen(false); handleLogout(); }}>
                    Logout
                  </Link>
                </LoginButton>
              ) : (
                <LoginButton>
                  <Link href="/admin/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </LoginButton>
              )}
            </NavLinks>
          )}
        </AnimatePresence>
      </Nav>
    </HeaderContainer>
  )
}
