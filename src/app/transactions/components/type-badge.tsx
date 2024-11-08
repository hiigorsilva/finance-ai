import { Badge } from '@/components/ui/badge'
import { TransactionType } from '@prisma/client'
import { CircleIcon } from 'lucide-react'

import type { Transaction } from '@prisma/client'

type TransactionTypeBadgeProps = {
  transaction: Transaction
}

export const TransactionTypeBadge = ({
  transaction,
}: TransactionTypeBadgeProps) => {
  if (transaction.type === TransactionType.DEPOSIT) {
    return (
      <Badge className="w-fit flex items-center gap-1 bg-primary/10 text-primary border border-zinc-50/5 hover:bg-primary/10">
        <CircleIcon className="fill-primary size-2" />
        Depósito
      </Badge>
    )
  }
  if (transaction.type === TransactionType.EXPENSE) {
    return (
      <Badge className="w-fit flex items-center gap-1 bg-destructive/10 text-destructive border border-zinc-50/5 hover:bg-destructive/10">
        <CircleIcon className="fill-destructive size-2" />
        Despesa
      </Badge>
    )
  }
  if (transaction.type === TransactionType.INVESTMENT) {
    return (
      <Badge className="w-fit flex items-center gap-1 text-zinc-400 border border-zinc-50/5 bg-zinc-400/10 hover:bg-zinc-400/10">
        <CircleIcon className="fill-zinc-400 size-2" />
        Investimento
      </Badge>
    )
  }
}
