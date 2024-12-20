import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ScrollArea } from '@/components/ui/scroll-area'
import { TRANSACTION_CATEGORY_LABELS } from '@/constants/transactions'
import type { TotalExpensePerCategory } from '@/data/get-dashboard/types'
import { ScrollIcon } from 'lucide-react'

type ExpensesPerCategoryProps = {
  expensesPerCategory: TotalExpensePerCategory[]
}

export const ExpensesPerCategory = ({
  expensesPerCategory,
}: ExpensesPerCategoryProps) => {
  return (
    <ScrollArea className="h-full col-span-2 rounded-md border p-0">
      <Card className="h-full bg-transparent border-0">
        <CardHeader>
          <CardTitle className="font-bold text-center">
            Gastos por categoria
          </CardTitle>
        </CardHeader>

        <CardContent className="h-full flex flex-col gap-6">
          {expensesPerCategory.map(category => (
            <div key={category.category} className="h-full flex flex-col gap-1">
              {/* NAME + PERCENTAGE */}
              <div className="w-full flex justify-between items-center gap-4">
                <h4 className="font-bold text-sm">
                  {TRANSACTION_CATEGORY_LABELS[category.category]}
                </h4>
                <span className="font-bold text-sm">
                  {category.percentageOfTotal}%
                </span>
              </div>

              <Progress className="h-3" value={category.percentageOfTotal} />
            </div>
          ))}

          {expensesPerCategory.length === 0 && (
            <div className="flex flex-col justify-center items-center gap-2 text-center pt-16">
              <ScrollIcon strokeWidth={1} size={32} />
              <span className="text-muted-foreground">
                Nenhuma categoria registrada.
              </span>
            </div>
          )}
        </CardContent>
      </Card>
    </ScrollArea>
  )
}
