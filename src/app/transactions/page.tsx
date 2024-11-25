// import { Navbar } from '@/components/Navbar'
import { AddTransactionButton } from '@/components/add-transaction-button'
import { DataTable } from '@/components/ui/data-table'
import { canUserAddTransaction } from '@/data/can-user-add-transaction'
import { db } from '@/lib/prisma'
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { transactionColumns } from './columns'

const TransactionsPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/login')
  }

  const transactions = await db.transaction.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      date: 'desc',
    },
  })

  const userCanAddTransaction = await canUserAddTransaction()

  return (
    <div>
      <div className="space-y-6 p-6">
        {/* TITTLE AND BUTTON */}
        <div className="w-full flex justify-between items-center gap-4">
          <h1 className="font-bold text-2xl">Transações</h1>

          <AddTransactionButton userCanAddTransaction={userCanAddTransaction} />
        </div>

        <DataTable
          columns={transactionColumns}
          data={JSON.parse(JSON.stringify(transactions))}
        />
      </div>
    </div>
  )
}

export default TransactionsPage
