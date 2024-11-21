import { isMatch } from 'date-fns'
import { z } from 'zod'

export const generateAIReportSchema = z.object({
  month: z.string().refine(value => isMatch(value, 'MM')),
})

export type GenerateAIReportSchema = z.infer<typeof generateAIReportSchema>
