import { getDashboard } from '@/data/get-dashboard'
import { auth } from '@clerk/nextjs/server'
import { isMatch } from 'date-fns'
import { redirect } from 'next/navigation'
import { ExpensesPerCategory } from './components/expenses-per-category'
import { LastTransactions } from './components/last-transactions'
import { SummaryCards } from './components/summary-cards'
import { TimeSelect } from './components/time-select'
import { TransactionsPieChart } from './components/transactions-pie-chart'

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

  const dashboard = await getDashboard(month)

  return (
    <div className="space-y-6 pb-8 px-6">
      {/* HEADER */}
      <div className="flex justify-between items-center gap-8 py-6">
        <h1 className="font-bold text-2xl">Dashboard</h1>
        <TimeSelect />
      </div>

      <div className="grid grid-cols-[2fr,1fr] gap-6">
        <div className="flex flex-col gap-6">
          {/* SUMMARY CARDS */}
          <SummaryCards month={month} {...dashboard} />

          {/* CHART */}
          <div className="grid grid-cols-3 grid-rows-1 gap-4">
            <TransactionsPieChart {...dashboard} />
            <ExpensesPerCategory
              expensesPerCategory={dashboard.TotalExpensePerCategory}
            />
          </div>
        </div>

        {/* LAST TRANSACTIONS */}
        <LastTransactions lastTransactions={dashboard.lastTransactions} />
      </div>
    </div>
  )
}

export default Home
