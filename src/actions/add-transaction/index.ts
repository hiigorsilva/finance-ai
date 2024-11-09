'use server'

import { db } from '@/lib/prisma'
import { addTransactionSchema } from '@/schemas/add-transaction'
import { auth } from '@clerk/nextjs/server'
import type {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'

type addTransactionParams = {
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const addTransaction = async (params: addTransactionParams) => {
  addTransactionSchema.parse(params)
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  await db.transaction.create({
    data: { ...params, userId },
  })
  revalidatePath('/transactions')
}
