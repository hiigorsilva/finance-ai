import type { TransactionCategory, TransactionType } from '@prisma/client'

export type TransactionPercentagePerType = {
  [key in TransactionType]: number
}

export type TotalExpensePerCategory = {
  category: TransactionCategory
  totalAmount: number
  percentageOfTotal: number
}
