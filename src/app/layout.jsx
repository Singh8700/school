
import './globals.css'
import StyledComponentsRegistry from './registry'
import HeaderPage from './components/HeaderPage'
import FooterPage from './Footer/page'
import Navbar from "./components/navBar/page"
import Loading from './loading/page'


export const metadata = {
  title: 'Design Of Fashion Art School',
  description: 'Excellence in Education',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
      <Loading/>
        <StyledComponentsRegistry>
          <HeaderPage />
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
