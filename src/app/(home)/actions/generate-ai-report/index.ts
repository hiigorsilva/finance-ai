'use server'

import { db } from '@/lib/prisma'
import { auth, clerkClient } from '@clerk/nextjs/server'
import OpenAI from 'openai'
import { contentToGenerateAiReport } from './data'
import { DUMMY_REPORT } from './dummy-report'
import { type GenerateAIReportSchema, generateAIReportSchema } from './schema'

export const generateAiReport = async ({ month }: GenerateAIReportSchema) => {
  // Validar o schema MONTH
  generateAIReportSchema.parse({ month })

  // Verificar se o usuário está logado
  const { userId } = await auth()
  if (!userId) {
    throw new Error('Unauthorized')
  }

  // Verificar se o usuário tem o plano premium
  const user = await clerkClient().users.getUser(userId)
  const hasPremiumPlan = user.publicMetadata.subscriptionPlan === 'premium'
  if (!hasPremiumPlan) {
    throw new Error('User does not have a premium plan to generate AI reports')
  }

  if (!process.env.OPEN_API_KEY) {
    await new Promise(resolve => setTimeout(resolve, 3000))
    return DUMMY_REPORT
  }

  const openAi = new OpenAI({
    apiKey: process.env.OPEN_API_KEY,
  })

  // pegar as transações do mês
  const transactions = await db.transaction.findMany({
    where: {
      date: {
        gte: new Date(`2024-${month}-01`),
        lt: new Date(`2024-${month}-31`),
      },
    },
  })

  // mandar as transações para o GPT e pedir para gerar um relatório
  const completion = await openAi.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: contentToGenerateAiReport,
      },
      {
        role: 'user',
        content: `
        Gere um relatório com insights sobre minhas finanças, com dicas e orientações 
        de como melhorar minha vida financeira. As transações estão divididas por ponto 
        e virgula. A estrurua de cada uma é {DATA}---{TIPO}---VALOR---{CATEGORIA}. 
        São elas:
        ${transactions
          .map(
            transaction =>
              `${transaction.date.toLocaleDateString('pt-BR')}-R$${
                transaction.amount
              }-${transaction.type}-${transaction.category}`
          )
          .join(';')} 
        Ao final do relatório, classifique com um nível da escala likert o desempenho das transações, sendo:
        1. **Caos Financeiro**: Desempenho crítico, precisa de melhorias significativas.  
        2. **Buscando Equilíbrio**: O usuário está começando a organizar as finanças, mas ainda há muito a melhorar.  
        3. **No Caminho Certo**: Bom progresso, mas há espaço para otimização.  
        4. **Gestão Sólida**: Boa gestão financeira, com controle claro das finanças.  
        5. **Lenda das Finanças**: Excelente desempenho, com domínio total das finanças.
        `,
      },
    ],
  })

  // pegar o relatior gerado pelo GPT e retornar para o usuário
  return completion.choices[0].message.content?.trim()
}
