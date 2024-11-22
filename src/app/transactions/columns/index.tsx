'use client'

import { deleteTransaction } from '@/actions/delete-transaction'
import { Button } from '@/components/ui/button'
import {
  TRANSACTION_CATEGORY_LABELS,
  TRANSACTION_PAYMENT_METHOD_LABELS,
} from '@/constants/transactions'
import type { Transaction } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { TrashIcon } from 'lucide-react'
import { toast } from 'sonner'
import { EditTransactionButton } from '../components/edit-transaction-button'
import { TransactionTypeBadge } from '../components/type-badge'

const handleDeleteTransaction = async (id: string) => {
  try {
    await deleteTransaction(id)
    toast.success('Transação excluída com sucesso!')
  } catch (err) {
    console.error(err)
    toast.error('Erro ao deletar transação!')
  }
}

export const transactionColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: 'name',
    header: 'Nome',
  },
  {
    accessorKey: 'type',
    header: 'Tipo',
    cell: ({ row: { original: transaction } }) => (
      <TransactionTypeBadge transaction={transaction} />
    ),
  },
  {
    accessorKey: 'category',
    header: 'Categoria',
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_CATEGORY_LABELS[transaction.category],
  },
  {
    accessorKey: 'paymentMethod',
    header: 'Método de pagamento',
    cell: ({ row: { original: transaction } }) =>
      TRANSACTION_PAYMENT_METHOD_LABELS[transaction.paymentMethod],
  },
  {
    accessorKey: 'date',
    header: 'Data',
    cell: ({ row: { original: transaction } }) =>
      new Date(transaction.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
      }),
  },
  {
    accessorKey: 'amount',
    header: 'Valor',
    cell: ({ row: { original: transaction } }) =>
      Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(Number(transaction.amount)),
  },
  {
    accessorKey: 'actions',
    header: 'Ações',
    cell: ({ row: { original: transaction } }) => {
      return (
        <div className="flex items-center gap-1">
          <EditTransactionButton transaction={transaction} />

          <Button
            onClick={() => handleDeleteTransaction(transaction.id)}
            variant="ghost"
            size="icon"
            className="text-muted-foreground"
          >
            <TrashIcon className="size-5" />
          </Button>
        </div>
      )
    },
  },
]
