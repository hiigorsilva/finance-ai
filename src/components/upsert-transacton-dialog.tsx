'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/constants/transactions'

import { upsertTransaction } from '@/actions/upsert-transaction'

import { type FormSchema, formSchema } from '@/schemas/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

import { useEffect } from 'react'
import { MoneyInput } from './money-input'
import { DatePicker } from './ui/date-picker'

type UpsertTransactionDialogProps = {
  isOpen: boolean
  defaultValues?: FormSchema
  transactionId?: string
  setIsOpen: (isOpen: boolean) => void
}

export const UpsertTransactionDialog = ({
  isOpen,
  defaultValues,
  transactionId,
  setIsOpen,
}: UpsertTransactionDialogProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      amount: 50,
      name: '',
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      paymentMethod: TransactionPaymentMethod.PIX,
      date: new Date(),
    },
  })

  useEffect(() => {
    form.reset(defaultValues)
  }, [defaultValues, form])

  const onSubmit = async (data: FormSchema) => {
    try {
      await upsertTransaction({ ...data, id: transactionId })
      setIsOpen(false)
      form.reset()
    } catch (err) {
      console.error(err)
    }
  }

  const isUpdate = Boolean(transactionId)

  return (
    <Dialog
      open={isOpen}
      onOpenChange={open => {
        setIsOpen(open)
        if (!open) {
          form.reset()
        }
      }}
    >
      <DialogContent className="max-w-[540px] w-full max-h-[80vh] h-fit overflow-y-auto">
        {/* HEADER */}
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-xl">
            {isUpdate ? 'Atualizar' : 'Adicionar'} Transação
          </DialogTitle>
          <DialogDescription>
            {isUpdate ? 'Edite' : 'Insira'} as informações abaixo
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* TÍTULO */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* VALOR */}
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <MoneyInput
                      placeholder="Digite o valor"
                      value={field.value}
                      onValueChange={({ floatValue }) => {
                        field.onChange(floatValue)
                      }}
                      onBlur={field.onBlur}
                      disabled={field.disabled}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* TIPO DE TRANSAÇÃO */}
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo da transação</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_TYPE_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* CATEGORIA */}
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categoria</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a categoria" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_CATEGORY_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* MÉTODO DE PAGAMENTO */}
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Método de pagamento</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um método de pagamento" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {TRANSACTION_PAYMENT_METHOD_OPTIONS.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* DATA */}
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Data</FormLabel>
                  <DatePicker value={field.value} onChange={field.onChange} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" className="flex-1" variant="outline">
                  Cancelar
                </Button>
              </DialogClose>

              <Button type="submit" className="flex-1">
                {isUpdate ? 'Atualizar' : 'Adicionar'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
