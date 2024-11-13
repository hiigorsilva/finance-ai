import { DisplayBalance } from '@/app/(home)/components/display-balance'
import { AddTransactionButton } from '@/components/add-transaction-button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { formatCurrency } from '@/utils/formatCurrency'
import type { ReactNode } from 'react'

type SummaryCardProps = {
  icon: ReactNode
  title: 'Investido' | 'Receita' | 'Despesa' | 'Saldo'
  amount: number
  size?: 'small' | 'large'
  className?: string
}

export const SummaryCard = ({
  icon,
  title,
  amount,
  size = 'small',
  className,
}: SummaryCardProps) => {
  return (
    <Card
      className={cn(
        `space-y-3 ${size === 'small' && 'bg-transparent'}`,
        className
      )}
    >
      <CardHeader className="pb-0">
        <CardTitle className="font-normal flex items-center gap-2 text-sm text-muted-foreground">
          <div
            className={`w-fit p-2.5 rounded-md 
          ${title === 'Investido' && 'bg-blue-400/10'}
          ${title === 'Receita' && 'bg-primary/10'}
          ${title === 'Despesa' && 'bg-red-400/10'}
          ${title === 'Saldo' && 'bg-zinc-50/10'}
          `}
          >
            {icon}
          </div>
          {title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex justify-between items-center gap-8">
        {/* BALANCE */}
        {size === 'small' && (
          <p
            className={`font-bold ${size === 'small' ? 'text-xl' : 'text-4xl'}`}
          >
            {formatCurrency(amount)}
          </p>
        )}

        {size === 'large' && (
          <>
            <div className="flex items-center gap-3">
              <DisplayBalance amount={amount} />
            </div>
            <AddTransactionButton />
          </>
        )}
      </CardContent>
    </Card>
  )
}
