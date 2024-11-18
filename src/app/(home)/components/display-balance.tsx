'use client'

import { Button } from '@/components/ui/button'
import { formatCurrency } from '@/utils/formatCurrency'
import { EyeClosedIcon, EyeIcon } from 'lucide-react'
import { useState } from 'react'

type DisplayBalanceProps = {
  amount: number
}

export const DisplayBalance = ({ amount }: DisplayBalanceProps) => {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <>
      {/* BALANCE */}
      {showBalance && (
        <p className="font-bold text-4xl">{formatCurrency(Number(amount))}</p>
      )}
      {!showBalance && <p className="font-bold text-4xl">R$ ******</p>}

      {/* EYE ICON */}
      <Button
        onClick={() => setShowBalance(!showBalance)}
        className="h-fit w-fit p-3"
        size="icon"
        variant="ghost"
      >
        {showBalance && <EyeIcon className="size-6 scale-150" />}
        {!showBalance && <EyeClosedIcon className="size-6 scale-150" />}
      </Button>
    </>
  )
}
