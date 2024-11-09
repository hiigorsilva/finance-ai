import { AddTransactionButton } from '@/components/add-transaction-button'
import { DataTable } from '@/components/ui/data-table'
import { db } from '@/lib/prisma'
import { transactionColumns } from './columns'

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({})

  return (
    <div>
      <div className="space-y-6 p-6">
        {/* TITTLE AND BUTTON */}
        <div className="w-full flex justify-between items-center gap-4">
          <h1 className="font-bold text-2xl">Transações</h1>

          <AddTransactionButton />
        </div>

        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </div>
  )
}

export default TransactionsPage
