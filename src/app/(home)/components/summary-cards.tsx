import {
  PiggyBankIcon,
  TrendingDownIcon,
  TrendingUpIcon,
  WalletIcon,
} from 'lucide-react'
import { SummaryCard } from './summary-card'

type SummaryCardsProps = {
  month: string
  balance: number
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
  userCanAddTransaction?: boolean
}

export const SummaryCards = async ({
  balance,
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  userCanAddTransaction,
}: SummaryCardsProps) => {
  return (
    <div className="space-y-6">
      {/* FIRST CARD*/}
      <SummaryCard
        icon={<WalletIcon className="size-4 text-zinc-50" />}
        title="Saldo"
        amount={balance}
        size="large"
        userCanAddTransaction={userCanAddTransaction}
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
