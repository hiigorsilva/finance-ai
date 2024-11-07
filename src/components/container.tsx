import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
  className?: string
}

export const Container = ({ children, className }: Props) => {
  return (
    <div className={cn('max-w-7xl h-full mx-auto px-5', className)}>
      {children}
    </div>
  )
}
