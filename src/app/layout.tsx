import { ClerkProvider } from '@clerk/nextjs'
import { dark } from '@clerk/themes'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '@/app/globals.css'

const inter = Inter({
  display: 'swap',
  weight: ['400', '600'],
  preload: true,
  subsets: ['latin'],
  style: 'normal',
})

export const metadata: Metadata = {
  title: 'Finance AI',
  description: 'Gerencie todas suas despesas e receitas com o Finance AI',
  keywords: 'Finance AI, Finance, Gerenciamento de despesas, Receitas',
  authors: [{ name: 'Higor Code' }],
  appleWebApp: {
    capable: true,
    title: 'Fincane AI',
    statusBarStyle: 'black-translucent',
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
        <body className={`${inter.className} antialiased dark`}>
          {children}
        </body>
      </ClerkProvider>
    </html>
  )
}
