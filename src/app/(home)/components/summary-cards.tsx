import { db } from '@/lib/prisma'
import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { SummaryCard } from './summary-card'

type SummaryCardsProps = {
  month: string
}

export const SummaryCards = async ({ month }: SummaryCardsProps) => {
  const where = {
    date: {
      gte: new Date(`2024-${month}-01`),
      lt: new Date(`2024-${month}-31`),
    },
  }

  const depositsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'DEPOSIT' },
        _sum: { amount: true },
      })
    )._sum.amount
  )

  const investmentsTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'INVESTMENT' },
        _sum: { amount: true },
      })
    )._sum.amount
  )

  const expensesTotal = Number(
    (
      await db.transaction.aggregate({
        where: { ...where, type: 'EXPENSE' },
        _sum: { amount: true },
      })
    )._sum.amount
  )

  const balance = depositsTotal - investmentsTotal - expensesTotal

  return (
    <div className="flex flex-col gap-6">
      {/* FIRST CARD*/}
      <SummaryCard
        icon={<WalletIcon className="size-4 text-zinc-50" />}
        title="Saldo"
        amount={balance}
        size="large"
      />

      {/* OTHER CARDS */}
      <div className="grid grid-cols-3 gap-4">
        {/* INVESTMENT CARD */}
        <SummaryCard
          icon={<PiggyBankIcon className="size-4 text-blue-400" />}
          title="Investido"
          amount={investmentsTotal}
        />

        {/* RECEIVE CARD */}
        <SummaryCard
          icon={<TrendingUpIcon className="size-4 text-primary" />}
          title="Receita"
          amount={depositsTotal}
        />

        {/* EXPENSE CARD */}
        <SummaryCard
          icon={<TrendingDownIcon className="size-4 text-red-400" />}
          title="Despesa"
          amount={expensesTotal}
        />
      </div>
    </div>
  )
}
