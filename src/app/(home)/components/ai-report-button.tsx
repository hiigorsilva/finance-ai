'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Loader2Icon, SparklesIcon } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'
import Markdown from 'react-markdown'
import { generateAiReport } from '../actions/generate-ai-report'

type AiReportButtonProps = {
  hasPremiumPlan: boolean
  month: string
}

export const AiReportButton = ({
  hasPremiumPlan,
  month,
}: AiReportButtonProps) => {
  const [report, setReport] = useState<string | undefined>(undefined)
  const [reportIsLoading, setReportIsLoading] = useState(false)

  const handleGenerateReportClick = async () => {
    try {
      setReportIsLoading(true)
      const aiReport = await generateAiReport({ month })
      setReport(aiReport)
      await generateAiReport({ month })
    } catch (err) {
      console.error(err)
    } finally {
      setReportIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="rounded-full">
          Relatório AI
          <SparklesIcon className="size-6 text-blue-300" />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-h-[80dvh] h-fit flex flex-col justify-between overflow-hidden">
        {hasPremiumPlan ? (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <SparklesIcon className="size-5 text-blue-300" />
                Relatório AI
              </DialogTitle>
              <DialogDescription>
                Use a inteligência artificial para gerar um relatório com
                insights de suas transações.
              </DialogDescription>
            </DialogHeader>

            <ScrollArea className="flex-1 text-zinc-400 overflow-auto bg-zinc-400/5 px-5 rounded-lg prose prose-h3:text-zinc-50 prose-h4:text-primary prose-strong:text-zinc-200">
              <Markdown>{report}</Markdown>
            </ScrollArea>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                >
                  Fechar
                </Button>
              </DialogClose>

              <Button
                className="w-full rounded-full"
                onClick={handleGenerateReportClick}
                disabled={reportIsLoading}
                size="sm"
              >
                {reportIsLoading && <Loader2Icon className="animate-spin" />}
                Gerar relatório
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-3">
                <SparklesIcon className="size-5 text-blue-300" />
                Relatório AI
              </DialogTitle>
              <DialogDescription>
                Você precisa de um plano premium para gerar relatórios com AI.
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full rounded-full"
                >
                  Fechar
                </Button>
              </DialogClose>

              <Button className="w-full rounded-full" size="sm" asChild>
                <Link href="/subscription">Assinar plano premium</Link>
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
