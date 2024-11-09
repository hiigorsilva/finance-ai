'use client'

import { ArrowDownUpIcon } from 'lucide-react'
import { useState } from 'react'
import { Button } from './ui/button'
import { UpsertTransactionDialog } from './upsert-transacton-dialog'

export const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  return (
    <>
      <Button onClick={() => setDialogIsOpen(true)} className="rounded-full">
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
