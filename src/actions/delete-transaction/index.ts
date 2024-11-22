'use server'

import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'

export const deleteTransaction = async (id: string) => {
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  await db.transaction.delete({
    where: {
      id: id,
    },
  })
  revalidatePath('/transactions')
}
