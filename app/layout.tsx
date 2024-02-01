import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { GlobalStateProvider } from './globalstatecontext'
import { CookiesProvider } from 'next-client-cookies/server';
// import { NotificationProvider } from './notificationcontext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '1StepCure',
  description: 'Health Care Website',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <NotificationProvider> */}
        <CookiesProvider>
          <GlobalStateProvider>
            <Header />
            {children}
            <Footer />
          </GlobalStateProvider>
        </CookiesProvider>
        {/* </NotificationProvider> */}
      </body>
    </html>
  )
}
