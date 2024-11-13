import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'
import { SummaryCards } from './components/summary-cards'
import { TimeSelect } from './components/time-select'

type HomeProps = {
  searchParams: {
    month: string
  }
}

const Home = async ({ searchParams: { month } }: HomeProps) => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }

  const currentMonth = new Date().getMonth() + 1
  const monthIsValid = !month || !isMatch(month, 'MM')
  if (monthIsValid) {
    redirect(`/?month=${currentMonth}`)
  }

  return (
    <div className="space-y-6 px-6">
      <div className="flex justify-between items-center gap-8 py-6">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <TimeSelect />
      </div>
      <div className="">
        <SummaryCards month={month} />
      </div>
    </div>
  )
}

export default Home
