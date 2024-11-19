'use client'

import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import { loadStripe } from '@stripe/stripe-js'
import Link from 'next/link'
import { createStripeCheckout } from '../actions/create-stripe-checkout'

export const AcquirePlanButton = () => {
  const { user } = useUser()

  const handleAcquirePlanClick = async () => {
    const { sessionId } = await createStripeCheckout()

    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error('Stripe publishable key not found')
    }

    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
    )

    if (!stripe) {
      throw new Error('Stripe not found')
    }

    await stripe.redirectToCheckout({ sessionId })
  }

  const hasPremiumPlan = user?.publicMetadata.subscriptionPlan === 'premium'

  if (!process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL) {
    throw new Error('Stripe customer portal url not found')
  }

  return (
    <>
      {hasPremiumPlan && (
        <Button className="w-full rounded-full" variant="link" asChild>
          <Link
            href={`${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${user.emailAddresses[0].emailAddress}`}
          >
            Gerenciar plano
          </Link>
        </Button>
      )}

      {!hasPremiumPlan && (
        <Button
          onClick={handleAcquirePlanClick}
          className="w-full rounded-full"
        >
          Adquirir plano
        </Button>
      )}
    </>
  )
}
