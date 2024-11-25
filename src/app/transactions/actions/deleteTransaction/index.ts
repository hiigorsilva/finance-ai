'use server'

import { db } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import type { DeleteTransactionSchema } from './schema'

export const deleteTransaction = async ({
  transactionId,
}: DeleteTransactionSchema) => {
  await db.transaction.delete({
    where: {
      id: transactionId,
    },
  })
  revalidatePath('/transactions')
  revalidatePath('/')
}
