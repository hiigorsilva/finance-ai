import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'
import { CardPlan } from './components/card-plan'

const SubscriptionPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/login')
  }

  return (
    <div className="space-y-6 p-6">
      <h1 className="font-bold text-2xl">Assinatura</h1>

      <div className="flex gap-6">
        <CardPlan plan="free" />
        <CardPlan plan="premium" />
      </div>
    </div>
  )
}

export default SubscriptionPage
