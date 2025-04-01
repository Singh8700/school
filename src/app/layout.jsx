import { Inter } from 'next/font/google'
import './globals.css'
import StyledComponentsRegistry from './registry'
import Header from './components/Header'
import FooterPage from './Footer/page'
import Navbar from "./components/navBar/page"

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'KD Public School',
  description: 'Excellence in Education',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <Header />
          <main className="min-h-screen bg-white">
            {children}
          </main>
          <Navbar/>
          <FooterPage/>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
