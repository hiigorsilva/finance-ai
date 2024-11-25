import type React from 'react'
import { forwardRef } from 'react'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'

import { Input, type InputProps } from '@/components/ui/input'

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputProps>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => {
    return (
      <NumericFormat
        {...props}
        thousandSeparator="."
        decimalSeparator=","
        prefix="R$ "
        allowNegative={false}
        customInput={Input}
        getInputRef={ref}
      />
    )
  }
)

MoneyInput.displayName = 'MoneyInput'
