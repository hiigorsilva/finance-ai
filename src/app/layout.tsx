import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Mulish } from 'next/font/google'
import '@/app/globals.css'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'

const mulish = Mulish({
  display: 'swap',
  weight: ['400', '700'],
  preload: true,
  subsets: ['latin-ext'],
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'Finance AI',
  description: 'Gerencie todas suas despesas e receitas com o Finance AI',
  keywords: 'Finance AI, Finance, Gerenciamento de despesas, Receitas',
  authors: [{ name: 'Higor Code' }],
  icons: ['/favicon.svg'],
  appleWebApp: {
    capable: true,
    title: 'Fincane AI',
    statusBarStyle: 'black-translucent',
    startupImage: '/og.png',
  },
  openGraph: {
    type: 'website',
    url: '',
    title: 'Fincane AI',
    description: 'Gerencie todas suas despesas e receitas com o Finance AI',
    siteName: 'Fincane AI',
    images: [
      {
        url: 'https://example.com/og.png',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <ClerkProvider
        appearance={{
          baseTheme: dark,
        }}
      >
        <body className={`${mulish.className} antialiased dark`}>
          <Navbar />
          {children}
          <Footer />
        </body>
      </ClerkProvider>
    </html>
  )
}
