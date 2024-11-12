import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

const Home = async () => {
  const { userId } = await auth()
  if (!userId) {
    redirect('/login')
  }

  return <h1>Dashboard</h1>
}

export default Home
