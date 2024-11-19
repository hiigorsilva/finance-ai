'use client'

import { ArrowDownUpIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { UpsertTransactionDialog } from './upsert-transacton-dialog'

type AddTransactionButtonProps = {
  userCanAddTransaction?: boolean
}

export const AddTransactionButton = ({
  userCanAddTransaction,
}: AddTransactionButtonProps) => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button
        onClick={() => setDialogIsOpen(true)}
        disabled={!userCanAddTransaction}
        className="rounded-full"
      >
        Adicionar transação
        <ArrowDownUpIcon className="size-5" />
      </Button>
      <UpsertTransactionDialog
        isOpen={dialogIsOpen}
        setIsOpen={setDialogIsOpen}
      />
    </>
  )
}
