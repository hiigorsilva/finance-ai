'use client'

import { Pie, PieChart } from 'recharts'

import { Card, CardContent } from '@/components/ui/card'
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type { TransactionPercentagePerType } from '@/data/get-dashboard/types'
import { TransactionType } from '@prisma/client'
import { PiggyBankIcon, TrendingDownIcon, TrendingUpIcon } from 'lucide-react'
import { PercentageItem } from './percentage-item'

const chartConfig = {
  [TransactionType.INVESTMENT]: {
    label: 'Investimento',
    color: '#60a5fa',
  },
  [TransactionType.DEPOSIT]: {
    label: 'Receita',
    color: '#16a34a',
  },
  [TransactionType.EXPENSE]: {
    label: 'Despesa',
    color: '#ef4444',
  },
} satisfies ChartConfig

type TransactionsPieChartProps = {
  typesPercentage: TransactionPercentagePerType
  depositsTotal: number
  investmentsTotal: number
  expensesTotal: number
}

export const TransactionsPieChart = ({
  depositsTotal,
  investmentsTotal,
  expensesTotal,
  typesPercentage,
}: TransactionsPieChartProps) => {
  const chartData = [
    {
      type: TransactionType.DEPOSIT,
      amount: depositsTotal,
      fill: '#16a34a',
    },
    {
      type: TransactionType.EXPENSE,
      amount: expensesTotal,
      fill: '#ef4444',
    },
    {
      type: TransactionType.INVESTMENT,
      amount: investmentsTotal,
      fill: '#60a5fa',
    },
  ]

  return (
    <Card className="flex flex-col p-0">
      <CardContent className="flex-1 p-5">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="type"
              innerRadius={48}
            />
          </PieChart>
        </ChartContainer>

        <div className="space-y-3">
          {/* RECEITA */}
          <PercentageItem
            icon={<TrendingUpIcon className="size-5 text-primary" />}
            title="Ganhos"
            value={typesPercentage[TransactionType.DEPOSIT]}
          />

          {/* DESPESAS */}
          <PercentageItem
            icon={<TrendingDownIcon className="size-5 text-red-400" />}
            title="Gastos"
            value={typesPercentage[TransactionType.EXPENSE]}
          />

          {/* INVESTIMENTO */}
          <PercentageItem
            icon={<PiggyBankIcon className="size-5 text-blue-400" />}
            title="Investidos"
            value={typesPercentage[TransactionType.INVESTMENT]}
          />
        </div>
      </CardContent>
    </Card>
  )
}
