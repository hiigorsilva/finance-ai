'use client'

import { Button } from '@/components/ui/button'
import type { Transaction } from '@prisma/client'
import type { ColumnDef } from '@tanstack/react-table'
import { PencilIcon, TrashIcon } from 'lucide-react'
import { TransactionTypeBadge } from '../components/type-badge'

export const TRANSACTION_CATEGORY_LABELS = {
  EDUCATION: 'Educação',
  ENTERTAINMENT: 'Lazer',
  FOOD: 'Comida',
  HEALTH: 'Saúde',
  HOUSING: 'Moradia',
  OTHER: 'Outros',
  SALARY: 'Salario',
  TRANSPORTATION: 'Transporte',
  UTILITY: 'Utilidades',
}

export const TRANSACTION_PAYMENT_METHOD_LABELS = {
  BANK_TRANSFER: 'Transferência',
  BANK_SLIP: 'Boleto',
  CASH: 'Dinheiro',
  CREDIT_CARD: 'Cartão de Crédito',
  DEBIT_CARD: 'Cartão de Débito',
  OTHER: 'Outros',
  PIX: 'PIX',
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
    cell: () => {
      return (
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <PencilIcon className="size-5" />
          </Button>

          <Button variant="ghost" size="icon" className="text-muted-foreground">
            <TrashIcon className="size-5" />
          </Button>
        </div>
      )
    },
  },
]
