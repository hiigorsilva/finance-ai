import { getCurrentMonthTransactions } from '@/data/get-current-month-transactions'
import { auth, clerkClient } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CardPlan } from './components/card-plan'

const SubscriptionPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/login')
  }

  const user = await clerkClient().users.getUser(userId)
  const currentMonthTransactions = await getCurrentMonthTransactions()
  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === 'premium'

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-bold text-2xl">Assinatura</h1>

      <div className="flex gap-6">
        <CardPlan
          plan="free"
          currentMonthTransactions={currentMonthTransactions}
        />
        <CardPlan plan="premium" hasPremiumPlan={hasPremiumPlan} />
      </div>
    </div>
  )
}

export default SubscriptionPage
