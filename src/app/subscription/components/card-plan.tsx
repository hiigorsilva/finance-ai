import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { CheckIcon, XIcon } from 'lucide-react'
import { AcquirePlanButton } from './acquire-plan-button'

type CardPlanProps = {
  plan: 'free' | 'premium'
  hasPremiumPlan?: boolean
  currentMonthTransactions?: number
}

export const CardPlan = ({
  plan,
  hasPremiumPlan,
  currentMonthTransactions,
}: CardPlanProps) => {
  return (
    <Card className="max-w-md w-full">
      <CardHeader className="gap-4 text-center p-8 border-b border-solid">
        {/* TITLE */}
        <div className="relative w-full">
          <h2 className="font-bold text-xl">
            {plan === 'free' ? 'Plano Free' : 'Plano Premium'}
          </h2>

          {hasPremiumPlan && (
            <Badge className="absolute top-1/2 left-0 -translate-y-1/2 w-fit text-primary bg-primary/15 ">
              Ativo
            </Badge>
          )}
        </div>

        {/* PRICE */}
        <p className="flex justify-center items-center gap-3 text-center">
          <span className="font-normal text-4xl">R$</span>
          <span className="font-normal text-6xl">
            {plan === 'free' ? '0' : '19'}
          </span>
          <span className="text-2xl text-muted-foreground">/ mês</span>
        </p>
      </CardHeader>
      <CardContent className="space-y-4 p-8">
        {/* FREE PLAN */}
        {plan === 'free' && (
          <>
            <div className="flex items-center gap-3">
              <CheckIcon className="size-6 text-primary" />
              <p>
                Apenas 10 transações por mês (
                <span
                  className={`font-bold ${(currentMonthTransactions as number) < 10 ? 'text-primary' : 'text-red-500'}`}
                >
                  {currentMonthTransactions}
                </span>
                /10 )
              </p>
            </div>

            <div className="flex items-center gap-3">
              <XIcon className="size-6" />
              <p>Relatórios de IA ilimitados</p>
            </div>
          </>
        )}

        {/* PREMIUM PLAN */}
        {plan === 'premium' && (
          <>
            <div className="flex items-center gap-3">
              <CheckIcon className="size-6 text-primary" />
              <p>Transações ilimitadas</p>
            </div>

            <div className="flex items-center gap-3">
              <CheckIcon className="size-6 text-primary" />
              <p>Relatórios de IA ilimitados</p>
            </div>
          </>
        )}
      </CardContent>

      {plan !== 'free' && (
        <CardFooter>
          <AcquirePlanButton />
        </CardFooter>
      )}
    </Card>
  )
}
