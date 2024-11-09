import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { z } from 'zod'

export const formSchema = z.object({
  name: z.string().trim().min(1, {
    message: 'O nome é obrigatório',
  }),
  amount: z.number().positive({
    message: 'O valor deve ser positivo',
  }),
  type: z.nativeEnum(TransactionType, {
    required_error: 'O tipo de transação é obrigatório',
  }),
  category: z.nativeEnum(TransactionCategory, {
    required_error: 'A categoria de transação é obrigatória',
  }),
  paymentMethod: z.nativeEnum(TransactionPaymentMethod, {
    required_error: 'O método de pagamento é obrigatório',
  }),
  date: z.date({
    required_error: 'A data é obrigatória',
  }),
})
