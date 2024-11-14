import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { TRANSACTION_PAYMENT_METHOD_ICONS } from '@/constants/transactions'
import { formatCurrency } from '@/utils/formatCurrency'
import { type Transaction, TransactionType } from '@prisma/client'
import Image from 'next/image'
import Link from 'next/link'

type LastTransactionsProps = {
  lastTransactions: Transaction[]
}

export const LastTransactions = ({
  lastTransactions,
}: LastTransactionsProps) => {
  const getAmountColor = (transaction: Transaction) => {
    if (transaction.type === TransactionType.EXPENSE) return 'text-red-500'
    if (transaction.type === TransactionType.DEPOSIT) return 'text-primary'
    if (transaction.type === TransactionType.INVESTMENT) return 'text-blue-400'
    return 'text-zinc-50'
  }

  const getAmountPrefix = (transaction: Transaction) => {
    if (transaction.type === TransactionType.DEPOSIT) {
      return '+'
    }
    return '-'
  }

  return (
    <ScrollArea className="rounded-md border">
      <Card className="space-y-6 bg-transparent border-0 p-6">
        <CardHeader className="flex-row justify-between items-center gap-4 p-0">
          <CardTitle>Últimas Transações</CardTitle>

          <Button className="rounded-full" size="sm" variant="outline" asChild>
            <Link href="/transactions">Ver mais</Link>
          </Button>
        </CardHeader>

        <div className="w-full h-px bg-muted" />

        <CardContent className="flex flex-col gap-6 p-0">
          {lastTransactions.map(transaction => (
            <div
              key={transaction.id}
              className="flex justify-between items-center gap-6"
            >
              <div className="w-fit flex items-center gap-3">
                {/* ICON */}
                <div className="w-10 h-10 grid place-content-center rounded-lg bg-zinc-50/5">
                  <Image
                    src={
                      TRANSACTION_PAYMENT_METHOD_ICONS[
                        transaction.paymentMethod
                      ]
                    }
                    alt="PIX"
                    width={20}
                    height={20}
                  />
                </div>

                {/* NAME */}
                <div className="space-y-0.5">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <h3 className="font-bold text-sm text-wrap line-clamp-1 truncate">
                          {transaction.name}
                        </h3>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{transaction.name}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <span className="text-sm text-zinc-500 truncate">
                    {new Date(transaction.date).toLocaleDateString('pt-BR', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              <p
                className={`w-fit flex items-center font-bold text-sm ${getAmountColor(transaction)}`}
              >
                <span>{getAmountPrefix(transaction)}</span>
                <span>{formatCurrency(Number(transaction.amount))}</span>
              </p>
            </div>
          ))}
        </CardContent>
      </Card>
    </ScrollArea>
  )
}
