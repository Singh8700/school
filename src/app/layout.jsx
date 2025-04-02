
import './globals.css'
import StyledComponentsRegistry from './registry'
import Header from './components/Header'
import FooterPage from './Footer/page'
import Navbar from "./components/navBar/page"



export const metadata = {
  title: 'KD Public School',
  description: 'Excellence in Education',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
