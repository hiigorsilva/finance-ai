'use client'

import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="flex justify-between items-center px-6 py-4 border-b border-solid">
      {/* LEFTSIDE */}
      <div className="flex items-center gap-10">
        <Image
          src="/images/logo.svg"
          alt="Logo Finance AI"
          width={178}
          height={40}
          priority
        />

        <Link
          href="/"
          className={
            pathname === '/'
              ? 'font-bold text-primary'
              : 'font-bold text-muted-foreground'
          }
        >
          Dashboard
        </Link>
        <Link
          href="/transactions"
          className={
            pathname === '/transactions'
              ? 'font-bold text-primary'
              : 'font-bold text-muted-foreground'
          }
        >
          Transações
        </Link>
        <Link
          href="/subscription"
          className={
            pathname === '/subscription'
              ? 'font-bold text-primary'
              : 'font-bold text-muted-foreground'
          }
        >
          Assinatura
        </Link>
      </div>

      {/* RIGHTSIDE */}
      <UserButton showName />
    </nav>
  )
}
