import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import Navbar from './components/nav/Navbar'
import Footer from './components/footer/Footer'

const poppins = Poppins({ subsets: ['latin'], weight: ["700", "400"] })

export const metadata: Metadata = {
  title: 'E-Commerce Shop',
  description: 'E-Commerce Application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} text-state-700`}>
        <div className='flex flex-col min-h-screen'>
          <Navbar/>
          <main className='flex-grow'>
            {children}
          </main>
          <Footer/>
        </div>
        
      </body>
    </html>
  )
}
