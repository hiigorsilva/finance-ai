import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { db } from '@/lib/prisma'
import { ArrowDownUpIcon } from 'lucide-react'
import { transactionColumns } from './columns'

const TransactionsPage = async () => {
  const transactions = await db.transaction.findMany({})

  return (
    <div>
      <div className="space-y-6 p-6">
        {/* TITTLE AND BUTTON */}
        <div className="w-full flex justify-between items-center gap-4">
          <h1 className="font-bold text-2xl">Transações</h1>
          <Button className="rounded-full">
            Adicionar transação
            <ArrowDownUpIcon className="size-5" />
          </Button>
        </div>

        <DataTable columns={transactionColumns} data={transactions} />
      </div>
    </div>
  )
}

export default TransactionsPage
