import type React from 'react'
import { forwardRef } from 'react'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'

import { Input } from '@/components/ui/input'
import type { InputDayPickerProps } from 'react-day-picker'

export const MoneyInput = forwardRef(
  (
    props: NumericFormatProps<InputDayPickerProps>,
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
