import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const SubscriptionPage = async () => {
  const { userId } = await auth()
  if (!userId) {
    return redirect('/login')
  }

  return <h1>Subscription</h1>
}

export default SubscriptionPage
