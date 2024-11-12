'use server'

import { db } from '@/lib/prisma'
import { upsertTransactionSchema } from '@/schemas/add-transaction'
import { auth } from '@clerk/nextjs/server'
import type {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { revalidatePath } from 'next/cache'

type UpsertTransactionParams = {
  id?: string
  name: string
  amount: number
  type: TransactionType
  category: TransactionCategory
  paymentMethod: TransactionPaymentMethod
  date: Date
}

export const upsertTransaction = async (params: UpsertTransactionParams) => {
  upsertTransactionSchema.parse(params)
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  await db.transaction.upsert({
    update: { ...params, userId },
    create: { ...params, userId },

    where: {
      id: params.id ?? '',
    },
  })
  revalidatePath('/transactions')
}
