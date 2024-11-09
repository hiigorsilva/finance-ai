'use client'

import { addTransaction } from '@/actions/add-transaction'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  TRANSACTION_CATEGORY_OPTIONS,
  TRANSACTION_PAYMENT_METHOD_OPTIONS,
  TRANSACTION_TYPE_OPTIONS,
} from '@/constants/transactions'
import { formSchema } from '@/schemas/form-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  TransactionCategory,
  TransactionPaymentMethod,
  TransactionType,
} from '@prisma/client'
import { ArrowDownUpIcon } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'
import { MoneyInput } from './money-input'
import { DatePicker } from './ui/date-picker'
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

type FormData = z.infer<typeof formSchema>

export const AddTransactionButton = () => {
  const [dialogIsOpen, setDialogIsOpen] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: 50,
      name: '',
      type: TransactionType.EXPENSE,
      category: TransactionCategory.OTHER,
      paymentMethod: TransactionPaymentMethod.PIX,
      date: new Date(),
    },
  })

  const onSubmit = async (data: FormData) => {
    try {
      await addTransaction(data)
      setDialogIsOpen(false)
      form.reset()
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Dialog
      open={dialogIsOpen}
      onOpenChange={open => {
        setDialogIsOpen(open)
        if (!open) {
          form.reset()
        }
      }}
    >
      {/* OPEN / CLOSE */}
      <DialogTrigger asChild>
        <Button className="rounded-full">
          Adicionar transação
          <ArrowDownUpIcon className="size-5" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-[540px] w-full max-h-[80vh] h-fit overflow-y-auto">
        {/* HEADER */}
        <DialogHeader className="sm:text-center">
          <DialogTitle className="text-xl">Adicionar Transação</DialogTitle>
          <DialogDescription>Insira as informações abaixo</DialogDescription>
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
                Adicionar
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
