import { IconGoogle } from '@/components/icon-google'
import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { SignInButton } from '@clerk/nextjs'
import { auth } from '@clerk/nextjs/server'
import Image from 'next/image'
import { redirect } from 'next/navigation'

const LoginPage = async () => {
  const { userId } = await auth()
  if (userId) {
    redirect('/')
  }

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2">
      {/* LEFTSIDE */}
      <div className="max-w-xl w-full flex flex-col justify-center gap-8 mx-auto px-5">
        <Logo />

        {/* HEADLINE */}
        <div className="flex flex-col gap-3">
          <h1 className="font-semibold text-4xl">Bem vindo</h1>
          <p className="text-muted-foreground">
            A Finance AI é uma plataforma de gestão financeira que utiliza IA
            para monitorar suas movimentações, e oferecer insights
            personalizados, facilitando o controle do seu orçamento.
          </p>
        </div>

        <SignInButton>
          <Button
            variant="secondary"
            size="lg"
            className="items-center border border-muted-foreground/10"
          >
            <div className="flex justify-center items-center size-5">
              <IconGoogle />
            </div>
            Entrar com o Google
          </Button>
        </SignInButton>
      </div>

      {/* RIGHTSIDE */}
      <div className="relative hidden md:flex">
        <Image
          className="object-cover"
          src="/images/bg-login.webp"
          alt="Faça login"
          fill
        />
      </div>
    </div>
  )
}

export default LoginPage
