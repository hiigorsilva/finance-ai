'use client'

import { Button } from '@/components/ui/button'
import { UpsertTransactionDialog } from '@/components/upsert-transacton-dialog'
import type { Transaction } from '@prisma/client'
import { PencilIcon } from 'lucide-react'
import { useState } from 'react'

type EditTransactionButtonProps = {
  transaction: Transaction
}

export const EditTransactionButton = ({
  transaction,
}: EditTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setDialogIsOpen(true)}
        variant="ghost"
        size="icon"
        className="text-muted-foreground"
      >
        <PencilIcon className="size-5" />
      </Button>

      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
        defaultValues={{
          ...transaction,
          amount: Number(transaction.amount),
        }}
        transactionId={transaction.id}
      />
    </>
  )
}
